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
  const [
    selectedApy,
    setSelectedApy,
    selectedApyActive,
    toggleSelectedApyActive,
  ] = useFormField<number[] | number>([5, 8], true);
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
  ] = useFormField<number[] | number>([80, 100], false);
  const [
    selectedSkipRate,
    setSelectedSkipRate,
    selectedSkipRateActive,
    toggleSelectedSkipRateActive,
  ] = useFormField<number[] | number>([0, 10], false);
  const [
    selectedActiveStake,
    setSelectedActiveStake,
    selectedActiveStakeActive,
    toggleSelectedActiveStakeActive,
  ] = useFormField<number[] | number>([0, 5000000], false);
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
  ] = useFormField<number[] | undefined>(undefined, false);
  const [
    selectedDatacenters,
    setSelectedDatacenters,
    selectedDatacentersActive,
    toggleSelectedDatacentersActive,
  ] = useFormField<string[] | undefined>(undefined, false);

  const [
    selectedSoftwareVersions,
    setSelectedSoftwareVersions,
    selectedSoftwareVersionsActive,
    toggleSelectedSoftwareVersionsActive,
  ] = useFormField<string[] | undefined>(undefined, false);

  const [
    hasReceivedStakeFromStakePools,
    setHasReceivedStakeFromStakePools,
    hasReceivedStakeFromStakePoolsActive,
    toggleHasReceivedStakeFromStakePoolsActive,
  ] = useFormField<boolean>(false, false);

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
      toggleSelectedApyActive,
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
      setHasReceivedStakeFromStakePools,
      hasReceivedStakeFromStakePoolsActive,
      toggleHasReceivedStakeFromStakePoolsActive,
      selectedAsns,
      setSelectedAsns,
      selectedAsnsActive,
      toggleSelectedAsnsActive,
      selectedDatacenters,
      setSelectedDatacenters,
      selectedDatacentersActive,
      toggleSelectedDatacentersActive,
      selectedSoftwareVersions,
      setSelectedSoftwareVersions,
      selectedSoftwareVersionsActive,
      toggleSelectedSoftwareVersionsActive,
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
    toggleSelectedApyActive,
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
    setHasReceivedStakeFromStakePools,
    hasReceivedStakeFromStakePoolsActive,
    toggleHasReceivedStakeFromStakePoolsActive,
    selectedAsns,
    setSelectedAsns,
    selectedAsnsActive,
    toggleSelectedAsnsActive,
    selectedDatacenters,
    setSelectedDatacenters,
    selectedDatacentersActive,
    toggleSelectedDatacentersActive,
    selectedSoftwareVersions,
    setSelectedSoftwareVersions,
    selectedSoftwareVersionsActive,
    toggleSelectedSoftwareVersionsActive,
  ]);

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchContextProvider;
