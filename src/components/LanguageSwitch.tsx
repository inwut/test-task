import { useTranslation } from "react-i18next";

function LanguageSwitch() {
  const { i18n } = useTranslation();
  return (
    <div id="language-switch">
      <button
        className={`${i18n.language === "en" ? "text-primary" : "language-button"}`}
        onClick={() => i18n.changeLanguage("en")}
      >
        Eng
      </button>
      <button
        className={`text-primary ${i18n.language === "uk" ? "text-primary" : "language-button"}`}
        onClick={() => i18n.changeLanguage("uk")}
      >
        Укр
      </button>
    </div>
  );
}

export default LanguageSwitch;
