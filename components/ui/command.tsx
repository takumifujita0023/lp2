"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

// メインコンテナ
export const Command = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col rounded-md border bg-popover text-popover-foreground shadow-md",
        className
      )}
      {...props}
    />
  )
);
Command.displayName = "Command";

// 入力欄
export const CommandInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <div className="border-b px-3 py-2">
    <input
      ref={ref}
      className={cn(
        "h-8 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground",
        className
      )}
      {...props}
    />
  </div>
));
CommandInput.displayName = "CommandInput";

// リスト全体
export const CommandList = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("max-h-60 overflow-y-auto p-1", className)}
      {...props}
    />
  )
);
CommandList.displayName = "CommandList";

// 「見つかりません」などの表示
export const CommandEmpty = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "py-6 text-center text-sm text-muted-foreground",
        className
      )}
      {...props}
    />
  )
);
CommandEmpty.displayName = "CommandEmpty";

// グループ（見出し付きリスト）
type CommandGroupProps = DivProps & {
  heading?: React.ReactNode;
};

export const CommandGroup = React.forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ className, heading, children, ...props }, ref) => (
    <div ref={ref} className={cn("py-1", className)} {...props}>
      {heading && (
        <div className="px-2 py-1 text-xs font-medium text-muted-foreground">
          {heading}
        </div>
      )}
      <div className="space-y-1">{children}</div>
    </div>
  )
);
CommandGroup.displayName = "CommandGroup";

// 各アイテム
type CommandItemProps = React.HTMLAttributes<HTMLDivElement>;

export const CommandItem = React.forwardRef<HTMLDivElement, CommandItemProps>(
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
CommandItem.displayName = "CommandItem";

// 区切り線
export const CommandSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("my-1 h-px bg-border", className)}
    {...props}
  />
));
CommandSeparator.displayName = "CommandSeparator";

// ショートカット表示用
export const CommandShortcut = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
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
CommandShortcut.displayName = "CommandShortcut";
