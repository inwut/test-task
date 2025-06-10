import infoIcon from "../assets/infoIcon.svg";
import { Tooltip } from "@mui/material";
import type { ChangeEvent, FocusEvent } from "react";
import { InputMask, type Replacement } from "@react-input/mask";

type InputFieldProps = {
  type: string;
  name: string;
  label: string;
  placeholder: string;
  autoComplete?: string;
  withIcon?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  value: string;
  error?: string;
  mask: string;
  replacement: Replacement;
};

function InputField({
  type,
  name,
  label,
  placeholder,
  autoComplete,
  withIcon,
  onChange,
  onBlur,
  value,
  error,
  mask,
  replacement,
}: InputFieldProps) {
  return (
    <div className="input-field">
      <label htmlFor={name} className="text-secondary">
        {label}
      </label>
      <div className="input-wrapper">
        <InputMask
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          mask={mask}
          replacement={replacement}
        />
        {withIcon && (
          <Tooltip
            title="3-digit code on the back of your card"
            placement="top"
            arrow
          >
            <img className="input-tooltip" src={infoIcon} alt="More info" />
          </Tooltip>
        )}
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default InputField;
