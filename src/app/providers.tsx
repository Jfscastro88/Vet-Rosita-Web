"use client";

import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { DatesProvider } from "@mantine/dates";
import "dayjs/locale/it";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider>
      <DatesProvider settings={{ locale: "it" }}>{children}</DatesProvider>
    </MantineProvider>
  );
}
