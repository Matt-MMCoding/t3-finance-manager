import type { MouseEventHandler, PropsWithChildren } from "react";

export interface IModalWrapperProps extends PropsWithChildren {
  visible: boolean;
  title: string;
  onClose: () => void;
  onSave?: MouseEventHandler;
  onCancel?: MouseEventHandler;
}
