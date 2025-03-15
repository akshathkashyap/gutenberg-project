import { Link } from "react-router-dom";
import NextIcon from "../assets/Next.svg";

interface CategoryLinkProps {
	name: string;
	iconSrc: string;
}

export default function CategoryLink({ name, iconSrc }: CategoryLinkProps) {
	return (
		<Link
			className='relative flex justify-around items-center md:w-sm max-w-sm h-[50px] mx-auto px-2.5 rounded-[4px] shadow-[0_2px_5px_0_rgba(211,209,238,0.5)] transition-all duration-200 hover:-translate-y-1 hover:bg-gutenberg-accent hover:text-gutenberg-primary'
			to={`/categories/${name}`}
			viewTransition
		>
			<span className='flex items-center w-full'>
				<span className='h-full p-2 rounded-[4px] bg-gutenberg-primary'>
					<img className='h-5' src={iconSrc} alt='icon' />
				</span>
				<span className='font-semibold uppercase text-xl px-2'>
					{name}
				</span>
			</span>
			<span className='w-max p-1.5 rounded-full bg-gutenberg-primary'>
				<img src={NextIcon} alt='next' />
			</span>
		</Link>
	);
}
