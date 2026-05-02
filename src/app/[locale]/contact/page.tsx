import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { PageHero, Section } from "@/components/glass/Section";
import { GlassCard } from "@/components/glass/GlassCard";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactContent />;
}

function ContactContent() {
  const t = useTranslations("contact");
  // Length is data-driven; fall back gracefully if a locale has fewer channels.
  const channels = (t.raw("channels") as { icon: string }[]) || [];
  return (
    <>
      <PageHero kicker={t("kicker")} title={t("title")} subtitle={t("subtitle")} />
      <Section size="md">
        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {channels.map((_, i) => {
            const href = t(`channels.${i}.href`);
            const icon = t(`channels.${i}.icon`);
            const isExternal = /^https?:|^mailto:|^tel:/.test(href);
            return (
              <a
                key={i}
                href={href}
                target={
                  isExternal &&
                  !href.startsWith("mailto:") &&
                  !href.startsWith("tel:")
                    ? "_blank"
                    : undefined
                }
                rel={isExternal ? "noopener" : undefined}
                className="block fade-up"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <GlassCard hover padding="lg" className="h-full">
                  <div className="flex items-start gap-5">
                    <div className="icon-bubble">
                      <ChannelIcon name={icon} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="display text-lg mb-1.5">
                        {t(`channels.${i}.title`)}
                      </h3>
                      <p className="text-sm text-[var(--color-muted)] leading-relaxed break-words">
                        {t(`channels.${i}.body`)}
                      </p>
                      <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-gold-600)]">
                        {t(`channels.${i}.action`)}
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path
                            d="M1 6H11M11 6L6 1M11 6L6 11"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </a>
            );
          })}
        </div>
      </Section>
    </>
  );
}

function ChannelIcon({ name }: { name: string }) {
  if (name === "instagram") {
    return (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="url(#ig-grad)" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" stroke="url(#ig-grad)" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="url(#ig-grad)" />
        <defs>
          <linearGradient id="ig-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f9ce34" />
            <stop offset="50%" stopColor="#ee2a7b" />
            <stop offset="100%" stopColor="#6228d7" />
          </linearGradient>
        </defs>
      </svg>
    );
  }
  return <span className="text-xl">{name}</span>;
}
