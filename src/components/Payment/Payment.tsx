import type { FC } from "react";
import type { IPaymentProps } from "./types";
import { useFormattedCurrency } from "~/hooks/useFormattedCurrency.hooks";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin2Line } from "react-icons/ri";
import { MdDone } from "react-icons/md";

type PaymentStatusProps =
  | "Due today"
  | "Overdue"
  | "Coming up"
  | "Nothing to see";

const Payment: FC<IPaymentProps> = ({ name, amount, dueDate }) => {
  const formattedAmount = useFormattedCurrency({ amount });

  // Break this into a util which also returns tailwind variant
  const paymentDue = new Date(dueDate!).toLocaleDateString();
  const dateNow = new Date().toLocaleDateString();

  let paymentStatus: PaymentStatusProps;

  switch (true) {
    case paymentDue === dateNow:
      paymentStatus = "Due today";
      break;
    case paymentDue < dateNow:
      paymentStatus = "Overdue";
      break;
    case paymentDue > dateNow:
      paymentStatus = "Coming up";
      break;
    default:
      paymentStatus = "Nothing to see";
  }

  return (
    <div className="relative flex items-center border-b border-stone-800 py-4">
      <p className="flex-1 text-sm font-bold">{name}</p>
      <p className="flex-1 text-sm">{formattedAmount}</p>
      <p className="flex-1 text-sm">{dueDate || "No date"}</p>
      <p className="flex-1 text-sm">
        <span
          className={`rounded-md bg-stone-700 px-2 py-1 ${
            paymentStatus === "Overdue"
              ? "text-red-600"
              : paymentStatus === "Coming up"
              ? "text-orange-500"
              : "text-green-600"
          }`}
        >
          {paymentStatus}
        </span>
      </p>
      <div className="absolute bottom-0 right-0 top-0 flex gap-2">
        <button className="my-auto transition-colors hover:text-myColor">
          <AiOutlineEdit />
        </button>
        <button className="my-auto transition-colors hover:text-myColor">
          <MdDone className="my-auto" />
        </button>
        <button className="my-auto transition-colors hover:text-myColor">
          <RiDeleteBin2Line className="my-auto" />
        </button>
      </div>
    </div>
  );
};

export default Payment;
