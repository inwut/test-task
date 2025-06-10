import "./OrderSection.css";
import { useTranslation } from "react-i18next";

type OrderSectionProps = {
  orderInfo: string;
  description: string;
  product: { name: string; category: string };
  price: number;
  currency: string;
};

function OrderSection({
  orderInfo,
  description,
  product,
  price,
  currency,
}: OrderSectionProps) {
  const { t } = useTranslation();

  const truncatedOrderInfo =
    orderInfo.length > 100 ? orderInfo.substring(0, 100) + "..." : orderInfo;

  const truncatedDescription =
    description.length > 400
      ? description.substring(0, 400) + "..."
      : description;

  return (
    <section id="order-section">
      <h2 id="order-info" className="text-primary">
        {truncatedOrderInfo}
      </h2>
      <div id="order-details">
        <p id="order-description" className="text-primary">
          {truncatedDescription}
        </p>
        <hr />
        <p id="product-name" className="text-primary">
          {product.name}
        </p>
        <p id="product-category">{product.category}</p>
        <hr />
        <p id="product-price" className="text-primary">
          {t("total")} {price} {currency}
        </p>
      </div>
    </section>
  );
}

export default OrderSection;
