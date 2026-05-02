import { forwardRef, type HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  strong?: boolean;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
};

const padMap = {
  sm: "p-5",
  md: "p-7 md:p-8",
  lg: "p-8 md:p-10",
};

export const GlassCard = forwardRef<HTMLDivElement, Props>(function GlassCard(
  { strong, hover, padding = "md", className = "", children, ...rest },
  ref
) {
  const classes = [
    "lg-surface",
    strong ? "lg-surface-strong" : "",
    hover ? "lg-surface-hover" : "",
    padMap[padding],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
    </div>
  );
});
