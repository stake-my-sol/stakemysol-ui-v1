import { useState } from "react";
import useToggle from "./useToggle";

const useFormField = <T,>(initialValue: T, initialActive: boolean) => {
  const [state, setState] = useState(initialValue);
  const [active, toggleActive] = useToggle(initialActive);

  return [state, setState, active, toggleActive];
};

export default useFormField;
