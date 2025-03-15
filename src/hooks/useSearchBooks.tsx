import { useEffect, useRef, useState } from "react";
import getBooks from "../utils/getBooks";
import { Book } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function useSearchBooks(category: string) {
	const debounceRef = useRef<number | null>(null);

	const [isSearching, setIsSearching] = useState<boolean>(false);
	const [searchString, setSearchString] = useState<string>("");
	const [books, setBooks] = useState<Book[]>([]);
	const [nextUrl, setNexturl] = useState<string>("");

	async function fetchBooks() {
		setIsSearching(true);

		const url: URL = new URL(`${API_BASE_URL}/books`);
		const queryParams: Record<string, any> = {
			mime_type: "image/",
			topic: category,
			search: searchString,
		};
		Object.keys(queryParams).forEach((key) =>
			url.searchParams.append(key, queryParams[key])
		);

		try {
			const response = await fetch(url);
			const responseJSON = await response.json();

			setBooks(getBooks(responseJSON.results));
			setNexturl(responseJSON.next);
		} catch (error) {
			console.error(error);
		}

		setIsSearching(false);
	}

	function handleSearch() {
		if (debounceRef.current !== null) {
			clearTimeout(debounceRef.current);
		}

		debounceRef.current = setTimeout(() => {
			clearTimeout(debounceRef.current!);
			debounceRef.current = null;
			fetchBooks();
		}, 500);
	}

	useEffect(() => {
		if (isSearching) return;
		if (!searchString.length) {
			setBooks([]);
			setNexturl("");
			return;
		}
		handleSearch();
	}, [searchString]);

	return { books, setSearchString, nextUrl, isSearching };
}
