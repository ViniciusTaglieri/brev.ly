import { type ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const iconButtonVariants = tv({
  base: "inline-flex items-center justify-center rounded-sm bg-gray-200 text-gray-500 transition-colors hover:bg-blue-base/10 hover:text-blue-base disabled:pointer-events-none disabled:opacity-50",
  variants: {
    size: {
      default: "size-8",
      sm: "size-7",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type IconButtonProps = ComponentProps<"button"> &
  VariantProps<typeof iconButtonVariants>;

export function IconButton({ size, className, ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      className={iconButtonVariants({ size, className })}
      {...props}
    />
  );
}
