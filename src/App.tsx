import "./App.css";
import LanguageSwitch from "./components/LanguageSwitch";
import PaymentSection from "./components/PaymentSection";
import OrderSection from "./components/OrderSection";
import Footer from "./components/Footer";
import Arrow from "./assets/arrow.svg";
import "./i18n/i18n.js";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();

  return (
    <>
      <LanguageSwitch />
      <button id="back-button">
        <img src={Arrow} alt={t("back_alt")} />
      </button>
      <main>
        <PaymentSection />
        <OrderSection
          orderInfo="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          description="Suspendisse mollis, lorem a interdum aliquam, mi leo molestie nibh, id euismod neque elit nec risus. Nunc finibus, eros nec faucibus blandit, est quam dapibus mi, in iaculis purus quam sit amet felis. Donec lacinia lacus lectus, in semper eros consequat eget. Phasellus ornare eleifend faucibus. Vestibulum elit dolor, pretium quis mauris nec, tempor vestibulum libero. Vivamus elementum quam at mattis consectetur. Aenean consequat id arcu efficitur viverra. Cras at est leo."
          product={{
            name: "Lamel Professional Smart Skin Compact Powder",
            category: "Пудра для лица",
          }}
          price={299.99}
          currency="UAH"
        />
      </main>
      <Footer />
    </>
  );
}

export default App;
