import { useErrorStack } from "../context/ErrorStackContext";
import CancelIcon from "../assets/Cancel.svg";

export default function ErrorStack() {
	const { errorStack, removeError } = useErrorStack();

	if (!errorStack.length) return <></>;

	return (
		<aside className='flex flex-col justify-end items-center fixed top-0 right-0 h-screen w-sm'>
			{errorStack.map((error) => (
				<span
					key={`error_stack_${error.id}`}
					className={`flex justify-between items-start w-full my-2 p-4 bg-red-500 rounded-sm`}
				>
					<span className='text-sm w-full text-white'>
						{error.message}
					</span>
					<button
						className='cursor-pointer p-1'
						onClick={() => removeError(error.id)}
					>
						<img
							className='h-3 w-3 brightness-200'
							src={CancelIcon}
							alt='cancel'
						/>
					</button>
				</span>
			))}
		</aside>
	);
}
