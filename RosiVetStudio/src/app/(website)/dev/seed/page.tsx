"use client";

import { useState } from "react";
import { seedSlots } from "@/app/actions/seedSlots";

export default function SeedPage() {
  const [msg, setMsg] = useState("");
  return (
    <div className="p-6">
      <button
        className="px-4 py-2 rounded bg-teal-600 text-white"
        onClick={async () => {
          const res = await seedSlots();
          setMsg(JSON.stringify(res));
        }}
      >
        Genera disponibilità (7 giorni)
      </button>
      <pre className="mt-4 text-sm">{msg}</pre>
    </div>
  );
}
