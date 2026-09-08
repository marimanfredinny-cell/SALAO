"use client";

import { forwardRef } from "react";

type Props = {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  wordClassName?: string;
};

/**
 * Splits `text` into words. Each word is wrapped in an `overflow-hidden` span
 * (`.st-word`) with an inner `.st-inner` span — animate `.st-inner` (yPercent /
 * opacity) for a word-by-word masked reveal. Accessible name is preserved.
 */
export const SplitText = forwardRef<HTMLElement, Props>(function SplitText(
  { text, as = "span", className, wordClassName },
  ref
) {
  const Tag = as as unknown as React.ElementType;
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          className={`st-word inline-block overflow-hidden align-bottom ${wordClassName ?? ""}`}
        >
          <span className="st-inner inline-block will-change-transform">
            {word}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
});
