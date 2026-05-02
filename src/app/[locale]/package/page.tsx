import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { PageHero, Section } from "@/components/glass/Section";
import { GlassCard } from "@/components/glass/GlassCard";

export default async function PackagePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PackageContent />;
}

function PackageContent() {
  const t = useTranslations("package");
  return (
    <>
      <PageHero kicker={t("kicker")} title={t("title")} />

      <Section size="sm">
        <div className="lg-surface rounded-2xl p-4 max-w-3xl mx-auto text-center text-sm text-[var(--color-muted)] fade-up">
          <span className="text-[var(--color-gold-600)] font-bold mr-1.5">♥</span>
          {t("subtitle")}
        </div>
      </Section>

      <Section size="md">
        <div className="grid lg:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          {[0, 1, 2].map((i) => {
            const highlight =
              t.raw(`tiers.${i}.highlight` as never) === true;
            const features = t.raw(`tiers.${i}.features`) as string[];
            return (
              <PricingCard
                key={i}
                index={i}
                icon={t(`tiers.${i}.icon`)}
                name={t(`tiers.${i}.name`)}
                tag={t(`tiers.${i}.tag`)}
                price={t(`tiers.${i}.price`)}
                description={t(`tiers.${i}.description`)}
                features={features}
                highlight={highlight}
              />
            );
          })}
        </div>
      </Section>
    </>
  );
}

function PricingCard({
  index,
  icon,
  name,
  tag,
  price,
  description,
  features,
  highlight,
}: {
  index: number;
  icon: string;
  name: string;
  tag: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
}) {
  return (
    <div
      className={`relative fade-up ${highlight ? "lg:-translate-y-3" : ""}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 rounded-full text-xs font-bold text-[#4a3508] bg-gradient-to-b from-[#fff3c5] via-[#ffd860] to-[#d3a034] shadow-[0_8px_18px_rgba(200,147,42,0.3)]">
          {tag}
        </div>
      )}
      <div
        className={`lg-surface ${
          highlight ? "lg-surface-strong" : ""
        } lg-surface-hover h-full p-7 md:p-8 flex flex-col`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="icon-bubble text-2xl" style={{ width: 48, height: 48 }}>
            {icon}
          </div>
          {!highlight && (
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-gold-600)] bg-[var(--color-gold-50)] px-2.5 py-1 rounded-full">
              {tag}
            </span>
          )}
        </div>
        <h3 className="display text-2xl mb-2">{name}</h3>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-5">
          {description}
        </p>
        <div className="text-2xl font-bold text-[var(--color-gold-600)] mb-6">
          {price}
        </div>
        <hr className="border-0 border-t border-black/[0.06] mb-5" />
        <ul className="space-y-3 flex-1">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                className="flex-shrink-0 mt-0.5"
              >
                <circle cx="9" cy="9" r="9" fill="url(#g)" />
                <path
                  d="M5 9.5L8 12L13 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="18">
                    <stop offset="0" stopColor="#ffd860" />
                    <stop offset="1" stopColor="#c8932a" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-[var(--color-ink-soft)]">{f}</span>
            </li>
          ))}
        </ul>
        <a
          href="https://forms.gle/V7WHQcC4FGKpYmju6"
          target="_blank"
          rel="noopener"
          className={`mt-7 w-full ${highlight ? "lg-cta" : "lg-outline"}`}
        >
          {highlight ? "Get Started" : "Inquire"}
        </a>
      </div>
    </div>
  );
}
