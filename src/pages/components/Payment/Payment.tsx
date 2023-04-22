import type { FC } from "react";
import type { IPaymentProps } from "./types";
import { useFormattedCurrency } from "~/hooks/useFormattedCurrency.hooks";

const Payment: FC<IPaymentProps> = ({ name, amount, isIncoming }) => {
  const formattedAmount = useFormattedCurrency({ amount });

  return (
    <div
      className={`${
        isIncoming ? "bg-lime-700" : "ml-auto bg-rose-800"
      } mb-4 w-full list-none rounded-sm p-1`}
    >
      <div className="flex flex-col">
        <p className="font-bold">{name}</p>
        <p>{formattedAmount}</p>
      </div>
    </div>
  );
};

export default Payment;
