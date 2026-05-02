import type { SVGProps } from "react";

type Variant = "mono" | "gold" | "outline";

type Props = SVGProps<SVGSVGElement> & {
  variant?: Variant;
  /** "single" = one chubby parakeet. "pair" = two facing each other. */
  pose?: "single" | "pair";
};

/**
 * Super simple kawaii 잉꼬 — round blob body, two dot eyes, tiny beak.
 * No branch, no wings, no detailed feet. Reads instantly at any size.
 *
 * Single viewBox: 0 0 60 60
 * Pair viewBox: 0 0 130 60 — two blobs touching beaks.
 */
export function LovebirdMark({
  variant = "gold",
  pose = "single",
  ...rest
}: Props) {
  const isOutline = variant === "outline";
  const fill =
    variant === "outline"
      ? "none"
      : variant === "mono"
      ? "currentColor"
      : "url(#lovebird-gold)";
  const stroke = isOutline ? "currentColor" : "none";

  const viewBox = pose === "pair" ? "0 0 130 60" : "0 0 60 60";

  return (
    <svg
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="InkkoNika"
      {...rest}
    >
      {variant === "gold" && (
        <defs>
          <linearGradient id="lovebird-gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff3c5" />
            <stop offset="45%" stopColor="#ffd860" />
            <stop offset="100%" stopColor="#c8932a" />
          </linearGradient>
        </defs>
      )}

      <defs>
        {/* Single chubby parakeet — facing right by default */}
        <symbol id="parakeet-blob" viewBox="0 0 60 60">
          {/* Body — almost-perfect blob with a small tail flick */}
          <path
            d="M 14 32
               Q 12 12, 32 10
               Q 50 10, 52 30
               Q 52 46, 38 50
               L 48 56
               L 32 50
               Q 16 50, 14 32
               Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Tiny crest tuft */}
          <path
            d="M 30 8
               Q 32 2, 36 4
               Q 35 8, 33 9
               Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Cheek blush */}
          {!isOutline && (
            <circle cx="22" cy="34" r="3.2" fill="#ff8aa3" fillOpacity="0.45" />
          )}
          {/* Eye — single big round dot (the "facing" eye) */}
          <circle
            cx="38"
            cy="26"
            r="3.2"
            fill={isOutline ? "none" : "#1a1209"}
            stroke={isOutline ? "currentColor" : "none"}
            strokeWidth="1.8"
          />
          {!isOutline && <circle cx="39" cy="25" r="1" fill="#fff" />}
          {/* Beak — tiny diamond, pointing right */}
          <path
            d="M 50 28
               L 56 30
               L 50 31
               Z"
            fill={isOutline ? "none" : "#d97a18"}
            stroke={isOutline ? "currentColor" : "none"}
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </symbol>
      </defs>

      {pose === "single" ? (
        <use href="#parakeet-blob" x="0" y="0" width="60" height="60" />
      ) : (
        <>
          {/* Left bird */}
          <use href="#parakeet-blob" x="0" y="0" width="60" height="60" />
          {/* Right bird (mirrored to face left) */}
          <g transform="translate(130 0) scale(-1 1)">
            <use href="#parakeet-blob" x="0" y="0" width="60" height="60" />
          </g>
          {/* Tiny love-spark heart between them */}
          {!isOutline && (
            <path
              d="M 65 22
                 C 63 19, 60 19, 60 23
                 C 60 26, 65 30, 65 30
                 C 65 30, 70 26, 70 23
                 C 70 19, 67 19, 65 22
                 Z"
              fill="#ff6f8a"
            />
          )}
        </>
      )}
    </svg>
  );
}

/**
 * Brand wordmark: parakeet blob + "inko nikah" lowercase.
 */
export function BrandLockup({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: { mark: 22, text: "text-[15px]" },
    md: { mark: 28, text: "text-[16px] md:text-[19px]" },
    lg: { mark: 40, text: "text-[22px] md:text-[28px]" },
  };
  const s = sizes[size];
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LovebirdMark pose="single" width={s.mark} height={s.mark} />
      <span
        className={`display tracking-tight lowercase ${s.text}`}
        style={{ letterSpacing: "-0.015em" }}
      >
        inko{" "}
        <span className="text-[var(--color-gold-600)] italic font-semibold">
          nikah
        </span>
      </span>
    </span>
  );
}
