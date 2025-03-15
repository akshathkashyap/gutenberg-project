export interface Book {
	id: string;
	title: string;
	authors: string[];
	imgSrc: string;
	formats: Record<string, string>;
}
