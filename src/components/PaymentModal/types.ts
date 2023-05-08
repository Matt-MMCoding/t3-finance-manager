import type { IModalWrapperProps } from "../ModalWrapper/types";

export interface IPaymentModalProps extends Omit<IModalWrapperProps, "title"> {}

export type FormValue = IPaymentModalProps & {
  paymentName: string;
  paymentAmount: string;
  paymentDue: string;
  paymentFrequency: string;
  paymentIsIncoming: string;
};
