import {
  createContext,
  ReactNode,
  useRef,
  useEffect,
  useContext,
  useMemo,
} from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { GeneralNetworkDataState } from "../@types/types";
import { GENERAL_NETWORK_DATA_STATE_KEY } from "../Constants";
import { NetworkContext } from "./NetworkProvider";
import stakeMySolAxios from "../axios-instances";
import useLocalStorage from "../hooks/useLocalStorage";

interface GeneralNetworkDataProviderProps {
  children: ReactNode | ReactNode[];
}

export const GeneralNetworkDataContext = createContext<GeneralNetworkDataState>(
  {
    count: null,
    names: null,
    asns: null,
    softwareVersions: null,
    dataCenters: null,
    updatedAt: null,
  },
);

function GeneralNetworkDataProvider({
  children,
}: GeneralNetworkDataProviderProps) {
  const { network } = useContext(NetworkContext)!;
  const [generalNetworkData, setGeneralNetworkData] = useLocalStorage(
    GENERAL_NETWORK_DATA_STATE_KEY,
    {
      mainnet: {
        count: null,
        names: null,
        asns: null,
        softwareVersions: null,
        dataCenters: null,
        updatedAt: null,
      },
      testnet: {
        count: null,
        names: null,
        asns: null,
        softwareVersions: null,
        dataCenters: null,
        updatedAt: null,
      },
    },
  );

  // *: Here an update function get attached to
  // *: refetch the data after the specified time
  const intervalRef = useRef<number>();
  console.log(
    "🚀 ~ file: GeneralNetworkDataProvider.tsx ~ line 32 ~ intervalRef",
    intervalRef,
  );

  useEffect(() => {
    const abortController = new AbortController();
    const getGeneralData = async () => {
      const { data } = await stakeMySolAxios.post("/data/general", {
        signal: abortController.signal,
        data: {
          network:
            network === WalletAdapterNetwork.Mainnet ? "mainnet" : "testnet",
        },
      });
      console.log(
        "🚀 ~ file: GeneralNetworkDataProvider.tsx ~ line 45 ~ getGeneralData ~ data",
        data,
      );

      if (network === "testnet") {
        setGeneralNetworkData((prevState) => ({
          testnet: {
            ...data,
            updatedAt: Date.now(),
          },
          mainnet: prevState.mainnet,
        }));
      } else {
        setGeneralNetworkData((prevState) => ({
          mainnet: {
            ...data,
            updatedAt: Date.now(),
          },
          testnet: prevState.testnet,
        }));
      }
    };

    setGeneralNetworkData((prevState) => ({
      testnet: prevState.testnet,
      mainnet: { ...prevState.mainnet },
    }));

    intervalRef.current = window.setInterval(getGeneralData, 300000);

    getGeneralData();

    return () => {
      abortController.abort();
      clearInterval(intervalRef.current);
    };
  }, [network]);

  const contextValue = useMemo(() => {
    if (network === WalletAdapterNetwork.Testnet) {
      return generalNetworkData.testnet;
    }
    return generalNetworkData.mainnet;
  }, [generalNetworkData, network]);

  return (
    <GeneralNetworkDataContext.Provider value={contextValue}>
      {children}
    </GeneralNetworkDataContext.Provider>
  );
}

export default GeneralNetworkDataProvider;
