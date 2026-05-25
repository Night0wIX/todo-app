import type { SelectHTMLAttributes } from "react";

export type SelectOption = {
  value: string | number;
  label: string;
};

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
};
