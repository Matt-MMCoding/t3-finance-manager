import { forwardRef } from "react";
import type { ISelectProps } from "./types";

const Select = forwardRef<HTMLSelectElement, ISelectProps>(
  ({ options, ...selectProps }, ref) => {
    return (
      <select
        ref={ref}
        {...selectProps}
        className="flex-1 rounded-md border border-slate-600 bg-transparent py-2 pl-2"
      >
        {options.map(({ label, value }, idx) => (
          <option key={idx} value={value}>
            {label}
          </option>
        ))}
      </select>
    );
  }
);

export default Select;
Select.displayName = "Select";
