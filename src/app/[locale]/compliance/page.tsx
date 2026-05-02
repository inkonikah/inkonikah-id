import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { PageHero, Section } from "@/components/glass/Section";
import { GlassCard } from "@/components/glass/GlassCard";

export default async function CompliancePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ComplianceContent />;
}

function ComplianceContent() {
  const t = useTranslations("compliance");
  return (
    <>
      <PageHero kicker={t("kicker")} title={t("title")} subtitle={t("subtitle")} />

      <Section size="md">
        <div className="grid md:grid-cols-2 gap-5">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <GlassCard
              key={i}
              hover
              padding="lg"
              className="fade-up"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="icon-bubble mb-4">{t(`items.${i}.icon`)}</div>
              <h3 className="display text-xl mb-2">{t(`items.${i}.title`)}</h3>
              <p className="text-[var(--color-muted)] text-[15px] leading-relaxed">
                {t(`items.${i}.body`)}
              </p>
            </GlassCard>
          ))}
        </div>
      </Section>
    </>
  );
}
