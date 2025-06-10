import CardForm from "./CardForm.tsx";
import applePayLogo from "../assets/applePayLogo.svg";
import "./PaymentSection.css";

function PaymentSection() {
  return (
    <section id="payment-section">
      <div id="main-info" className="text-primary">
        <h1>Checkout</h1>
        <div>
          <h2>5 days free</h2>
          <p>then 299.99 UAH per 14 days</p>
        </div>
      </div>
      <button id="apple-pay-button">
        <img src={applePayLogo} alt="Apple Pay logo" />
      </button>
      <div id="pay-with-card-label">
        <hr />
        <h3 className="text-secondary">or pay with card</h3>
        <hr />
      </div>
      <CardForm />
      <p id="payment-info" className="text-secondary">
        You'll have your <span>Plan Pro during 1 year.</span> After this period
        of time, your plan will be <span>automatically renewed</span> with its
        original price without any discounts applied.
      </p>
    </section>
  );
}

export default PaymentSection;
