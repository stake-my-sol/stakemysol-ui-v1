import {
  createContext,
  ReactNode,
  useReducer,
  useEffect,
  useMemo,
  useContext,
} from "react";
import { findIndex } from "lodash";
import {
  Validator,
  ISelectedValidatorsContext,
  SelectedValidatorsActions,
  SelectedValidatorsState,
  SelectedValidator,
} from "../@types/types";
import { SELECTED_VALIDATORS_STATE } from "../Constants";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../utils/localStorage";
import { NetworkContext } from "./NetworkProvider";

interface SelectedValidatorsProviderProps {
  children: ReactNode | ReactNode[];
}

export const SelectedValidatorsContext =
  createContext<ISelectedValidatorsContext | null>(null);

function SelectedValidatorsProvider({
  children,
}: SelectedValidatorsProviderProps) {
  const initialSelectedValidatorsState: SelectedValidatorsState = null;
  const { network } = useContext(NetworkContext)!;

  const selectedValidatorsReducer = (
    state: SelectedValidatorsState,
    action: SelectedValidatorsActions,
  ): SelectedValidatorsState | null => {
    switch (action.type) {
      case "addValidator": {
        const { validator } = action.payload;

        const validatorIndex = findIndex(
          state,
          (v: SelectedValidator) =>
            v.validator.account === validator.account &&
            v.validator.network === network,
        );

        // validator already exists in the list
        if (validatorIndex !== -1) return state;

        return [
          ...Array.from(state === null ? [] : state),
          { network, validator },
        ];
      }

      case "removeValidator": {
        const { validator } = action.payload;

        const validatorIndex = findIndex(
          state,
          (v: SelectedValidator) =>
            v.validator.account === validator.account && v.network === network,
        );

        // validator doesn't exists in the list
        if (validatorIndex === -1) return state;

        return [
          ...state!.slice(0, validatorIndex),
          ...state!.slice(validatorIndex + 1),
        ];
      }

      case "reset": {
        return null;
      }

      default:
        return state;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function init(_initialState: SelectedValidatorsState) {
    const storedState = loadFromLocalStorage(SELECTED_VALIDATORS_STATE);

    if (storedState) {
      try {
        if (typeof storedState === "string") {
          return JSON.parse(storedState);
        }

        return storedState;
      } catch (error) {
        return initialSelectedValidatorsState;
      }
    } else {
      return initialSelectedValidatorsState;
    }
  }

  const [selectedValidators, dispatch] = useReducer(
    selectedValidatorsReducer,
    null,
    init,
  );

  useEffect(() => {
    saveToLocalStorage(SELECTED_VALIDATORS_STATE, selectedValidators);
  }, [selectedValidators]);

  const contextValue = useMemo(() => {
    return {
      selectedValidators,
      addValidator: (validator: Validator) =>
        dispatch({
          type: "addValidator",
          payload: { validator },
        }),
      removeValidator: (validator: Validator) =>
        dispatch({
          type: "removeValidator",
          payload: { validator },
        }),
      reset: () => dispatch({ type: "reset" }),
    };
  }, [selectedValidators]);

  return (
    <SelectedValidatorsContext.Provider value={contextValue}>
      {children}
    </SelectedValidatorsContext.Provider>
  );
}

export default SelectedValidatorsProvider;
