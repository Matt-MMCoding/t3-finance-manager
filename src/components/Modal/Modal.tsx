import type { FC, MouseEvent } from "react";
import type { IModalProps } from "./types";

const Modal: FC<IModalProps> = ({ visible, onClose, children }) => {
  if (!visible) return null;

  const handleOnClose = (e: MouseEvent<HTMLDivElement>): void => {
    if ((e.target as HTMLDivElement).id === "modalContainer") {
      onClose();
    }
  };

  return (
    <div
      id="modalContainer"
      onClick={(e) => handleOnClose(e)}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm"
    >
      <div className="bg-red-400">{children}</div>
    </div>
  );
};

export default Modal;
