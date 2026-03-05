import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-[0_10px_25px_-12px_rgba(0,0,0,0.5)] border-2 border-border/80 bg-gradient-to-b from-background/40 to-background/90 hover:-translate-y-[1px] active:translate-y-[1px] active:shadow-[0_4px_10px_-6px_rgba(0,0,0,0.5)]",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-b from-primary/95 via-primary to-primary/80 text-primary-foreground border-primary/90 hover:from-primary hover:via-primary/95 hover:to-primary/90",
        destructive:
          "bg-gradient-to-b from-destructive/95 via-destructive to-destructive/80 text-destructive-foreground border-destructive/80 hover:from-destructive hover:via-destructive/95 hover:to-destructive/85",
        outline:
          "bg-gradient-to-b from-background/80 to-muted/80 text-foreground border-border hover:border-primary hover:text-primary",
        secondary:
          "bg-gradient-to-b from-secondary/95 via-secondary to-secondary/80 text-secondary-foreground border-secondary/80 hover:from-secondary hover:via-secondary/95 hover:to-secondary/85",
        ghost: "border-transparent bg-transparent shadow-none hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
