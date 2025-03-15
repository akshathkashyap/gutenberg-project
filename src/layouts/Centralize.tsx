import React from "react";

// used to keep content in a specific max width and keep it horizontally centralized in the viewport
export default function Centralize({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className=' w-full'>
			<div className='mx-auto max-w-5xl'>{children}</div>
		</div>
	);
}
