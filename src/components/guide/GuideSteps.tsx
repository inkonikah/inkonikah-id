"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/glass/GlassCard";

export function GuideSteps({ stepsKey }: { stepsKey: "femaleSteps" | "maleSteps" }) {
  const t = useTranslations("guide");
  const steps = [0, 1, 2, 3, 4, 5];
  return (
    <div className="grid md:grid-cols-2 gap-5">
      {steps.map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          <GlassCard hover padding="lg" className="h-full">
            <div className="flex items-start gap-4 mb-3">
              <div className="numbered-badge">{i + 1}</div>
              <h3 className="display text-lg md:text-xl pt-2">
                {t(`${stepsKey}.${i}.title`)}
              </h3>
            </div>
            <p className="text-[var(--color-muted)] text-[15px] leading-relaxed">
              {t(`${stepsKey}.${i}.body`)}
            </p>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}
