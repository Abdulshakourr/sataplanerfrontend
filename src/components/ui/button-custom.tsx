import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "right",
      fullWidth = false,
      isLoading = false,
      children,
      ...props
    },
    ref,
  ) => {
    const variants = {
      primary:
        "bg-goal-600 text-white hover:bg-goal-700 active:bg-goal-800 disabled:bg-goal-200",
      secondary:
        "bg-goal-100 text-goal-800 hover:bg-goal-200 active:bg-goal-300 disabled:bg-goal-50",
      outline:
        "bg-transparent border border-goal-300 text-goal-800 hover:bg-goal-50 active:bg-goal-100 disabled:border-goal-100 disabled:text-goal-400",
      ghost:
        "bg-transparent text-goal-800 hover:bg-goal-50 active:bg-goal-100 disabled:text-goal-400",
      link: "bg-transparent text-goal-600 hover:text-goal-800 underline underline-offset-4 p-0 h-auto",
    };

    const sizes = {
      sm: "text-sm px-3 py-1.5 h-8",
      md: "text-base px-4 py-2 h-10",
      lg: "text-lg px-6 py-3 h-12",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-goal-300 focus:ring-offset-2 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className,
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
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

        {icon && iconPosition === "left" && !isLoading && (
          <span className="mr-2">{icon}</span>
        )}

        <span>{children}</span>

        {icon && iconPosition === "right" && !isLoading && (
          <span className="ml-2">{icon}</span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
