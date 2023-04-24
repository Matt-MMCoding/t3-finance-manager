import type { FC, MouseEvent } from "react";
import type { IModalWrapperProps } from "./types";

const ModalWrapper: FC<IModalWrapperProps> = ({
  visible,
  onClose,
  title,
  children,
}) => {
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
      <div className="rounded-md bg-stone-900 p-6">
        <p className="mb-6 text-xl">{title}</p>
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
