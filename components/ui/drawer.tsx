"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

type DrawerProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
};

type DrawerContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const DrawerContext = React.createContext<DrawerContextType | null>(null);

// ルート
export function Drawer({ open: controlledOpen, onOpenChange, children }: DrawerProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = (next: boolean) => {
    if (!isControlled) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  return (
    <DrawerContext.Provider value={{ open, setOpen }}>
      {children}
    </DrawerContext.Provider>
  );
}

// トリガー（開くボタン）
export function DrawerTrigger(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const ctx = React.useContext(DrawerContext);
  if (!ctx) throw new Error("DrawerTrigger must be used inside <Drawer />");

  return (
    <button
      type="button"
      onClick={() => ctx.setOpen(true)}
      {...props}
    />
  );
}

// コンテンツ本体（右側から出てくるパネル）
export function DrawerContent({
  className,
  children,
  ...props
}: DivProps) {
  const ctx = React.useContext(DrawerContext);
  if (!ctx) throw new Error("DrawerContent must be used inside <Drawer />");

  if (!ctx.open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
      <div
        className={cn(
          "flex h-full w-full max-w-md flex-col bg-background p-6 shadow-xl",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}

// ヘッダー
export function DrawerHeader({ className, ...props }: DivProps) {
  return (
    <div
      className={cn("mb-4 flex items-center gap-2", className)}
      {...props}
    />
  );
}

// フッター（ボタン置き場）
export function DrawerFooter({ className, ...props }: DivProps) {
  return (
    <div
      className={cn("mt-auto flex gap-2", className)}
      {...props}
    />
  );
}

// タイトル
export function DrawerTitle(
  props: React.HTMLAttributes<HTMLHeadingElement> & { className?: string }
) {
  const { className, ...rest } = props;
  return (
    <h2
      className={cn("text-lg font-semibold", className)}
      {...rest}
    />
  );
}

// 説明文
export function DrawerDescription(
  props: React.HTMLAttributes<HTMLParagraphElement> & { className?: string }
) {
  const { className, ...rest } = props;
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...rest}
    />
  );
}

// 閉じるボタン
export function DrawerClose(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }
) {
  const ctx = React.useContext(DrawerContext);
  if (!ctx) throw new Error("DrawerClose must be used inside <Drawer />");

  const { className, children, ...rest } = props;

  return (
    <button
      type="button"
      onClick={() => ctx.setOpen(false)}
      className={cn(
        "ml-auto inline-flex items-center rounded-md p-1 hover:bg-muted",
        className
      )}
      {...rest}
    >
      {children ?? <X className="h-4 w-4" aria-hidden="true" />}
      <span className="sr-only">Close</span>
    </button>
  );
}
