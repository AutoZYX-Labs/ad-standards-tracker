"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useI18n, LangToggle } from "@/lib/i18n";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const { t, lang } = useI18n();

  const LINKS = [
    { href: "/", label: t("nav.dashboard") },
    { href: "/standards", label: t("nav.standards") },
    { href: "/maps", label: t("nav.maps") },
    { href: "/sources", label: t("nav.sources") },
    { href: "/about", label: t("nav.about") },
    { href: "/contribute", label: t("nav.contribute") },
    { href: "/ask", label: t("nav.ask") },
  ];

  useEffect(() => {
    const threshold = 10;
    const minDelta = 4;
    let lastY = window.scrollY || 0;
    let ticking = false;

    const update = () => {
      const y = Math.max(window.scrollY || 0, 0);
      const delta = y - lastY;
      const nav = navRef.current;
      const pinned =
        y <= threshold ||
        open ||
        Boolean(nav?.matches(":hover")) ||
        Boolean(nav?.contains(document.activeElement));

      setScrolled(y > threshold);

      if (pinned) {
        setHidden(false);
      } else if (Math.abs(delta) >= minDelta) {
        setHidden(delta > 0 && y > (nav?.offsetHeight ?? 72) + threshold);
      }

      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <nav
      ref={navRef}
      onMouseEnter={() => setHidden(false)}
      onFocusCapture={() => setHidden(false)}
      className={`sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur transition-[transform,opacity,box-shadow] duration-200 motion-reduce:transition-none ${
        hidden ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
      } ${scrolled ? "shadow-[0_6px_24px_rgba(42,37,32,0.08)]" : ""}`}
    >
      <div
        className="mx-auto flex w-full max-w-[1760px] items-center justify-between py-3"
        style={{ paddingLeft: "clamp(20px, 4vw, 72px)", paddingRight: "clamp(20px, 4vw, 72px)" }}
      >
        <Link href="/" className="flex items-center gap-2 font-semibold no-underline text-[var(--text)]">
          <span
            className="text-[var(--accent)] font-bold text-lg"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            AD·Standards
          </span>
          <span className="text-xs text-[var(--muted)] hidden sm:inline">
            {lang === "zh" ? "标准追踪" : "Tracker"}
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => {
            const isActive = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
            const isSub = l.href === "/contribute";

            if (isSub) {
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`ml-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all no-underline inline-flex items-center gap-1 whitespace-nowrap ${
                    isActive
                      ? "bg-[var(--accent)] text-white shadow-sm"
                      : "bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30 hover:bg-[var(--accent)] hover:text-white"
                  }`}
                >
                  <span aria-hidden>↗</span>
                  {l.label}
                </Link>
              );
            }

            return (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors no-underline ${
                  isActive
                    ? "bg-[var(--accent)]/10 text-[var(--accent)] font-medium"
                    : "text-[var(--muted)] hover:text-[var(--text)]"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <LangToggle />
          <a
            href="https://github.com/AutoZYX-Labs/ad-standards-tracker"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 text-[var(--muted)] hover:text-[var(--text)] text-sm no-underline"
          >
            GitHub
          </a>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <LangToggle />
          <button
            onClick={() => {
              setOpen(!open);
              setHidden(false);
            }}
            className="p-2 text-[var(--muted)] cursor-pointer"
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M4 4l12 12M16 4L4 16" /> : <path d="M3 5h14M3 10h14M3 15h14" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div
          className="mx-auto w-full max-w-[1760px] md:hidden border-t border-[var(--border)] pb-3"
          style={{ paddingLeft: "clamp(20px, 4vw, 72px)", paddingRight: "clamp(20px, 4vw, 72px)" }}
        >
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block py-2 text-sm no-underline ${
                pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href))
                  ? "text-[var(--accent)] font-medium"
                  : "text-[var(--muted)]"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
