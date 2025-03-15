import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSearchBooks from "../hooks/useSearchBooks";
import { Book } from "../types";
import SearchIcon from "../assets/Search.svg";
import CancelIcon from "../assets/Cancel.svg";

interface SearchbarProps {
	setSearchResults: React.Dispatch<React.SetStateAction<Book[]>>;
	setNextSearchUrl: React.Dispatch<React.SetStateAction<string>>;
}

export default function Searchbar({
	setSearchResults,
	setNextSearchUrl,
}: SearchbarProps) {
	const [inputString, setInputString] = useState<string>("");

	const { category } = useParams();

	const { books, setSearchString, nextUrl, isSearching } = useSearchBooks(
		category ?? ""
	);

	useEffect(() => {
		setSearchString(inputString);
	}, [inputString]);

	useEffect(() => {
		setSearchResults(books);
	}, [books]);

	useEffect(() => {
		setNextSearchUrl(nextUrl);
	}, [nextUrl]);

	return (
		<span className='flex justify-between items-center gap-4 h-10 px-2.5 bg-gutenberg-gray-lt rounded-sm focus-within:outline-2 focus-within:outline-gutenberg-accent'>
			<img className='h-4' src={SearchIcon} alt='search' />
			<label className='hidden' htmlFor='searchbar'></label>
			<input
				className='text-base w-full outline-0'
				type='text'
				name='searchbar'
				id='searchbar'
				placeholder='Search'
				value={inputString}
				onChange={(e) => setInputString(e.target.value)}
			/>
			{isSearching && <span className='animate-pulse'>Searching...</span>}
			<button
				className={`${
					inputString.length ? "visible" : "hidden"
				} cursor-pointer -mr-1.5 p-2`}
				onClick={() => setInputString("")}
			>
				<img className='h-4' src={CancelIcon} alt='cancel' />
			</button>
		</span>
	);
}
