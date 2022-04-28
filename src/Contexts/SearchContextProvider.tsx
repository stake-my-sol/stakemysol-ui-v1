import { useMemo, createContext, ReactNode, useState } from "react";
import useToggle from "../hooks/useToggle";
import { Validator } from "../@types/types";

interface SearchContextProps {
  children: ReactNode | ReactNode[];
}
export const SearchContext = createContext<any>(null);

function SearchContextProvider({ children }: SearchContextProps) {
  const [foundValidators, setFoundValidators] = useState<Validator[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  // Search form state
  const [advancedSearch, toggleAdvancedSearch] = useToggle(false);
  const [formFilter, setFormFilter] = useState({
    apy: true,
    commission: true,
    votePerformance: false,
    skipRate: false,
    activeStake: false,
    activeStakeSaturation: false,
    receivedStakeFromStakePools: false,
  });
  const [validatorsCount, setValidatorsCount] = useState<number>(5);
  const [selectedNames, setSelectedNames] = useState<string[] | undefined>();
  const [selectedApy, setSelectedApy] = useState<number[] | number>([6, 8]);
  const [selectedCommission, setSelectedCommission] = useState<
    number[] | number
  >([0, 10]);
  const [selectedVotePerformance, setSelectedVotePerformance] = useState<
    number[] | number
  >([80, 100]);
  const [selectedSkipRate, setSelectedSkipRate] = useState<number[] | number>([
    0, 10,
  ]);
  const [selectedActiveStake, setSelectedActiveStake] = useState<
    number[] | number
  >([0, 5000000]);
  // mapping each label to its corresponding value in database
  const [selectedActiveStakeSaturation, setSelectedActiveStakeSaturation] =
    useState({ "0": false, "-1": false, "-2": false });
  const [selectedAsns, setSelectedAsns] = useState<number[] | undefined>();
  const [selectedDatacenters, setSelectedDatacenters] = useState<
    string[] | undefined
  >();
  const [selectedSoftwareVersions, setSelectedSoftwareVersions] = useState<
    string[] | undefined
  >();
  const [hasReceivedStakeFromStakePools, toggleHasReceivedStakeFromStakePools] =
    useToggle(false);

  const contextValue = useMemo(() => {
    return {
      foundValidators,
      activeStep,
      advancedSearch,
      validatorsCount,
      selectedNames,
      selectedApy,
      selectedCommission,
      selectedVotePerformance,
      selectedActiveStake,
      selectedSkipRate,
      selectedActiveStakeSaturation,
      selectedAsns,
      selectedDatacenters,
      selectedSoftwareVersions,
      hasReceivedStakeFromStakePools,
      setFoundValidators,
      setActiveStep,
      toggleAdvancedSearch,
      setValidatorsCount,
      setSelectedNames,
      setSelectedApy,
      setSelectedCommission,
      setSelectedVotePerformance,
      setSelectedActiveStake,
      setSelectedSkipRate,
      setSelectedActiveStakeSaturation,
      setSelectedAsns,
      setSelectedDatacenters,
      setSelectedSoftwareVersions,
      toggleHasReceivedStakeFromStakePools,
    };
  }, [
    foundValidators,
    advancedSearch,
    activeStep,
    validatorsCount,
    selectedNames,
    selectedApy,
    selectedCommission,
    selectedVotePerformance,
    selectedActiveStake,
    selectedSkipRate,
    selectedActiveStakeSaturation,
    selectedAsns,
    selectedDatacenters,
    selectedSoftwareVersions,
    hasReceivedStakeFromStakePools,
    setFoundValidators,
    toggleAdvancedSearch,
    setActiveStep,
    setSelectedActiveStake,
    setValidatorsCount,
    setSelectedNames,
    setSelectedApy,
    setSelectedCommission,
    setSelectedVotePerformance,
    setSelectedSkipRate,
    setSelectedActiveStakeSaturation,
    setSelectedAsns,
    setSelectedDatacenters,
    setSelectedSoftwareVersions,
    toggleHasReceivedStakeFromStakePools,
  ]);

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchContextProvider;
