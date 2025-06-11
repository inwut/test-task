import { useTranslation } from "react-i18next";
import solidLogo from "../assets/solidLogo.svg";
import "./Footer.css";

function Footer() {
  const { t } = useTranslation();
  return (
    <footer>
      <p className="text-secondary">
        {t("powered_by")} <img src={solidLogo} alt="Solid" />
      </p>
    </footer>
  );
}

export default Footer;
