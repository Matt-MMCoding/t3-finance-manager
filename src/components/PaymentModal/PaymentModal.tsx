/* eslint-disable @typescript-eslint/no-misused-promises */
import type { FC } from "react";
import { api } from "~/utils/api";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import type { FormValue, IPaymentModalProps } from "./types";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { Input } from "../UI/Input";
import { FORM_CONSTANT } from "~/constants/form.constants";
import { ControlledRadioInput } from "../UI/ControlledRadioInput";
import { Select } from "../UI/Select";

const PaymentModal: FC<IPaymentModalProps> = ({ visible, onClose }) => {
  const selectOptions = [
    { label: "Reccuring Frequency", value: "" },
    { label: "Weekly", value: "weekly" },
    { label: "Bi-Weekly", value: "biweekly" },
    { label: "Monthly", value: "monthly" },
  ];

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    reset,
    formState: { isValid, isDirty, errors },
  } = useForm<FormValue>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      paymentIsIncoming: "incoming",
      paymentName: "",
      paymentAmount: "",
      paymentDue: "",
      paymentFrequency: "",
    },
  });

  const watchIsIncoming = watch("paymentIsIncoming", "incoming");

  const ctx = api.useContext();

  const { mutate } = api.userPayments.createPayment.useMutation({
    onSuccess: () => {
      onClose();
      void ctx.userPayments.getPaymentsByUserId.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;

      if (errorMessage && errorMessage[0]) {
        alert(errorMessage[0]);
        console.error(errorMessage);
      }
    },
  });

  const onSubmit: SubmitHandler<FormValue> = (data) => {
    const formattedAmount = parseFloat(data.paymentAmount);

    mutate({
      name: data.paymentName,
      amount: formattedAmount,
      dueDate: data.paymentDue,
      recurringFrequency: data.paymentFrequency,
      isIncoming: !!data.paymentIsIncoming,
    });
  };

  const handleFormCancel = () => {
    reset();
    onClose();
  };

  return (
    <ModalWrapper
      onClose={onClose}
      visible={visible}
      onSave={handleSubmit(onSubmit)}
      onCancel={handleFormCancel}
      title="Create a new payment"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <fieldset name="paymentType" className="flex flex-1 flex-wrap gap-3">
          <ControlledRadioInput
            control={control}
            name="paymentIsIncoming"
            label="Incoming"
            checked={!!watchIsIncoming}
            state={!!watchIsIncoming ? "active" : "default"}
            onClick={() => setValue("paymentIsIncoming", "incoming")}
          />
          <ControlledRadioInput
            control={control}
            name="paymentIsIncoming"
            label="Outgoing"
            checked={!watchIsIncoming}
            state={!watchIsIncoming ? "active" : "default"}
            onClick={() => setValue("paymentIsIncoming", "")}
          />
        </fieldset>
        <fieldset name="paymentInfo" className="flex flex-1 gap-3">
          <Input
            placeholder="Label"
            state={isDirty && !isValid ? "error" : "default"}
            {...register("paymentName", {
              required: true,
              pattern: FORM_CONSTANT.PAYMENT_FORM_PATTERN,
            })}
          />
          <Input
            type="number"
            step=".01"
            placeholder="Amount"
            {...register("paymentAmount")}
          />
        </fieldset>
        <fieldset name="paymentDat" className="flex flex-1 gap-3">
          <Input
            type="date"
            placeholder="Due Date"
            {...register("paymentDue")}
          />
          <Select options={selectOptions} {...register("paymentFrequency")} />
        </fieldset>
      </form>
    </ModalWrapper>
  );
};

export default PaymentModal;
