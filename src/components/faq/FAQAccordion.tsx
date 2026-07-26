"use client";

import { useTranslations } from "next-intl";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Item = { category: string; q: string; a: string };

export function FAQAccordion() {
  const t = useTranslations("faq");
  const items = t.raw("items") as Item[];
  const [filter, setFilter] = useState<string>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(items.map((it) => it.category)));
    return cats;
  }, [items]);

  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((it) => it.category === filter)),
    [items, filter]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          className="lg-pill"
          data-active={filter === "all" || undefined}
          onClick={() => setFilter("all")}
        >
          {t("categories.all")}
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className="lg-pill"
            data-active={filter === cat || undefined}
            onClick={() => setFilter(cat)}
          >
            {t(`categories.${cat}`)}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={`${filter}-${i}`}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className={`lg-surface ${
                  isOpen ? "lg-surface-strong" : ""
                } overflow-hidden transition-all`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full text-left p-5 md:p-6 flex items-start gap-4"
                >
                  <span className="display flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-b from-[#fff3c5] to-[#d3a034] text-[#4a3508] text-sm font-bold flex items-center justify-center mt-0.5">
                    Q
                  </span>
                  <span className="flex-1 text-[15px] md:text-base font-bold leading-snug">
                    {item.q}
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className={`flex-shrink-0 mt-2 transition-transform duration-400 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      d="M1 4L7 10L13 4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="px-5 md:px-6 pb-5 md:pb-6 pl-[68px] md:pl-[70px] text-[var(--color-muted)] text-[15px] leading-relaxed">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
