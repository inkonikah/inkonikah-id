import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { PageHero, Section } from "@/components/glass/Section";
import { FAQAccordion } from "@/components/faq/FAQAccordion";

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <FAQContent />;
}

function FAQContent() {
  const t = useTranslations("faq");
  return (
    <>
      <PageHero kicker={t("kicker")} title={t("title")} subtitle={t("subtitle")} />
      <Section size="md">
        <div className="max-w-3xl mx-auto">
          <FAQAccordion />
        </div>
      </Section>
    </>
  );
}
