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

type Channel = {
  icon: string;
  title: string;
  body?: string;
  /** 카드 하단의 작은 안내문 (선택) */
  note?: string;
  action: string;
  href: string;
};

function ContactContent() {
  const t = useTranslations("contact");
  // 선택 필드(note)가 있는 로케일/채널이 섞여 있으므로 객체를 그대로 읽는다.
  const channels = (t.raw("channels") as Channel[]) || [];
  return (
    <>
      <PageHero kicker={t("kicker")} title={t("title")} subtitle={t("subtitle")} />
      <Section size="md">
        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {channels.map((channel, i) => {
            const { href, icon } = channel;
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
                      <h3 className="display text-lg mb-1.5">{channel.title}</h3>
                      {channel.body && (
                        <p className="text-sm text-[var(--color-muted)] leading-relaxed break-words">
                          {channel.body}
                        </p>
                      )}
                      {channel.note && (
                        <p className="mt-1.5 text-xs text-[var(--color-faint)] leading-relaxed break-words">
                          {channel.note}
                        </p>
                      )}
                      <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-gold-600)]">
                        {channel.action}
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
  // 브랜드 아이콘은 각자의 고유색을 쓰고, 나머지는 브랜드 골드로 통일한다.
  const gold = "var(--color-gold-600)";

  if (name === "instagram") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
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

  if (name === "whatsapp") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="#25D366" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    );
  }

  if (name === "email") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="2.5" y="4.75" width="19" height="14.5" rx="3.2" stroke={gold} strokeWidth="1.9" />
        <path d="M3.9 8.1 12 13.4l8.1-5.3" stroke={gold} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "apply") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M13 2.75H7A2.25 2.25 0 0 0 4.75 5v14A2.25 2.25 0 0 0 7 21.25h10A2.25 2.25 0 0 0 19.25 19V9z"
              stroke={gold} strokeWidth="1.9" strokeLinejoin="round" />
        <path d="M13 2.75V9h6.25" stroke={gold} strokeWidth="1.9" strokeLinejoin="round" />
        <path d="M8.5 13.5l2 2 4.2-4.2" stroke={gold} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "office") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 21.2s6.75-5.9 6.75-10.7a6.75 6.75 0 1 0-13.5 0C5.25 15.3 12 21.2 12 21.2Z"
              stroke={gold} strokeWidth="1.9" strokeLinejoin="round" />
        <circle cx="12" cy="10.2" r="2.6" stroke={gold} strokeWidth="1.9" />
      </svg>
    );
  }

  return <span className="text-xl">{name}</span>;
}
