-- Update the book_time_slot_rpc function to include medications parameter

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
p_notes text default null,
p_medications text default null
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

-- 3) Upsert animal (by owner + name) - now includes medications
insert into public.animals (client_id, name, type, age_years, notes, medications)
values (v_client_id, p_animal_name, p_animal_type, p_animal_age_years, p_notes, p_medications)
on conflict (client_id, name) do update
set type = excluded.type,
age_years = excluded.age_years,
notes = excluded.notes,
medications = excluded.medications
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
