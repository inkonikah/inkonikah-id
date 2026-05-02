import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { PageHero, Section } from "@/components/glass/Section";
import { GuideSteps } from "@/components/guide/GuideSteps";

export default async function FemaleGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <FemaleGuideContent />;
}

function FemaleGuideContent() {
  const t = useTranslations("guide");
  return (
    <>
      <PageHero
        kicker={t("femaleKicker")}
        title={t("femaleTitle")}
        subtitle={t("femaleSubtitle")}
      />
      <Section size="md">
        <GuideSteps stepsKey="femaleSteps" />
      </Section>
    </>
  );
}
