import { useState } from "react";
import loader from "../assets/loader.svg";
import "./PayButton.css";
import { useTranslation } from "react-i18next";

type PayButtonProps = {
  amount: number;
  currency: string;
  isProcessing: boolean;
  disabled: boolean;
};

function PayButton({
  amount,
  currency,
  isProcessing,
  disabled,
}: PayButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const { t } = useTranslation();

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => {
    setIsPressed(false);
  };

  return (
    <button
      type="submit"
      id="pay-button"
      className={`
        ${isPressed ? "pressed" : ""} 
        ${isProcessing ? "processing" : ""}`}
      disabled={disabled}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      <span id="pay-text" className={`${isProcessing ? "hidden" : ""}`}>
        {t("pay")} {amount} {currency}
      </span>
      <span id="processing-text" className={`${isProcessing ? "visible" : ""}`}>
        <img src={loader} id="spinner" alt={t("loader_alt")}></img>
        {t("processing")}
      </span>
    </button>
  );
}

export default PayButton;
