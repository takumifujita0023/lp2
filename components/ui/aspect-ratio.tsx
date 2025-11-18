"use client";

import * as React from "react";

type AspectRatioProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * アスペクト比（横/縦）
   * 例）16 / 9, 4 / 3 など
   */
  ratio?: number;
};

export const AspectRatio: React.FC<AspectRatioProps> = ({
  ratio = 16 / 9,
  style,
  children,
  ...props
}) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        paddingBottom: `${100 / ratio}%`,
        ...style,
      }}
      {...props}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default AspectRatio;
