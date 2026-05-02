import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { PageHero, Section } from "@/components/glass/Section";
import { GlassCard } from "@/components/glass/GlassCard";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations("about");
  return (
    <>
      <PageHero kicker={t("kicker")} title={t("title")} subtitle={t("subtitle")} />

      <Section size="sm">
        <GlassCard padding="lg" strong className="max-w-3xl mx-auto fade-up">
          <h3 className="display text-2xl md:text-3xl mb-4">{t("meaningTitle")}</h3>
          <p className="text-[var(--color-muted)] leading-relaxed">{t("meaningBody")}</p>
          <div className="mt-5 p-4 rounded-2xl bg-[var(--color-gold-50)] border border-[var(--color-gold-200)]/60 text-sm text-[var(--color-gold-700)] leading-relaxed">
            {t("meaningNote")}
          </div>
        </GlassCard>
      </Section>

      <Section size="sm">
        <div className="grid md:grid-cols-2 gap-5">
          <GlassCard hover padding="lg" className="fade-up">
            <div className="kicker mb-4">Vision</div>
            <h3 className="display text-2xl mb-3">{t("visionTitle")}</h3>
            <p className="text-[var(--color-muted)] leading-relaxed">{t("visionBody")}</p>
          </GlassCard>
          <GlassCard hover padding="lg" className="fade-up fade-up-1">
            <div className="kicker mb-4">Mission</div>
            <h3 className="display text-2xl mb-3">{t("missionTitle")}</h3>
            <p className="text-[var(--color-muted)] leading-relaxed">{t("missionBody")}</p>
          </GlassCard>
        </div>
      </Section>

      <Section size="md">
        <div className="text-center mb-10">
          <h2 className="display text-[clamp(28px,4.5vw,42px)]">{t("valuesTitle")}</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <GlassCard
              key={i}
              hover
              padding="md"
              className="fade-up text-center"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="text-[var(--color-gold-500)] text-2xl mb-2">✦</div>
              <p className="text-sm text-[var(--color-ink)]">{t(`values.${i}`)}</p>
            </GlassCard>
          ))}
        </div>
      </Section>
    </>
  );
}
