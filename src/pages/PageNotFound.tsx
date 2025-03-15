import Centralize from "../layouts/Centralize";

// default page not found component
export default function PageNotFound() {
	return (
		<div className='flex justify-center items-center h-screen w-screen'>
			<Centralize>
				<span className='flex justify-center items-center'>
					<span className='w-full'>
						<h1 className='font-semibold text-3xl text-gutenberg-accent my-6'>
							Page not found!
						</h1>
						<h1 className='font-semibold text-5xl text-gutenberg-accent my-6'>
							Gutenberg Project
						</h1>
					</span>
					<span>
						<h1 className='font-semibold text-3xl text-gutenberg-gray-md my-6'>
							404
						</h1>
					</span>
				</span>
			</Centralize>
		</div>
	);
}
