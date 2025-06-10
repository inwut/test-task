import CardForm from "./CardForm.tsx";
import applePayLogo from "../assets/applePayLogo.svg";
import "./PaymentSection.css";
import { useTranslation } from "react-i18next";

function PaymentSection() {
  const { t } = useTranslation();
  return (
    <section id="payment-section">
      <div id="main-info" className="text-primary">
        <h1>{t("checkout")}</h1>
        <div>
          <h2>{t("days_free")}</h2>
          <p>{t("cost_per_14_days")}</p>
        </div>
      </div>
      <button id="apple-pay-button">
        <img src={applePayLogo} alt="Apple Pay" />
      </button>
      <div id="pay-with-card-label">
        <hr />
        <h3 className="text-secondary">{t("pay_with_card")}</h3>
        <hr />
      </div>
      <CardForm />
      <p id="payment-info" className="text-secondary">
        {t("payment_info_first")} <span>{t("plan_pro")}</span>{" "}
        {t("payment_info_second")} <span>{t("automatically_renewed")}</span>{" "}
        {t("payment_info_third")}
      </p>
    </section>
  );
}

export default PaymentSection;
