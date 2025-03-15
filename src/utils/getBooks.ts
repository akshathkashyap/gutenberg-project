import { Book } from "../types";

// converts API response to an array of Book objects
export default function getBooks(results: any[]): Book[] {
	return results.map((result) => {
		const id: string = result.id.toString();
		const title: string = result.title;
		const authors = result.authors.map(
			(author: Record<string, string>) => author.name
		);
		const formats: Record<string, string> = result.formats;
		const imgSrc: string = formats["image/jpeg"];

		return { id, title, authors, imgSrc, formats };
	});
}
