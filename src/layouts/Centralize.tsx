import React from "react";

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
