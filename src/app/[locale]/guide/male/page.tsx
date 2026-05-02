import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { PageHero, Section } from "@/components/glass/Section";
import { GuideSteps } from "@/components/guide/GuideSteps";

export default async function MaleGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <MaleGuideContent />;
}

function MaleGuideContent() {
  const t = useTranslations("guide");
  return (
    <>
      <PageHero
        kicker={t("maleKicker")}
        title={t("maleTitle")}
        subtitle={t("maleSubtitle")}
      />
      <Section size="md">
        <GuideSteps stepsKey="maleSteps" />
      </Section>
    </>
  );
}
