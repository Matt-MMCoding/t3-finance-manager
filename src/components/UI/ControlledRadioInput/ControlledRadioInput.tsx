import type { IControlledRadioInputProps } from "./types";
import { inputStyles } from "./styles";
import { useController } from "react-hook-form";

const ControlledRadioInput = ({
  control,
  name,
  checked,
  onClick,
  label,
  state = "default",
  ...radioProps
}: IControlledRadioInputProps) => {
  const {
    field: { onChange, ...fields },
  } = useController({ name, control });

  return (
    <div
      onClick={onClick}
      className={`${inputStyles.state[state]} flex-1 cursor-pointer rounded-md border py-2 pl-2 transition-colors`}
    >
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        {...radioProps}
        {...fields}
      />
      <label className="ml-2 cursor-pointer" htmlFor="incoming-payment">
        {label}
      </label>
    </div>
  );
};

// const ControlledRadioInput = ({
//   control,
//   name,
//   onClick,
//   activeState = "default",
//   label,
//   checked,
//   ...radioProps
// }: IControlledRadioInputProps<any>) => {
//   const {
//     field: { onChange, ...fields },
//   } = useController({
//     name,
//     control,
//   });

//   return (
//     <div
//       onClick={onClick}
//       className={`${inputStyles.state[activeState]} cursor-pointer rounded-md border py-2 pl-2 transition-colors`}
//     >
//       <input type="radio" className="cursor-pointer" {...radioProps} checked={checked} onCheckedChange={onChange} />
//       {label && (
//         <label className="ml-2 cursor-pointer" htmlFor="incoming-payment">
//           {label}
//         </label>
//       )}
//     </div>
//   );
// };

export default ControlledRadioInput;
