import { type ComponentProps, forwardRef } from "react";
import { Warning } from "@phosphor-icons/react";
import { tv } from "tailwind-variants";
import clsx from "clsx";

const fieldVariants = tv({
  base: "w-full rounded-lg border bg-white text-sm text-gray-600 outline-none transition-colors placeholder:text-gray-400",
  variants: {
    error: {
      true: "border-danger focus-within:border-danger",
      false: "border-gray-300 focus-within:border-blue-base",
    },
  },
  defaultVariants: {
    error: false,
  },
});

type InputProps = ComponentProps<"input"> & {
  label: string;
  error?: string;
  prefix?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, error, prefix, id, className, ...props }, ref) {
    const inputId = id ?? props.name ?? label;

    return (
      <div className="flex flex-col gap-2">
        <label
          htmlFor={inputId}
          className={clsx(
            "text-xs font-normal uppercase",
            error ? "text-danger" : "text-gray-500",
          )}
        >
          {label}
        </label>
        <div
          className={fieldVariants({
            error: Boolean(error),
            className: clsx(
              "flex items-center gap-0 overflow-hidden p-0",
              className,
            ),
          })}
        >
          {prefix ? (
            <span className="shrink-0 border-r border-gray-300 bg-gray-100 px-3 py-3 text-sm text-gray-400">
              {prefix}
            </span>
          ) : null}
          <input
            ref={ref}
            id={inputId}
            className="min-w-0 flex-1 border-0 bg-transparent px-3 py-3 text-sm text-gray-600 outline-none placeholder:text-gray-400"
            {...props}
          />
        </div>
        {error ? (
          <p className="flex items-center gap-1 text-sm text-danger">
            <Warning size={16} />
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
