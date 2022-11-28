import SearchForm from "../../Components/SearchPage/SearchForm/SearchForm";
import SearchPageLayout from "../../Components/SearchPage/SearchPageLayout";
import GeneralNetworkDataProvider from "../../Contexts/GeneralNetworkDataProvider";

export default function Search() {
  return (
    <SearchPageLayout>
      <SearchForm />
    </SearchPageLayout>
  );
}
