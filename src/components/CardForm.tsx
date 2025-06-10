import InputField from "./InputField.tsx";
import PayButton from "./PayButton";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { unformat } from "@react-input/mask";
import "./CardForm.css";
import { toast, ToastContainer } from "react-toastify";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

type CardFormInputs = {
  cardNumber: string;
  expirationDate: string;
  cvc: string;
};

type ValidateFunction = (value: string) => string | boolean;

function CardForm() {
  const [isProcessing, setIsProcessing] = useState(false);
  const expirationRef = useRef<HTMLInputElement>(null);
  const cvcRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

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
    mode: "onTouched",
  });

  const cardNumberMask = {
    mask: "____ ____ ____ ____",
    replacement: { _: /\d/ },
  };
  const expirationDateMask = {
    mask: "__/__",
    replacement: { _: /\d/ },
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
    toast.success(t("payment_successful"));
    setIsProcessing(false);
  };

  const validateExpirationDate: ValidateFunction = (value) => {
    const dateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!dateRegex.test(value)) {
      return t("invalid_date");
    }

    const [monthStr, yearStr] = value.split("/");
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);

    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return t("card_expired");
    }

    return true;
  };

  const validateCardNumber: ValidateFunction = (value) => {
    const cleanedValue = unformat(value, cardNumberMask);
    return cleanedValue.length === 16 || t("card_number_length");
  };

  const validateCVC: ValidateFunction = (value) => {
    const cleanedValue = unformat(value, cvcMask);
    return cleanedValue.length === 3 || t("cvc_length");
  };

  return (
    <form id="card-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div id="card-inputs">
        <Controller
          control={control}
          name="cardNumber"
          rules={{
            required: t("card_number_required"),
            validate: validateCardNumber,
          }}
          render={({ field }) => (
            <InputField
              {...field}
              type="text"
              label={t("card_number")}
              placeholder="1234 1234 1234 1234"
              autoComplete="cc-number"
              error={errors.cardNumber?.message}
              {...cardNumberMask}
              onChange={(e) => {
                field.onChange(e);
                const raw = unformat(e.target.value, cardNumberMask);
                if (raw.length === 16) {
                  expirationRef.current?.focus();
                }
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="expirationDate"
          rules={{
            required: t("expiration_date_required"),
            validate: validateExpirationDate,
          }}
          render={({ field }) => (
            <InputField
              {...field}
              type="text"
              ref={expirationRef}
              label={t("expiration_date")}
              placeholder={t("date_placeholder")}
              autoComplete="cc-exp"
              error={errors.expirationDate?.message}
              {...expirationDateMask}
              onChange={(e) => {
                field.onChange(e);
                const value = e.target.value;
                if (value.length === 5) {
                  cvcRef.current?.focus();
                }
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="cvc"
          rules={{
            required: t("cvc_required"),
            validate: validateCVC,
          }}
          render={({ field }) => (
            <InputField
              {...field}
              type="text"
              ref={cvcRef}
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
