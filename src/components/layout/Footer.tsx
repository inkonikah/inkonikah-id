import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations();
  return (
    <footer className="relative pt-20 pb-12 mt-12">
      <div className="container mx-auto max-w-6xl px-5 md:px-8">
        <div className="lg-surface lg-surface-strong p-8 md:p-12 rounded-[32px]">
          <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-10">
            <div>
              <div className="display text-2xl mb-3 lowercase tracking-tight">
                inko{" "}
                <span className="text-[var(--color-gold-600)] italic font-semibold">
                  nikah
                </span>
              </div>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-sm">
                {t("footer.tagline")}
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-[var(--color-gold-600)]">
                {t("nav.about")}
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/process" className="hover:text-[var(--color-gold-600)] transition-colors">
                    {t("nav.process")}
                  </Link>
                </li>
                <li>
                  <Link href="/compliance" className="hover:text-[var(--color-gold-600)] transition-colors">
                    {t("nav.compliance")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-[var(--color-gold-600)]">
                {t("nav.contact")}
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="mailto:inkonikah@inkonikah.com" className="hover:text-[var(--color-gold-600)] transition-colors break-all">
                    inkonikah@inkonikah.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/inko.nikah"
                    target="_blank"
                    rel="noopener"
                    className="hover:text-[var(--color-gold-600)] transition-colors"
                  >
                    @inko.nikah
                  </a>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-[var(--color-gold-600)] transition-colors">
                    {t("nav.faq")}
                  </Link>
                </li>
                <li>
                  <a
                    href="https://forms.gle/V7WHQcC4FGKpYmju6"
                    target="_blank"
                    rel="noopener"
                    className="hover:text-[var(--color-gold-600)] transition-colors"
                  >
                    {t("nav.signup")}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <hr className="my-8 border-0 border-t border-black/5" />

          <div className="text-xs text-[var(--color-muted)] space-y-1.5">
            <div className="font-bold text-[var(--color-ink)]">{t("footer.company")}</div>
            <div>{t("footer.nib")}</div>
            <div>{t("footer.ahu")}</div>
            <div>{t("footer.address")}</div>
            <div className="pt-2 text-[11px] text-[var(--color-faint)]">{t("footer.copy")}</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
