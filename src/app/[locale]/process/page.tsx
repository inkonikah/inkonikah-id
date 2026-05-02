import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { PageHero, Section } from "@/components/glass/Section";
import { Timeline } from "@/components/process/Timeline";

export default async function ProcessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProcessContent />;
}

function ProcessContent() {
  const t = useTranslations("process");
  return (
    <>
      <PageHero kicker={t("kicker")} title={t("title")} subtitle={t("subtitle")} />

      <Section size="sm">
        <div className="lg-surface rounded-2xl p-4 max-w-3xl mx-auto text-center text-sm text-[var(--color-muted)] fade-up">
          <span className="text-[var(--color-gold-600)] font-bold mr-1.5">ⓘ</span>
          {t("notice")}
        </div>
      </Section>

      <Section size="sm">
        <div className="max-w-3xl mx-auto">
          <Timeline />
        </div>
      </Section>
    </>
  );
}
