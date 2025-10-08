"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { formatRome } from "@/lib/date";

type Slot = {
  id: string;
  starts_at: string;
  ends_at: string;
  status: string;
};

export function SlotPicker({ onPick }: { onPick: (slot: Slot) => void }) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("time_slots")
        .select("id, starts_at, ends_at, status")
        .eq("status", "free")
        .gte("starts_at", new Date().toISOString())
        .order("starts_at", { ascending: true })
        .limit(1000);
      if (!error && data) setSlots(data as Slot[]);
      setLoading(false);
    })();
  }, []);

  if (loading) return <p>Caricamento disponibilità…</p>;
  if (!slots.length) return <p>Nessuna disponibilità al momento.</p>;

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
      {slots.map((s) => (
        <button
          key={s.id}
          onClick={() => {
            setSelected(s.id);
            onPick(s);
          }}
          className={`p-3 rounded border text-left ${
            selected === s.id ? "border-teal-600 bg-teal-50" : "border-gray-300"
          }`}
        >
          <div className="font-medium">{formatRome(s.starts_at)}</div>
          <div className="text-xs text-gray-500">~ {formatRome(s.ends_at)}</div>
        </button>
      ))}
    </div>
  );
}
