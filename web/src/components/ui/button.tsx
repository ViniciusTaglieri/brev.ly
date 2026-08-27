import { type ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "inline-flex items-center justify-center gap-2 rounded-lg text-md transition-colors disabled:pointer-events-none",
  variants: {
    variant: {
      primary:
        "bg-blue-base text-white hover:bg-blue-dark disabled:bg-blue-base/50",
      secondary:
        "bg-gray-200 text-gray-500 hover:bg-gray-300 disabled:opacity-50",
    },
    size: {
      default: "h-12 w-full px-4",
      sm: "h-8 px-3 text-sm",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button className={buttonVariants({ variant, size, className })} {...props} />
  );
}
