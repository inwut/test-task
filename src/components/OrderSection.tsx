import { useTranslation } from "react-i18next";
import "./OrderSection.css";

type OrderSectionProps = {
  orderInfo: string;
  description: string;
  product: { name: string; category: string };
};

function OrderSection({ orderInfo, description, product }: OrderSectionProps) {
  const { t } = useTranslation();

  const truncate = (value: string, maxLength: number) => {
    return value.length > maxLength
      ? `${value.substring(0, maxLength)}...`
      : value;
  };

  return (
    <section id="order-section">
      <h2 id="order-info" className="text-primary">
        {truncate(orderInfo, 100)}
      </h2>
      <div id="order-details">
        <p id="order-description" className="text-primary">
          {truncate(description, 400)}
        </p>
        <hr />
        <p className="product-name text-primary">{product.name}</p>
        <p className="product-category">{product.category}</p>
        <hr />
        <p id="order-price" className="text-primary">
          {t("total")} 299.99 UAH
        </p>
      </div>
    </section>
  );
}

export default OrderSection;
