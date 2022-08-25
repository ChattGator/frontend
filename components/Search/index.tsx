import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { FC, Dispatch, SetStateAction } from "react";

interface Props {
	search: string;
	setSearch: Dispatch<SetStateAction<string>>;
	className?: string;
}

const Search: FC<Props> = ({ search, setSearch, className = "" }) => {
	return (
		<div className={`relative ${className}`}>
			<span className="sr-only">Search</span>
			<span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
				<MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
			</span>
			<input
				className="w-full truncate rounded-lg border border-slate-200 py-3 pl-9 pr-3 text-sm placeholder-slate-400 ring-blue-600 transition-all focus:border-transparent focus:outline-none focus:ring-2 lg:text-base"
				id="search"
				type="search"
				placeholder="Search"
				onChange={(e) => setSearch(e.target.value)}
				value={search}
			/>
		</div>
	);
};

export default Search;
