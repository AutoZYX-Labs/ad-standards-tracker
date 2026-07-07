"use client";

import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-[var(--border)] mt-16 py-8 text-center text-sm text-[var(--muted)]">
      <div
        className="mx-auto w-full max-w-[1760px]"
        style={{ paddingLeft: "clamp(20px, 4vw, 72px)", paddingRight: "clamp(20px, 4vw, 72px)" }}
      >
        <p>
          <strong style={{ fontFamily: "Playfair Display, serif" }}>
            AD·Standards Tracker
          </strong>{" "}
          &mdash; {t("footer.desc")}
        </p>
        <p className="mt-1">
          <a href="/contribute" className="text-[var(--accent)] hover:underline">
            {t("nav.contribute")}
          </a>{" "}
          &middot;{" "}
          <a
            href="https://github.com/AutoZYX-Labs/ad-standards-tracker"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] hover:underline"
          >
            GitHub
          </a>{" "}
          &middot; Apache 2.0 &middot;{" "}
          <a href="https://roam.autozyx.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
            ROAM
          </a>{" "}
          &middot;{" "}
          <a href="https://roam-explorer.autozyx.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
            ROAM Explorer
          </a>
        </p>
      </div>
    </footer>
  );
}
