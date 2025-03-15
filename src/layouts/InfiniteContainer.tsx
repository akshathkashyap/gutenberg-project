import React from "react";

export default function InfiniteContainer({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='flex flex-wrap justify-start gap-2 md:gap-10'>
			{children}
		</div>
	);
}
