import type { InputHTMLAttributes, Ref } from "react";
import { InputMask, type Replacement } from "@react-input/mask";
import { Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import infoIcon from "../assets/infoIcon.svg";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  tooltip?: string;
  error?: string;
  mask: string;
  replacement: Replacement;
  ref?: Ref<HTMLInputElement>;
};

function InputField({
  label,
  name,
  tooltip,
  error,
  ...props
}: InputFieldProps) {
  const { t } = useTranslation();

  return (
    <div className="input-field">
      <label htmlFor={name} className="text-secondary">
        {label}
      </label>
      <div className="input-wrapper">
        <InputMask id={name} {...props} />
        {tooltip && (
          <Tooltip title={tooltip} placement="top" arrow>
            <img
              className="input-tooltip"
              src={infoIcon}
              alt={t("tooltip_alt")}
            />
          </Tooltip>
        )}
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default InputField;
