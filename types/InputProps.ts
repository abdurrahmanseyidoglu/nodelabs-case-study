import { ChangeEvent, HTMLInputAutoCompleteAttribute } from "react";

export default interface InputProps {
  label?: string;
  id: string;
  type: string;
  name: string;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  placeholder: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
