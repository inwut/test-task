import infoIcon from "../assets/infoIcon.svg";
import { Tooltip } from "@mui/material";
import type { InputHTMLAttributes, Ref } from "react";
import { InputMask, type Replacement } from "@react-input/mask";
import { useTranslation } from "react-i18next";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  withIcon?: boolean;
  error?: string;
  mask: string;
  replacement: Replacement;
  ref?: Ref<HTMLInputElement>;
};

function InputField({
  label,
  name,
  withIcon,
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
        {withIcon && (
          <Tooltip title={t("cvc_info")} placement="top" arrow>
            <img className="input-tooltip" src={infoIcon} alt={t("cvc_alt")} />
          </Tooltip>
        )}
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default InputField;
