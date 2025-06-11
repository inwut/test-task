import { useTranslation } from "react-i18next";

function LanguageSwitch() {
  const { i18n } = useTranslation();
  return (
    <div id="language-switch">
      <button
        className={`${i18n.language === "en" ? "active-button" : "text-primary"}`}
        onClick={() => i18n.changeLanguage("en")}
      >
        Eng
      </button>
      <button
        className={`${i18n.language === "uk" ? "active-button" : "text-primary"}`}
        onClick={() => i18n.changeLanguage("uk")}
      >
        Укр
      </button>
    </div>
  );
}

export default LanguageSwitch;
