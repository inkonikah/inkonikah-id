"use client";

import { useTranslations, useLocale } from "next-intl";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/glass/GlassCard";

type Step = {
  title: string;
  body: string;
  monthsMin: number;
  monthsMax: number;
};

function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  const day = d.getDate();
  d.setMonth(d.getMonth() + months);
  // handle month-end overflow
  if (d.getDate() < day) d.setDate(0);
  return d;
}

function formatDate(date: Date, locale: string): string {
  return date.toLocaleDateString(
    locale === "ko" ? "ko-KR" : locale === "id" ? "id-ID" : "en-US",
    { year: "numeric", month: "short", day: "numeric" }
  );
}

export function Timeline() {
  const t = useTranslations("process");
  const locale = useLocale();
  const [start, setStart] = useState<string>(() => {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  });

  // monthsMin/Max는 메시지 파일에 숫자로 들어 있다. t()는 문자열 메시지만
  // 다루므로 숫자에 쓰면 INVALID_MESSAGE로 실패한다. 배열을 통째로 읽는다.
  const steps = useMemo<Step[]>(() => t.raw("steps") as Step[], [t]);

  const startDate = useMemo(() => new Date(start), [start]);
  const valid = !isNaN(startDate.getTime());

  return (
    <div className="space-y-6">
      <GlassCard padding="md" strong className="fade-up">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <label
              htmlFor="start-date"
              className="block text-xs font-bold uppercase tracking-wider text-[var(--color-gold-600)] mb-2"
            >
              {t("datePicker.label")}
            </label>
            <input
              id="start-date"
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-white/70 border border-white/40 backdrop-blur-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-gold-300)] focus:border-transparent transition-all"
            />
          </div>
          <button
            onClick={() => setStart(new Date().toISOString().slice(0, 10))}
            className="lg-pill mt-2 sm:mt-7"
          >
            {t("datePicker.today")}
          </button>
        </div>
      </GlassCard>

      <div className="relative">
        {/* Vertical connector line */}
        <div
          aria-hidden
          className="absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-[var(--color-gold-300)] via-[var(--color-gold-300)]/40 to-transparent md:left-[35px]"
        />

        <ol className="space-y-5">
          {steps.map((step, i) => {
            const minDate = valid ? addMonths(startDate, step.monthsMin) : null;
            const maxDate = valid ? addMonths(startDate, step.monthsMax) : null;
            return (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-16 md:pl-20"
              >
                <div className="numbered-badge absolute left-0 top-2">{i + 1}</div>
                <GlassCard hover padding="md">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <h3 className="display text-lg md:text-xl">{step.title}</h3>
                    <div className="text-xs font-bold text-[var(--color-gold-600)] bg-[var(--color-gold-50)] px-3 py-1 rounded-full whitespace-nowrap">
                      {step.monthsMin}–{step.monthsMax} {t("datePicker.rangeSuffix")}
                    </div>
                  </div>
                  <p className="text-[var(--color-muted)] mt-2 text-sm md:text-[15px] leading-relaxed">
                    {step.body}
                  </p>
                  {minDate && maxDate && (
                    <div className="mt-3 text-xs text-[var(--color-faint)] font-medium">
                      {formatDate(minDate, locale)} → {formatDate(maxDate, locale)}
                    </div>
                  )}
                </GlassCard>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
