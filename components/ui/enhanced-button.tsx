"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sf-button focus-visible:ring-offset-2 focus-visible:ring-offset-sf-bg disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-sf-button text-sf-bg shadow-md hover:bg-primary-600 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md",
        destructive:
          "bg-error-500 text-white shadow-md hover:bg-error-600 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0",
        outline:
          "border border-sf-button bg-transparent text-sf-button shadow-sm hover:bg-sf-button hover:text-sf-bg hover:shadow-md hover:-translate-y-0.5 active:translate-y-0",
        secondary:
          "bg-neutral-700 text-sf-textSubtle shadow-sm hover:bg-neutral-600 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0",
        ghost: 
          "text-sf-textBold hover:bg-neutral-800 hover:text-sf-textBold hover:shadow-sm",
        link: 
          "text-sf-button underline-offset-4 hover:underline hover:text-primary-400",
        gradient:
          "bg-gradient-to-r from-sf-button to-primary-400 text-sf-bg shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:from-primary-600 hover:to-primary-500 active:translate-y-0",
        glow:
          "bg-sf-button text-sf-bg shadow-glow hover:shadow-glowStrong hover:-translate-y-0.5 active:translate-y-0 animate-glow",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-lg px-8",
        xl: "h-12 rounded-xl px-10 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false, 
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leftIcon && <span className="mr-1">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="ml-1">{rightIcon}</span>}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };