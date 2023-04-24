import type { PropsWithChildren } from "react";

export interface IModalWrapperProps extends PropsWithChildren {
  visible: boolean;
  title: string;
  onClose: () => void;
}
