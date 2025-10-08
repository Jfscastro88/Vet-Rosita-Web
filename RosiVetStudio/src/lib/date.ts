export function formatRome(dt: string | Date) {
  const d = typeof dt === "string" ? new Date(dt) : dt;
  return new Intl.DateTimeFormat("it-IT", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Rome",
  }).format(d);
}
