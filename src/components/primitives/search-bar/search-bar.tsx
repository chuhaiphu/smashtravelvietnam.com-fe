import { getAppConfigAction } from "@/actions/app-config-action";
import { SearchBarContainer } from "./search-bar-container/search-bar-container";

export default async function SearchBar({ searchType = 'tour' }: { searchType?: 'tour' | 'blog' }) {
  const configResponse = await getAppConfigAction();
  const logoUrl = configResponse.data?.logoUrl;

  return <SearchBarContainer logoUrl={logoUrl || undefined} searchType={searchType} />;
}

