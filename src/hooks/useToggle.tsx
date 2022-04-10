import { useState, useCallback } from "react";

const useToggle = (initialState = false): [boolean, any] => {
  // Initialize the state
  const [state, setState] = useState<boolean>(initialState);
  // Define and memorize toggler function in case we pass down the comopnent,
  // This function change the boolean value to it's opposite value
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const toggle = useCallback((): void => setState((state) => !state), []);
  return [state, toggle];
};

export default useToggle;
