import { useMemo, createContext, ReactNode, useState } from "react";
import useToggle from "../hooks/useToggle";
import { Validator } from "../@types/types";
import useFormField from "../hooks/useFormField";

interface SearchContextProps {
  children: ReactNode | ReactNode[];
}
export const SearchContext = createContext<any>(null);

function SearchContextProvider({ children }: SearchContextProps) {
  const [foundValidators, setFoundValidators] = useState<Validator[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  // Search form state
  const [advancedSearch, toggleAdvancedSearch] = useToggle(false);
  const [
    validatorsCount,
    setValidatorsCount,
    validatorsCountActive,
    toggleValidatorsCountActive,
  ] = useFormField<number>(5, true);
  const [
    selectedNames,
    setSelectedNames,
    selectedNamesActive,
    toggleSelectedNamesActive,
  ] = useFormField<string[] | undefined>(undefined, true);
  const [selectedApy, setSelectedApy, selectedApyActive, toggleSelectedApy] =
    useFormField<number[] | number>([6, 8], true);
  const [
    selectedCommission,
    setSelectedCommission,
    selectedCommissionActive,
    toggleSelectedCommissionActive,
  ] = useFormField<number[] | number>([0, 10], true);
  const [
    selectedVotePerformance,
    setSelectedVotePerformance,
    selectedVotePerformanceActive,
    toggleSelectedVotePerformanceActive,
  ] = useFormField<number[] | number>([80, 100], true);
  const [
    selectedSkipRate,
    setSelectedSkipRate,
    selectedSkipRateActive,
    toggleSelectedSkipRateActive,
  ] = useFormField<number[] | number>([0, 10], true);
  const [
    selectedActiveStake,
    setSelectedActiveStake,
    selectedActiveStakeActive,
    toggleSelectedActiveStakeActive,
  ] = useFormField<number[] | number>([0, 5000000], true);
  // mapping each label to its corresponding value in database
  const [
    selectedActiveStakeSaturation,
    setSelectedActiveStakeSaturation,
    selectedActiveStakeSaturationActive,
    toggleSelectedActiveStakeSaturationActive,
  ] = useFormField<any>({ "0": false, "-1": false, "-2": false }, false);
  const [
    selectedAsns,
    setSelectedAsns,
    selectedAsnsActive,
    toggleSelectedAsnsActive,
  ] = useFormField<number[] | undefined>(undefined, true);
  const [
    selectedDatacenters,
    setSelectedDatacenters,
    selectedDatacentersActive,
    setSelectedDatacentersActive,
  ] = useFormField<string[] | undefined>(undefined, true);

  const [
    selectedSoftwareVersions,
    setSelectedSoftwareVersions,
    selectedSoftwareVersionsActive,
    setSelectedSoftwareVersionsActive,
  ] = useFormField<string[] | undefined>(undefined, false);

  const [hasReceivedStakeFromStakePools, toggleHasReceivedStakeFromStakePools] =
    useToggle(false);

  const contextValue = useMemo(() => {
    return {
      foundValidators,
      setFoundValidators,
      activeStep,
      setActiveStep,
      advancedSearch,
      toggleAdvancedSearch,
      validatorsCount,
      setValidatorsCount,
      validatorsCountActive,
      toggleValidatorsCountActive,
      selectedNames,
      setSelectedNames,
      selectedNamesActive,
      toggleSelectedNamesActive,
      selectedApy,
      setSelectedApy,
      selectedApyActive,
      toggleSelectedApy,
      selectedCommission,
      setSelectedCommission,
      selectedCommissionActive,
      toggleSelectedCommissionActive,
      selectedVotePerformance,
      setSelectedVotePerformance,
      selectedVotePerformanceActive,
      toggleSelectedVotePerformanceActive,
      selectedSkipRate,
      setSelectedSkipRate,
      selectedSkipRateActive,
      toggleSelectedSkipRateActive,
      selectedActiveStake,
      setSelectedActiveStake,
      selectedActiveStakeActive,
      toggleSelectedActiveStakeActive,
      selectedActiveStakeSaturation,
      setSelectedActiveStakeSaturation,
      selectedActiveStakeSaturationActive,
      toggleSelectedActiveStakeSaturationActive,
      hasReceivedStakeFromStakePools,
      toggleHasReceivedStakeFromStakePools,
      selectedAsns,
      setSelectedAsns,
      selectedAsnsActive,
      toggleSelectedAsnsActive,
      selectedDatacenters,
      setSelectedDatacenters,
      selectedDatacentersActive,
      setSelectedDatacentersActive,
      selectedSoftwareVersions,
      setSelectedSoftwareVersions,
      selectedSoftwareVersionsActive,
      setSelectedSoftwareVersionsActive,
    };
  }, [
    foundValidators,
    setFoundValidators,
    activeStep,
    setActiveStep,
    advancedSearch,
    toggleAdvancedSearch,
    validatorsCount,
    setValidatorsCount,
    validatorsCountActive,
    toggleValidatorsCountActive,
    selectedNames,
    setSelectedNames,
    selectedNamesActive,
    toggleSelectedNamesActive,
    selectedApy,
    setSelectedApy,
    selectedApyActive,
    toggleSelectedApy,
    selectedCommission,
    setSelectedCommission,
    selectedCommissionActive,
    toggleSelectedCommissionActive,
    selectedVotePerformance,
    setSelectedVotePerformance,
    selectedVotePerformanceActive,
    toggleSelectedVotePerformanceActive,
    selectedSkipRate,
    setSelectedSkipRate,
    selectedSkipRateActive,
    toggleSelectedSkipRateActive,
    selectedActiveStake,
    setSelectedActiveStake,
    selectedActiveStakeActive,
    toggleSelectedActiveStakeActive,
    selectedActiveStakeSaturation,
    setSelectedActiveStakeSaturation,
    selectedActiveStakeSaturationActive,
    toggleSelectedActiveStakeSaturationActive,
    hasReceivedStakeFromStakePools,
    toggleHasReceivedStakeFromStakePools,
    selectedAsns,
    setSelectedAsns,
    selectedAsnsActive,
    toggleSelectedAsnsActive,
    selectedDatacenters,
    setSelectedDatacenters,
    selectedDatacentersActive,
    setSelectedDatacentersActive,
    selectedSoftwareVersions,
    setSelectedSoftwareVersions,
    selectedSoftwareVersionsActive,
    setSelectedSoftwareVersionsActive,
  ]);

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchContextProvider;
