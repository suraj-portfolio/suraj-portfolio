"use client";

import { usePathname } from "next/navigation";

/** Hides the site header/footer on the embedded Sanity Studio. */
const SiteChrome = ({ children }: { children: React.ReactNode }) =>
  usePathname().startsWith("/studio") ? null : <>{children}</>;

export default SiteChrome;
