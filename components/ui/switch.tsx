"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

/**
 * Radix なし版の簡易 Switch コンポーネント。
 * 見た目はそれっぽく、API は shadcn の Switch に近づけている。
 */
export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, checked, onCheckedChange, disabled, ...props }, ref) => {
    const [internalChecked, setInternalChecked] = React.useState(
      checked ?? false
    );

    // controlled / uncontrolled 両対応
    const isChecked = checked ?? internalChecked;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;

      const next = !isChecked;
      setInternalChecked(next);
      onCheckedChange?.(next);
      props.onClick?.(e);
    };

    return (
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-disabled={disabled}
        ref={ref}
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          "inline-flex h-6 w-11 items-center rounded-full border border-transparent",
          "transition-colors focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          isChecked ? "bg-primary" : "bg-input",
          className
        )}
        {...props}
      >
        <span
          className={cn(
            "inline-block h-5 w-5 transform rounded-full bg-background shadow",
            "transition-transform",
            isChecked ? "translate-x-5" : "translate-x-0.5"
          )}
        />
      </button>
    );
  }
);

Switch.displayName = "Switch";
