import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import BookCardLoading from "../components/BookCardLoading";
import InfiniteScroller from "../components/InfiniteScroller";
import Searchbar from "../components/Searchbar";
import useGetBooksByCategory from "../hooks/useGetBooksByCategory";
import Centralize from "../layouts/Centralize";
import InfiniteContainer from "../layouts/InfiniteContainer";
import { Book } from "../types";
import BackIcon from "../assets/Back.svg";

export default function Category() {
	const [searchResults, setSearchResults] = useState<Book[]>([]);
	const [nextSearchUrl, setNextSearchUrl] = useState<string>("");
	const [categoryResults, setCategoryResults] = useState<Book[]>([]);
	const [nextCategoryUrl, setNextCategoryUrl] = useState<string>("");

	const navigate = useNavigate();
	const { category } = useParams();

	const { books, nextUrl, isSearching } = useGetBooksByCategory(
		category ?? ""
	);

	useEffect(() => {
		setCategoryResults(books);
	}, [books]);

	useEffect(() => {
		setNextCategoryUrl(nextUrl);
	}, [nextUrl]);

	return (
		<div className='min-h-screen bg-gutenberg-gray-lt'>
			<section className='w-full pt-12 px-4 pb-6 bg-white'>
				<Centralize>
					<span className='flex items-center'>
						<button
							className='cursor-pointer p-4 transition-all duration-200 hover:-translate-x-1.5'
							onClick={() => navigate(-1)}
						>
							<img className='' src={BackIcon} alt='back' />
						</button>
						<h1 className='font-semibold capitalize text-3xl text-gutenberg-accent my-4'>
							{category}
						</h1>
					</span>
					<Searchbar
						setSearchResults={setSearchResults}
						setNextSearchUrl={setNextSearchUrl}
					/>
				</Centralize>
			</section>
			<section className='p-4 md:py-12'>
				<Centralize>
					{isSearching ? (
						<InfiniteContainer>
							{[...Array(32)].map((_, index: number) => (
								<span key={`book_card_loading_${index}`}>
									<BookCardLoading></BookCardLoading>
								</span>
							))}
						</InfiniteContainer>
					) : (
						<InfiniteScroller
							books={
								searchResults.length
									? searchResults
									: categoryResults
							}
							nextUrl={
								searchResults.length
									? nextSearchUrl
									: nextCategoryUrl
							}
						></InfiniteScroller>
					)}
				</Centralize>
			</section>
		</div>
	);
}
