import { useId } from "react";
import type { SVGProps } from "react";

type Variant = "mono" | "gold" | "outline";

/**
 * "single" — 엮인 두 링 + 링 위에 앉은 새 한 마리 (기본 마크, 70×70)
 * "pair"   — 엮인 두 링 + 나란히 앉은 새 두 마리 (히어로용 가로형, 104×70)
 * "rings"  — 링만 (파비콘·초소형용, 70×70)
 */
type Pose = "single" | "pair" | "rings";

type Props = SVGProps<SVGSVGElement> & {
  variant?: Variant;
  pose?: Pose;
};

/* ── 형태 정의 ────────────────────────────────────────────────
   앉은 새: 둥근 몸통을 쓰지 않고, 길쭉한 실루엣 + 아래로 흐르는 긴 꼬리로만
   새를 읽힌다. 눈·볼터치가 없어 카툰으로 읽히지 않는다.
   로컬 좌표 0 0 40 44, 오른쪽을 향함.                              */
const BIRD_BODY =
  "M24 4 C16 4,11 9,11 16 C11 20,13 23.5,16.5 25.5 L2 40 L22 27.5 " +
  "C28.5 26,32 21,32 15.5 C32 9.5,29 5.5,25.5 4.2 Z";
const BIRD_BEAK = "M31 9 L39 12 L31 14.5 Z";

const RING_R = 15;
const STROKE = 3.4;
/** 마스크 절단 폭 — 링 굵기보다 넉넉해야 위·아래 교차가 눈에 읽힌다 */
const CUT = STROKE + 3.4;

/* 두 링이 실제로 엮이도록, 교차점에서 상대 링을 잘라내는 호.
   좌표는 A(26,38) / B(43,38) r15 기준으로 계산된 값. */
const WEAVE_TOP = "M31.77 28.07 A15 15 0 0 1 37.75 23.95"; // B를 잘라 A가 위로
const WEAVE_BOTTOM = "M37.23 47.93 A15 15 0 0 1 31.25 52.05"; // A를 잘라 B가 위로

export function LovebirdMark({
  variant = "gold",
  pose = "single",
  ...rest
}: Props) {
  const uid = useId().replace(/:/g, "");
  const gradId = `lb-gold-${uid}`;
  const maskAId = `lb-mask-a-${uid}`;
  const maskBId = `lb-mask-b-${uid}`;

  const paint = variant === "gold" ? `url(#${gradId})` : "currentColor";

  const isPair = pose === "pair";
  // pair는 링을 오른쪽 17, 아래 4 옮겨 가로형 구도를 만든다.
  const dx = isPair ? 17 : 0;
  const dy = isPair ? 4 : 0;
  const vw = isPair ? 104 : 70;
  const vh = 70;

  const bird = (
    <>
      <path d={BIRD_BODY} fill={paint} />
      <path d={BIRD_BEAK} fill={paint} />
    </>
  );

  // 마스크 영역은 반드시 명시한다. 생략하면 백분율이 뷰포트 기준으로
  // 풀려서, 크기가 0인 컨텍스트에서는 마크 전체가 사라진다.
  const maskBox = { x: 0, y: 0, width: vw, height: vh };

  return (
    <svg
      viewBox={`0 0 ${vw} ${vh}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="inko nikah"
      {...rest}
    >
      <defs>
        {variant === "gold" && (
          <linearGradient id={gradId} x1="0" y1="0" x2="0.35" y2="1">
            <stop offset="0%" stopColor="#f0c04a" />
            <stop offset="55%" stopColor="#c8932a" />
            <stop offset="100%" stopColor="#96691a" />
          </linearGradient>
        )}

        {/* 아래 교차점에서 왼쪽 링을 끊는다 → 오른쪽 링이 위로 지나감 */}
        <mask id={maskAId} maskUnits="userSpaceOnUse" {...maskBox}>
          <rect {...maskBox} fill="white" />
          <path
            d={WEAVE_BOTTOM}
            transform={`translate(${dx} ${dy})`}
            fill="none"
            stroke="black"
            strokeWidth={CUT}
          />
        </mask>

        {/* 위 교차점에서 오른쪽 링을 끊는다 → 왼쪽 링이 위로 지나감 */}
        <mask id={maskBId} maskUnits="userSpaceOnUse" {...maskBox}>
          <rect {...maskBox} fill="white" />
          <path
            d={WEAVE_TOP}
            transform={`translate(${dx} ${dy})`}
            fill="none"
            stroke="black"
            strokeWidth={CUT}
          />
        </mask>
      </defs>

      {/* 엮인 두 링 */}
      <circle
        cx={26 + dx}
        cy={38 + dy}
        r={RING_R}
        fill="none"
        stroke={paint}
        strokeWidth={STROKE}
        mask={`url(#${maskAId})`}
      />
      <circle
        cx={43 + dx}
        cy={38 + dy}
        r={RING_R}
        fill="none"
        stroke={paint}
        strokeWidth={STROKE}
        mask={`url(#${maskBId})`}
      />

      {/* 링 위에 앉은 새 */}
      {pose === "single" && (
        <g transform="translate(11 0) scale(0.6)">{bird}</g>
      )}

      {isPair && (
        <>
          <g transform="translate(20 6) scale(0.58)">{bird}</g>
          <g transform="translate(56 2) scale(0.58)">{bird}</g>
        </>
      )}
    </svg>
  );
}

/**
 * 브랜드 락업: 마크 + "inko nikah"
 */
export function BrandLockup({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: { mark: 24, text: "text-[15px]" },
    md: { mark: 30, text: "text-[16px] md:text-[19px]" },
    lg: { mark: 42, text: "text-[22px] md:text-[28px]" },
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
