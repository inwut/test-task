import "./Footer.css";
import solidLogo from "../assets/solidLogo.svg";

function Footer() {
  return (
    <footer>
      <p className="text-secondary">
        Powered by <img src={solidLogo} alt="Solid logo" />
      </p>
    </footer>
  );
}

export default Footer;
