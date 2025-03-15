import { useEffect, useRef, useState } from "react";
import BookCard from "./BookCard";
import BookCardLoading from "./BookCardLoading";
import ErrorStack from "./ErrorStack";
import ErrorStackProvider from "../context/ErrorStackContext";
import InfiniteContainer from "../layouts/InfiniteContainer";
import getBooks from "../utils/getBooks";
import { Book } from "../types";

interface InfiniteScrollerProps {
	books: Book[];
	nextUrl: string | null;
}

// container for storing books in memory and displaying them infinitely
export default function InfiniteScroller(props: InfiniteScrollerProps) {
	const lastBookRef = useRef<HTMLSpanElement | null>(null);

	const [books, setBooks] = useState<Book[]>([]);
	const [nextUrl, setNextUrl] = useState<string>("");
	const [isFetching, setIsFetching] = useState<boolean>(false);

	async function sendApiRequest() {
		setIsFetching(true);

		try {
			const response = await fetch(nextUrl);
			const responseJSON = await response.json();

			setBooks((prevBooks) => [
				...prevBooks,
				...getBooks(responseJSON.results),
			]);
			setNextUrl(responseJSON.next);
		} catch (error) {
			console.error(error);
		}

		setIsFetching(false);
	}

	useEffect(() => {
		setBooks(props.books);
		if (props.nextUrl !== null) {
			// setNextUrl(props.nextUrl);
			// handling next url because search query returns "next" url for "localhost"
			setNextUrl(
				props.nextUrl.replace("localhost", "skunkworks.ignitesol.com")
			);
		}
	}, [props]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && nextUrl) {
						obs.disconnect();
						sendApiRequest().then(() => {
							if (lastBookRef.current) {
								obs.observe(lastBookRef.current);
							}
						});
					}
				});
			},
			{ threshold: 0.5 }
		);

		if (lastBookRef.current) {
			observer.observe(lastBookRef.current);
		}

		return () => observer.disconnect();
	}, [books]);

	return (
		// error stack provider for book errors
		<ErrorStackProvider>
			<InfiniteContainer>
				{books.map((book, index: number) => {
					if (index === books.length - 1) {
						return (
							<span ref={lastBookRef} key={book.id}>
								<BookCard book={book}></BookCard>
							</span>
						);
					}
					return (
						<span key={book.id}>
							<BookCard book={book}></BookCard>
						</span>
					);
				})}
				{isFetching
					? [...Array(32)].map((_, index: number) => (
							<span key={`book_card_loading_${index}`}>
								<BookCardLoading></BookCardLoading>
							</span>
					  ))
					: null}
			</InfiniteContainer>
			{/* adding error stack for book errors */}
			<ErrorStack></ErrorStack>
		</ErrorStackProvider>
	);
}
