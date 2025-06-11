import { Trans, useTranslation } from "react-i18next";
import CardForm from "./CardForm.tsx";
import applePayLogo from "../assets/applePayLogo.svg";
import "./PaymentSection.css";

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
        <Trans
          i18nKey="payment_info"
          values={{
            plan: t("plan_pro"),
            auto: t("automatically_renewed"),
          }}
          components={{
            bold: <span />,
          }}
        />
      </p>
    </section>
  );
}

export default PaymentSection;
