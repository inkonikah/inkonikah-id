import type { HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: "py-8 md:py-12",
  md: "py-12 md:py-16",
  lg: "py-16 md:py-24",
};

export function Section({ children, className = "", size = "md", ...rest }: Props) {
  return (
    <section className={`relative ${sizeMap[size]} ${className}`} {...rest}>
      <div className="container mx-auto max-w-6xl px-5 md:px-8">{children}</div>
    </section>
  );
}

export function PageHero({
  kicker,
  title,
  subtitle,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="relative pt-28 md:pt-36 pb-8 md:pb-12">
      <div className="container mx-auto max-w-4xl px-5 md:px-8 text-center">
        {kicker && <span className="kicker fade-up">{kicker}</span>}
        <h1 className="display fade-up fade-up-1 mt-5 text-[clamp(34px,6vw,64px)] whitespace-pre-line">
          {title}
        </h1>
        {subtitle && (
          <p className="fade-up fade-up-2 mt-5 text-[var(--color-muted)] text-base md:text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
}
