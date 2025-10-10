-- clients
create table if not exists clients (
id uuid primary key default gen_random_uuid(),
first_name text not null,
last_name text not null,
birth_date date not null,
phone text not null,
email text not null,
created_at timestamptz not null default now()
);

create index if not exists idx_clients_last_name on clients (last_name);
create index if not exists idx_clients_email on clients (email);

-- animals
create table if not exists animals (
id uuid primary key default gen_random_uuid(),
client_id uuid not null references clients(id) on delete cascade,
name text not null,
type text not null, -- Dog, Cat, Rodent, etc.
age_years int,
notes text,
medications text,
created_at timestamptz not null default now()
);

create index if not exists idx_animals_name on animals (name);
create index if not exists idx_animals_type on animals (type);

-- appointments
create table if not exists appointments (
id uuid primary key default gen_random_uuid(),
client_id uuid not null references clients(id) on delete restrict,
animal_id uuid not null references animals(id) on delete restrict,
scheduled_at timestamptz not null, -- salvar em UTC
status text not null default 'pending', -- pending | confirmed | cancelled
created_at timestamptz not null default now()
);

create index if not exists idx_appointments_scheduled_at on appointments (scheduled_at);
create index if not exists idx_appointments_status on appointments (status);

-- optional: internal time slots
create table if not exists time_slots (
id uuid primary key default gen_random_uuid(),
starts_at timestamptz not null,
ends_at timestamptz not null,
status text not null default 'free' -- free | blocked | booked
);

create index if not exists idx_time_slots_starts_at on time_slots (starts_at);

-- Enable Row Level Security
alter table clients enable row level security;
alter table animals enable row level security;
alter table appointments enable row level security;
alter table time_slots enable row level security;

-- POLICIES (fase 1): público pode inserir (agendar), mas não ler.
-- Admin acessa tudo via server (service role) no dashboard.

-- Clients
create policy "public_insert_clients"
on clients for insert
to anon
with check (true);

create policy "no_select_clients_public"
on clients for select
to anon
using (false);

-- Animals
create policy "public_insert_animals"
on animals for insert
to anon
with check (true);

create policy "no_select_animals_public"
on animals for select
to anon
using (false);

-- Appointments
create policy "public_insert_appointments"
on appointments for insert
to anon
with check (true);

create policy "no_select_appointments_public"
on appointments for select
to anon
using (false);

-- Time slots: público pode LER slots livres; não pode editar.
create policy "public_select_free_slots"
on time_slots for select
to anon
using (status = 'free');

create policy "no_insert_update_delete_timeslots_public"
on time_slots for all
to anon
using (false)
with check (false);

-- Unique email for identifying clients by email during booking
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'uq_clients_email'
  ) THEN
    ALTER TABLE public.clients
      ADD CONSTRAINT uq_clients_email UNIQUE (email);
  END IF;
END$$;

-- Optional but useful: same pet name for same client should be unique
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'uq_animals_owner_name'
  ) THEN
    ALTER TABLE public.animals
      ADD CONSTRAINT uq_animals_owner_name UNIQUE (client_id, name);
  END IF;
END$$;

-- Make sure we can’t overlap “same start time” duplicates accidentally (optional)
CREATE INDEX IF NOT EXISTS idx_time_slots_unique_starts ON public.time_slots (starts_at);

create or replace function public.book_time_slot_rpc(
p_slot_id uuid,
p_first_name text,
p_last_name text,
p_birth_date date,
p_phone text,
p_email text,
p_animal_name text,
p_animal_type text,
p_animal_age_years int,
p_notes text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
v_slot record;
v_client_id uuid;
v_animal_id uuid;
v_app_id uuid;
begin
-- 1) Lock the slot row if it's free
select id, starts_at, ends_at, status
into v_slot
from public.time_slots
where id = p_slot_id
for update;

if not found then
raise exception 'Time slot not found';
end if;

if v_slot.status <> 'free' then
raise exception 'Time slot is not available';
end if;

-- 2) Upsert client (by unique email)
insert into public.clients (first_name, last_name, birth_date, phone, email)
values (p_first_name, p_last_name, p_birth_date, p_phone, p_email)
on conflict (email) do update
set first_name = excluded.first_name,
last_name = excluded.last_name,
birth_date = excluded.birth_date,
phone = excluded.phone
returning id into v_client_id;

-- 3) Upsert animal (by owner + name)
insert into public.animals (client_id, name, type, age_years, notes, medications)
values (v_client_id, p_animal_name, p_animal_type, p_animal_age_years, p_notes, null)
on conflict (client_id, name) do update
set type = excluded.type,
age_years = excluded.age_years,
notes = excluded.notes
returning id into v_animal_id;

-- 4) Create appointment (status: 'pending' for now)
insert into public.appointments (client_id, animal_id, scheduled_at, status)
values (v_client_id, v_animal_id, v_slot.starts_at, 'pending')
returning id into v_app_id;

-- 5) Mark slot as booked
update public.time_slots
set status = 'booked'
where id = p_slot_id;

return v_app_id;
end;

$$
;





































do
$$

declare
d date := current_date;
end_date date := current_date + interval '60 days';
t time;
slot_len interval := interval '30 minutes';
begin
while d < end_date loop
if extract(isodow from d) between 1 and 5 then
t := time '09:00';
while t < time '18:00' loop
insert into public.time_slots (starts_at, ends_at, status)
values ((d + t)::timestamptz, (d + t + slot_len)::timestamptz, 'free')
on conflict do nothing;
t := (t + slot_len)::time;
end loop;
end if;
d := d + 1;
end loop;
end $$;

ALTER TABLE public.time_slots
ADD CONSTRAINT uq_time_slots_starts UNIQUE (starts_at);

-- time_slots
create policy "public can read slots"
on public.time_slots
for select
to anon
using (true);

-- appointments (select)
create policy "public can read appointments"
on public.appointments
for select
to anon
using (true);
