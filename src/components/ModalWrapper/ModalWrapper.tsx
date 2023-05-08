import type { FC } from "react";
import type { IModalWrapperProps } from "./types";

const ModalWrapper: FC<IModalWrapperProps> = ({
  visible,
  title,
  onClose,
  onSave,
  onCancel,
  children,
}) => {
  if (!visible) return null;

  return (
    <div
      id="modalContainer"
      onClick={() => onClose()}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex min-w-min flex-col rounded-md bg-stone-900 p-6"
      >
        <p className="mb-6 text-xl">{title}</p>
        {children}
        <div className="mt-6 flex gap-3 self-end">
          <button
            onClick={onSave}
            className="rounded-lg bg-green-500 px-3 py-1 text-gray-800"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="rounded-lg border-2 border-gray-800 bg-transparent px-3 py-1 text-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;
