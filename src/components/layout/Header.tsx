"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { BrandLockup } from "@/components/brand/LovebirdMark";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNav } from "./MobileNav";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  const items: { href: string; label: string }[] = [
    { href: "/about", label: t("about") },
    { href: "/process", label: t("process") },
    { href: "/package", label: t("package") },
    { href: "/compliance", label: t("compliance") },
    { href: "/faq", label: t("faq") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "header-blur" : ""
        }`}
        style={{
          paddingTop: scrolled ? 8 : 16,
          paddingBottom: scrolled ? 8 : 16,
        }}
      >
        <div className="container mx-auto max-w-7xl px-5 md:px-8 flex items-center gap-4">
          <button
            onClick={() => setOpen(true)}
            aria-label="Menu"
            className="lg:hidden lg-hamburger flex items-center justify-center w-11 h-11 rounded-full"
          >
            <span className="lg-hamburger-bars flex flex-col gap-[5px]">
              <span className="block w-[18px] h-[2px] rounded-full bg-current" />
              <span className="block w-[18px] h-[2px] rounded-full bg-current" />
              <span className="block w-[18px] h-[2px] rounded-full bg-current" />
            </span>
          </button>

          <Link
            href="/"
            aria-label="InkkoNika home"
            className="flex-shrink-0 transition-transform duration-300 hover:scale-[1.02]"
          >
            <BrandLockup size="md" />
          </Link>

          <nav className="hidden lg:flex flex-1 justify-center items-center gap-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="lg-pill"
                data-active={isActive(item.href) || undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 ml-auto lg:ml-0 flex-shrink-0">
            <LanguageSwitcher />
            <a
              href="https://forms.gle/V7WHQcC4FGKpYmju6"
              target="_blank"
              rel="noopener"
              className="lg-cta hidden sm:inline-flex"
            >
              {t("signup")}
            </a>
          </div>
        </div>
      </header>

      <MobileNav open={open} onClose={() => setOpen(false)} />
    </>
  );
}
