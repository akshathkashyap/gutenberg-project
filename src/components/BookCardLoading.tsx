// loading component to signify book loading
export default function BookCardLoading() {
	return (
		<div className='flex flex-col justify-start items-start w-[130px] p-2 rounded-lg animate-pulse'>
			<div className='w-[114px] h-[162px] rounded-lg shadow-[0_2px_5px_0_rgba(211,209,238,0.5)] bg-gutenberg-gray-md'></div>
			<div className='w-9/12 h-4 my-1 rounded-sm bg-gutenberg-gray-md'></div>
			<div className='w-full h-4 rounded-sm bg-gutenberg-gray-md'></div>
		</div>
	);
}
