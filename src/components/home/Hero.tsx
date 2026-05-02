"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { LovebirdMark } from "@/components/brand/LovebirdMark";

export function Hero() {
  const t = useTranslations("home");
  const tNav = useTranslations("nav");
  const titleLines = t("title").split("\n");

  return (
    <section className="relative pt-32 md:pt-44 pb-16 md:pb-24 overflow-hidden">
      {/* Floating ambient blobs */}
      <div
        aria-hidden
        className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full opacity-50 animate-drift pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,196,206,0.7) 0%, rgba(255,196,206,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -top-20 -right-32 w-[380px] h-[380px] rounded-full opacity-50 animate-drift pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(196,220,239,0.7) 0%, rgba(196,220,239,0) 70%)",
          animationDelay: "3s",
        }}
      />

      <div className="container mx-auto max-w-6xl px-5 md:px-8 relative">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="kicker"
            >
              {t("kicker")}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="display mt-6 text-[clamp(36px,6.4vw,72px)]"
            >
              {titleLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-[var(--color-muted)] text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              {t("subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-col items-center lg:items-start gap-3"
            >
              <div className="flex items-center gap-3 flex-wrap justify-center lg:justify-start">
                <a
                  href="https://forms.gle/V7WHQcC4FGKpYmju6"
                  target="_blank"
                  rel="noopener"
                  className="lg-cta px-6 py-3 text-[15px]"
                >
                  {t("ctaPrimary")}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M1 7H13M13 7L7 1M13 7L7 13"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <Link href="/process" className="lg-outline px-5 py-3 text-[15px]">
                  {t("ctaSecondary")}
                </Link>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-gold-700)] bg-[var(--color-gold-50)]/80 px-3 py-1.5 rounded-full border border-[var(--color-gold-200)]/50">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M3 5L4.5 6.5L7 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {tNav("applyFree")}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="lg-surface lg-surface-strong rounded-[36px] p-10 md:p-14 animate-float text-center relative overflow-hidden">
              {/* Soft golden glow behind the mark */}
              <div
                aria-hidden
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse, rgba(255,216,96,0.35) 0%, rgba(255,216,96,0) 70%)",
                  filter: "blur(8px)",
                }}
              />
              <LovebirdMark
                pose="pair"
                width={260}
                height={174}
                className="relative mx-auto drop-shadow-[0_12px_24px_rgba(200,147,42,0.25)]"
              />
              <div className="relative mt-6 script text-[clamp(34px,5vw,52px)] leading-[1.05] text-[var(--color-ink)]">
                Find your
              </div>
              <div className="relative script text-[clamp(48px,7vw,76px)] leading-[1.05] bg-gradient-to-b from-[#e9b53a] to-[#9c7218] bg-clip-text text-transparent -mt-1">
                Lovebird
              </div>
              <div className="relative mt-6 text-[10px] md:text-xs uppercase tracking-[0.32em] text-[var(--color-faint)] font-bold">
                Real People · Real Relationships
              </div>
            </div>
            {/* Decorative accent dots */}
            <div className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-[var(--color-gold-400)] shadow-[0_0_20px_rgba(233,181,58,0.6)]" />
            <div className="absolute -bottom-3 -left-3 w-2 h-2 rounded-full bg-[var(--color-rose)] shadow-[0_0_18px_rgba(255,196,206,0.8)]" />
          </motion.div>
        </div>

        {/* Trust strip */}
        <div className="mt-16 md:mt-24">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-faint)]">
              {t("trust.label")}
            </span>
          </div>
          <div className="lg-surface lg-surface-strong rounded-[28px] p-2 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-black/[0.06]">
            {[0, 1, 2].map((i) => (
              <div key={i} className="px-6 py-6 text-center">
                <div className="display text-3xl md:text-4xl bg-gradient-to-b from-[#e9b53a] to-[#9c7218] bg-clip-text text-transparent">
                  {t(`trust.items.${i}.value`)}
                </div>
                <div className="text-xs md:text-sm text-[var(--color-muted)] mt-2">
                  {t(`trust.items.${i}.label`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
