"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@/i18n/navigation";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function MobileNav({ open, onClose }: Props) {
  const t = useTranslations("nav");

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const items: { href: string; label: string }[] = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/process", label: t("process") },
    { href: "/compliance", label: t("compliance") },
    { href: "/faq", label: t("faq") },
    { href: "/contact", label: t("contact") },
  ];

  const listVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.06, delayChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -24 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        className={`fixed top-0 left-0 bottom-0 z-[70] w-[300px] max-w-[85vw] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="lg-surface lg-surface-strong h-full m-3 p-6 overflow-y-auto rounded-3xl">
          <div className="flex items-center justify-between mb-8">
            <span className="display text-lg lowercase tracking-tight">
              inko{" "}
              <span className="text-[var(--color-gold-600)] italic font-semibold">
                nikah
              </span>
            </span>
            <button
              onClick={onClose}
              aria-label="Close"
              className="lg-hamburger w-10 h-10 rounded-full flex items-center justify-center"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 1L13 13M13 1L1 13"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <AnimatePresence>
            {open && (
              <motion.nav
                key="mobile-nav-list"
                variants={listVariants}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="flex flex-col gap-1.5"
              >
                {items.map((item) => (
                  <motion.div key={item.href} variants={itemVariants}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="mobile-link group relative block px-4 py-3.5 rounded-2xl text-base font-medium overflow-hidden"
                    >
                      {/* Hover background — gold tinted glass */}
                      <span
                        aria-hidden
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] -translate-x-2 group-hover:translate-x-0"
                        style={{
                          background:
                            "linear-gradient(110deg, rgba(255,239,170,0.55) 0%, rgba(255,211,94,0.4) 50%, rgba(255,255,255,0.2) 100%)",
                          boxShadow:
                            "inset 0 1px 0 rgba(255,255,255,0.7), inset 0 0 0 1px rgba(233,181,58,0.35)",
                        }}
                      />
                      {/* Left bar accent */}
                      <span
                        aria-hidden
                        className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-gradient-to-b from-[#ffd860] to-[#c8932a] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      />
                      {/* Label — slides slightly right + colors gold on hover */}
                      <span className="relative inline-block transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3 group-hover:text-[var(--color-gold-700)]">
                        {item.label}
                      </span>
                      {/* Arrow that slides in on hover */}
                      <span
                        aria-hidden
                        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] text-[var(--color-gold-600)]"
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path
                            d="M1 7H13M13 7L7 1M13 7L7 13"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>

          <motion.a
            initial={{ opacity: 0, y: 16 }}
            animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{
              duration: 0.5,
              delay: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            href="https://forms.gle/V7WHQcC4FGKpYmju6"
            target="_blank"
            rel="noopener"
            className="lg-cta w-full mt-8"
          >
            {t("signup")}
          </motion.a>
        </div>
      </aside>
    </>
  );
}
