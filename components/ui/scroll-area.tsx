"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ScrollAreaProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * シンプルなスクロールコンテナ。
 * もともとの shadcn の ScrollArea と同じ名前で export しているので、
 * 画面側のコードはそのまま使えます。
 */
export function ScrollArea({
  className,
  children,
  ...props
}: ScrollAreaProps) {
  return (
    <div
      className={cn("relative overflow-auto", className)}
      {...props}
    >
      {children}
    </div>
  );
}

type ScrollBarProps = React.HTMLAttributes<HTMLDivElement> & {
  orientation?: "vertical" | "horizontal";
};

/**
 * API 互換用のダミー ScrollBar。
 * 画面側で <ScrollBar /> を使っていてもクラッシュしないようにしているだけで、
 * 実際には何も表示しません。
 */
export function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: ScrollBarProps) {
  return (
    <div
      className={cn("hidden", className)}
      data-orientation={orientation}
      {...props}
    />
  );
}
