import { useEffect, useState } from "react";
import getBooks from "../utils/getBooks";
import { Book } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// fetches books from a specific category; nextUrl can be used to fetch the next page
export default function useGetBooksByCategory(category: string) {
	const [isSearching, setIsSearching] = useState<boolean>(false);
	const [books, setBooks] = useState<Book[]>([]);
	const [nextUrl, setNexturl] = useState<string>("");

	async function fetchBooks() {
		setIsSearching(true);

		const url: URL = new URL(`${API_BASE_URL}/books`);
		const queryParams: Record<string, any> = {
			mime_type: "image/",
			topic: category,
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

	useEffect(() => {
		if (isSearching) return;
		fetchBooks();
	}, []);

	return { books, nextUrl, isSearching };
}
