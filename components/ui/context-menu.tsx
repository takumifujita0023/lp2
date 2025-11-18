"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type DivProps = React.HTMLAttributes<HTMLDivElement>;
type LabelProps = React.HTMLAttributes<HTMLDivElement>;
type ItemProps = React.HTMLAttributes<HTMLDivElement>;
type ShortcutProps = React.HTMLAttributes<HTMLSpanElement>;

// ルート
export const ContextMenu = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("relative", className)} {...props} />
  )
);
ContextMenu.displayName = "ContextMenu";

// トリガー（右クリック対象）
// ※ここではただのラッパーにしておく
export const ContextMenuTrigger = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("inline-flex", className)} {...props} />
  )
);
ContextMenuTrigger.displayName = "ContextMenuTrigger";

// 中身（メニュー）
export const ContextMenuContent = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        className
      )}
      {...props}
    />
  )
);
ContextMenuContent.displayName = "ContextMenuContent";

// グループ
export const ContextMenuGroup = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("py-1", className)} {...props} />
  )
);
ContextMenuGroup.displayName = "ContextMenuGroup";

// ラベル
export const ContextMenuLabel = React.forwardRef<HTMLDivElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "px-2 py-1 text-xs font-semibold text-muted-foreground",
        className
      )}
      {...props}
    />
  )
);
ContextMenuLabel.displayName = "ContextMenuLabel";

// セパレーター
export const ContextMenuSeparator = React.forwardRef<
  HTMLDivElement,
  DivProps
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("my-1 h-px bg-border", className)} {...props} />
));
ContextMenuSeparator.displayName = "ContextMenuSeparator";

// アイテム（共通ベース）
const BaseItem = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
);
BaseItem.displayName = "BaseItem";

export const ContextMenuItem = BaseItem;
export const ContextMenuCheckboxItem = BaseItem;
export const ContextMenuRadioItem = BaseItem;

// サブメニュー関係も全部ラッパーにしておく
export const ContextMenuSub = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("relative", className)} {...props} />
  )
);
ContextMenuSub.displayName = "ContextMenuSub";

export const ContextMenuSubTrigger = BaseItem;
export const ContextMenuSubContent = ContextMenuContent;

// ショートカット表示
export const ContextMenuShortcut = React.forwardRef<
  HTMLSpanElement,
  ShortcutProps
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "ml-auto text-xs tracking-widest text-muted-foreground",
      className
    )}
    {...props}
  />
));
ContextMenuShortcut.displayName = "ContextMenuShortcut";
