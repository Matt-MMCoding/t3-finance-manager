import type { FC } from "react";
import { api } from "~/utils/api";
import Modal from "../ModalWrapper/ModalWrapper";
import type { ICreatePaymentModalProps } from "./types";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

type Inputs = {
  paymentName: string;
  paymentAmount: string;
  paymentDue: string;
  paymentFrequency: string;
  paymentIsIncoming: string;
};

// TODO Tidy this up and handle form correctly

const CreatePaymentModal: FC<ICreatePaymentModalProps> = ({
  visible,
  onClose,
}) => {
  const { register, handleSubmit } = useForm<Inputs>();

  const ctx = api.useContext();

  const { mutate } = api.userPayments.createPayment.useMutation({
    // Refetch data on success
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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const formattedAmount = parseFloat(data.paymentAmount);

    console.log(data);

    mutate({
      name: data.paymentName,
      amount: formattedAmount,
      dueDate: data.paymentDue,
      recurringFrequency: data.paymentFrequency,
      isIncoming: data.paymentIsIncoming === "true",
    });
  };

  return (
    <Modal onClose={onClose} visible={visible} title="Create a new payment">
      <form
        className="flex w-80 flex-col gap-6"
        // Find a solution to this error - https://react-hook-form.com/ts/
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <select
            {...register("paymentIsIncoming")}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            <option value="true">Incoming Payment</option>
            <option value="false">Outgoing Payment</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            {...register("paymentName", {
              pattern: /^[A-Za-z0-9]+$/i,
            })}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Label"
          />
        </div>
        <div>
          <input
            type="number"
            step=".01"
            placeholder="Amount"
            {...register("paymentAmount")}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="date"
            {...register("paymentDue")}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Due Date"
          />
        </div>
        <div>
          <select
            {...register("paymentFrequency")}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            <option value="">Recurring Frequency</option>
            <option value="weekly">Weekly</option>
            <option value="bi-weekly">Bi-Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
          >
            Save
          </button>
          <button
            type="reset"
            className="w-full rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreatePaymentModal;
