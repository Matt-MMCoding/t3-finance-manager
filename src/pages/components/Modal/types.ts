import type { PropsWithChildren } from "react";

export interface IModalProps extends PropsWithChildren {
  visible: boolean;
  onClose: () => void;
}
