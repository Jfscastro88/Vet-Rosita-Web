"use client";

import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import { DatesProvider } from "@mantine/dates";
import { Notifications } from "@mantine/notifications";
import "dayjs/locale/it";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider>
      <DatesProvider settings={{ locale: "it" }}>
        <Notifications />
        {children}
      </DatesProvider>
    </MantineProvider>
  );
}
