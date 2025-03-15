import { useErrorStack } from "../context/ErrorStackContext";
import { Book } from "../types";

interface BookCardProps {
	book: Book;
}

// displays book and handles book errors in ErrorStack
export default function BookCard({ book }: BookCardProps) {
	const { addError } = useErrorStack();

	function handleClick() {
		const bookFormats: string[] = Object.keys(book.formats);

		if (bookFormats.includes("text/html")) {
			window.open(book.formats["text/html"]);
		} else if (bookFormats.includes("application/pdf")) {
			window.open(book.formats["application/pdf"]);
		} else if (bookFormats.includes("text/plain")) {
			window.open(book.formats["text/plain"]);
		} else if (bookFormats.includes("application/zip")) {
			window.location.href = book.formats["application/zip"];
		} else {
			addError(book.id, `No viewable version available: ${book.title}`);
		}
	}

	return (
		<button
			className='cursor-pointer flex flex-col justify-start items-start w-[130px] p-2 rounded-lg transition-all duration-200 hover:-translate-y-4 hover:scale-125 hover:shadow-2xl'
			onClick={handleClick}
		>
			<img
				className='w-[114px] h-[162px] rounded-lg shadow-[0_2px_5px_0_rgba(211,209,238,0.5)]'
				src={book.imgSrc}
				alt='book'
			/>
			<h5 className='font-semibold uppercase text-xs line-clamp-2 my-1'>
				{book.title}
			</h5>
			<h6 className='font-semibold text-xs text-gutenberg-gray-md'>
				{book.authors.join(", ")}
			</h6>
		</button>
	);
}
