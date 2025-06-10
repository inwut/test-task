import InputField from "./InputField.tsx";
import PayButton from "./PayButton";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { unformat } from "@react-input/mask";
import "./CardForm.css";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";

type CardFormInputs = {
  cardNumber: string;
  expirationDate: string;
  cvc: string;
};

type ValidateFunction = (value: string) => string | boolean;

function CardForm() {
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CardFormInputs>({
    defaultValues: {
      cardNumber: "",
      expirationDate: "",
      cvc: "",
    },
    mode: "onBlur",
  });

  const cardNumberMask = {
    mask: "____ ____ ____ ____",
    replacement: { _: /\d/ },
  };
  const expirationDateMask = {
    mask: "m_/__",
    replacement: { m: /[01]/, _: /\d/ },
  };
  const cvcMask = {
    mask: "___",
    replacement: { _: /\d/ },
  };

  const onSubmit: SubmitHandler<CardFormInputs> = async (data) => {
    setIsProcessing(true);
    const cardNumber = unformat(data.cardNumber, cardNumberMask);
    const expirationDate = unformat(data.expirationDate, expirationDateMask);
    const cvc = unformat(data.cvc, cvcMask);
    console.log(cardNumber, expirationDate, cvc);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    toast.success("Payment successful!");
    setIsProcessing(false);
  };

  const validateExpirationDate: ValidateFunction = (value) => {
    const dateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!dateRegex.test(value)) {
      return "Invalid date format (ММ/РР)";
    }

    const [monthStr, yearStr] = value.split("/");
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);

    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth))
      return "The card has expired";

    return true;
  };

  const validateCardNumber: ValidateFunction = (value) => {
    const cleanedValue = unformat(value, cardNumberMask);
    return cleanedValue.length === 16 || "Card number must contain 16 digits";
  };

  const validateCVC: ValidateFunction = (value) => {
    const cleanedValue = unformat(value, cvcMask);
    return cleanedValue.length === 3 || "CVC must contain 3 digits";
  };

  return (
    <form id="card-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div id="card-inputs">
        <Controller
          control={control}
          name="cardNumber"
          rules={{
            required: "Card number is required",
            validate: validateCardNumber,
          }}
          render={({ field }) => (
            <InputField
              {...field}
              type="text"
              label="Card Number"
              placeholder="1234 1234 1234 1234"
              autoComplete="cc-number"
              error={errors.cardNumber?.message}
              {...cardNumberMask}
            />
          )}
        />
        <Controller
          control={control}
          name="expirationDate"
          rules={{
            required: "Expiration date is required",
            validate: validateExpirationDate,
          }}
          render={({ field }) => (
            <InputField
              {...field}
              type="text"
              label="Expiration Date"
              placeholder="MM/YY"
              autoComplete="cc-exp"
              error={errors.expirationDate?.message}
              {...expirationDateMask}
            />
          )}
        />
        <Controller
          control={control}
          name="cvc"
          rules={{
            required: "CVC is required",
            validate: validateCVC,
          }}
          render={({ field }) => (
            <InputField
              {...field}
              type="text"
              label="CVC"
              placeholder="•••"
              withIcon
              error={errors.cvc?.message}
              {...cvcMask}
            />
          )}
        />
      </div>

      <PayButton
        amount={299.99}
        currency="UAH"
        isProcessing={isProcessing}
        disabled={!isValid || isProcessing}
      />
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        newestOnTop={true}
        autoClose={5000}
      />
    </form>
  );
}

export default CardForm;
