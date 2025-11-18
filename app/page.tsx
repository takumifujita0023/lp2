"use client";

import * as React from "react";

export interface AspectRatioProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** 例: 16 / 9, 4 / 3 など */
  ratio?: number;
}

/**
 * Radix を使わない簡易版 AspectRatio コンポーネント
 * 既存の `import { AspectRatio } from "@/components/ui/aspect-ratio"` に対応するため
 * named export の AspectRatio だけ用意している。
 */
export const AspectRatio: React.FC<AspectRatioProps> = ({
  ratio,
  style,
  children,
  ...props
}) => {
  // ratio が指定されていたら、padding-bottom で疑似的に比率を作る
  const wrapperStyle: React.CSSProperties = ratio
    ? {
        position: "relative",
        width: "100%",
        paddingBottom: `${100 / ratio}%`,
        ...style,
      }
    : { ...style };

  const innerStyle: React.CSSProperties = ratio
    ? { position: "absolute", inset: 0 }
    : {};

  return (
    <div style={wrapperStyle} {...props}>
      <div style={innerStyle}>{children}</div>
    </div>
  );
};
