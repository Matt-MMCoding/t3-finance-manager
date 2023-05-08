import type { MouseEventHandler } from "react";
import type { Control } from "react-hook-form";

export interface IControlledRadioInputProps {
  name: string;
  control: Control<any>;
  checked: boolean;
  onClick?: MouseEventHandler;
  label?: string;
  state?: "default" | "active";
}
