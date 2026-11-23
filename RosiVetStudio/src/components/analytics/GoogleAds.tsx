"use client";

import { useEffect } from "react";
import { trackContactConversion } from "@/lib/gtag";

function isContactLink(href: string) {
  return href.startsWith("tel:") || href.startsWith("https://wa.me/");
}

export default function GoogleAds() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest("a");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      if (!isContactLink(href)) return;

      trackContactConversion();
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
