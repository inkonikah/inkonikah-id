import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { Section } from "@/components/glass/Section";
import { GlassCard } from "@/components/glass/GlassCard";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations("home");
  return (
    <>
      <Hero />

      {/* Meaning — what InkkoNika stands for */}
      <Section size="md">
        <div className="max-w-3xl mx-auto text-center">
          <span className="kicker">Lovebird</span>
          <h2 className="display mt-5 text-[clamp(28px,4.5vw,46px)]">
            {t("meaningTitle")}
          </h2>
          <p className="mt-6 text-[var(--color-muted)] text-base md:text-lg leading-relaxed">
            {t("meaningBody")}
          </p>
        </div>
      </Section>

      {/* Trust — three pillars of why */}
      <Section size="sm">
        <div className="text-center mb-12">
          <span className="kicker">Why InkkoNika</span>
          <h2 className="display mt-4 text-[clamp(28px,4.5vw,46px)]">
            {t("featuresTitle")}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {[0, 1, 2].map((i) => (
            <GlassCard
              key={i}
              hover
              padding="lg"
              className="fade-up"
              style={{ animationDelay: `${0.1 + i * 0.08}s` }}
            >
              <div className="text-3xl mb-4 text-[var(--color-gold-500)]">
                {t(`features.${i}.icon`)}
              </div>
              <h3 className="display text-xl mb-3">{t(`features.${i}.title`)}</h3>
              <p className="text-[var(--color-muted)] text-[15px] leading-relaxed">
                {t(`features.${i}.body`)}
              </p>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* Values — six promises, denser layout */}
      <Section size="sm">
        <div className="text-center mb-10">
          <span className="kicker">{t("valuesSubtitle")}</span>
          <h2 className="display mt-4 text-[clamp(26px,4vw,40px)]">
            {t("valuesTitle")}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <GlassCard
              key={i}
              hover
              padding="md"
              className="fade-up flex items-start gap-4"
              style={{ animationDelay: `${0.05 + i * 0.05}s` }}
            >
              <div className="text-[var(--color-gold-500)] text-xl mt-0.5 leading-none">
                {t(`values.${i}.icon`)}
              </div>
              <div>
                <h3 className="font-bold text-base mb-1">{t(`values.${i}.title`)}</h3>
                <p className="text-sm text-[var(--color-muted)]">
                  {t(`values.${i}.body`)}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* CTA — emotional close */}
      <Section size="md">
        <div className="lg-surface lg-surface-strong rounded-[36px] p-10 md:p-16 text-center relative overflow-hidden">
          <div
            aria-hidden
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-50 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse, rgba(255,227,154,0.5) 0%, rgba(255,227,154,0) 70%)",
            }}
          />
          <h2 className="display text-[clamp(28px,4.5vw,46px)] whitespace-pre-line relative">
            {t("ctaSection.title")}
          </h2>
          <p className="mt-5 text-[var(--color-muted)] text-base md:text-lg max-w-xl mx-auto relative">
            {t("ctaSection.body")}
          </p>
          <a
            href="https://forms.gle/V7WHQcC4FGKpYmju6"
            target="_blank"
            rel="noopener"
            className="lg-cta mt-8 px-7 py-3.5 text-[15px] relative"
          >
            {t("ctaSection.button")}
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
        </div>
      </Section>
    </>
  );
}
