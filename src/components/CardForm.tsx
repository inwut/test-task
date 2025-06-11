import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { unformat } from "@react-input/mask";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import InputField from "./InputField.tsx";
import PayButton from "./PayButton";
import "./CardForm.css";

type CardFormInputs = {
  cardNumber: string;
  expirationDate: string;
  cvc: string;
};

type ValidateFunction = (value: string) => string | boolean;

function CardForm() {
  const [isProcessing, setIsProcessing] = useState(false);
  const expirationDateRef = useRef<HTMLInputElement>(null);
  const cvcRef = useRef<HTMLInputElement>(null);
  const { t, i18n } = useTranslation();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    trigger,
    formState: { errors },
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
    mask: "__/__",
    replacement: { _: /\d/ },
  };
  const cvcMask = {
    mask: "___",
    replacement: { _: /\d/ },
  };

  useEffect(() => {
    const validateForm = async () => {
      await trigger();
    };
    validateForm();
  }, [i18n.language, trigger]);

  const onSubmit: SubmitHandler<CardFormInputs> = async (data) => {
    setIsProcessing(true);

    const cardNumber = unformat(data.cardNumber, cardNumberMask);
    const expirationDate = unformat(data.expirationDate, expirationDateMask);
    const cvc = unformat(data.cvc, cvcMask);
    console.log(cardNumber, expirationDate, cvc);

    await new Promise((resolve) => setTimeout(resolve, 3000));
    toast.success(t("payment_successful"));

    reset();
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
    const unformatted = unformat(value, cardNumberMask);
    return unformatted.length === 16 || t("card_number_length");
  };

  const validateCVC: ValidateFunction = (value) => {
    return value.length === 3 || t("cvc_length");
  };

  const handleCardNumberChange = (value: string) => {
    const unformatted = unformat(value, cardNumberMask);
    if (unformatted.length === 16) {
      expirationDateRef.current?.focus();
    }
  };

  const handleExpirationDateChange = (value: string) => {
    if (value.length === 5) {
      cvcRef.current?.focus();
    }
    if (/^[2-9]$/.test(value)) {
      setValue("expirationDate", "0" + value);
    }
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
                handleCardNumberChange(e.target.value);
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
              ref={expirationDateRef}
              label={t("expiration_date")}
              placeholder={t("expiration_date_placeholder")}
              autoComplete="cc-exp"
              error={errors.expirationDate?.message}
              {...expirationDateMask}
              onChange={(e) => {
                field.onChange(e);
                handleExpirationDateChange(e.target.value);
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
              tooltip={t("cvc_tooltip")}
              error={errors.cvc?.message}
              {...cvcMask}
            />
          )}
        />
      </div>
      <PayButton isProcessing={isProcessing} />
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={5000}
      />
    </form>
  );
}

export default CardForm;
