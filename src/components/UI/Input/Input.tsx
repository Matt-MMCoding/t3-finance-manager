import { forwardRef } from "react";
import type { IInputProps } from "./types";
import { inputStyles } from "./styles";

const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ state = "default", ...inputProps }, ref) => {
    return (
      <input
        ref={ref}
        {...inputProps}
        className={`${inputStyles.validation[state]} flex-1 rounded-md border bg-transparent py-2 pl-2`}
      />
    );
  }
);

export default Input;
Input.displayName = "Input";
