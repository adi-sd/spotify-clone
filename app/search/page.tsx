import getSongsByTitle from "@/actions/get-songs-by-title";
import Header from "@/components/header";
import SearchContent from "@/components/search-content";
import SearchInput from "@/components/search-input";

export const revalidate = 0;

interface SearchProps {
    searchParams: {
        title: string;
    };
}

const Search = async ({ searchParams }: SearchProps) => {
    const songs = await getSongsByTitle(searchParams.title);

    return (
        <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
            <Header>
                <div className="flex flex-col gap-y-6">
                    <h1 className="mt-4 text-white text-3xl font-bold">Search</h1>
                    <SearchInput></SearchInput>
                </div>
            </Header>
            <SearchContent songs={songs}></SearchContent>
        </div>
    );
};

export default Search;
