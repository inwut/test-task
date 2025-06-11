import { useState } from "react";
import { useTranslation } from "react-i18next";
import loader from "../assets/loader.svg";
import "./PayButton.css";

type PayButtonProps = {
  isProcessing: boolean;
};

function PayButton({ isProcessing }: PayButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const { t } = useTranslation();

  const handleMouseDown = () => setIsPressed(true);

  const handleMouseUp = () => setIsPressed(false);

  return (
    <button
      type="submit"
      id="pay-button"
      className={`
        ${isPressed ? "pressed" : ""} 
        ${isProcessing ? "processing" : ""}`}
      disabled={isProcessing}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      <span id="pay-text" className={`${isProcessing ? "hidden" : ""}`}>
        {t("pay")} 299.99 UAH
      </span>
      <span id="processing-text" className={`${isProcessing ? "visible" : ""}`}>
        <img src={loader} id="loader" alt={t("loader_alt")}></img>
        {t("processing")}
      </span>
    </button>
  );
}

export default PayButton;
