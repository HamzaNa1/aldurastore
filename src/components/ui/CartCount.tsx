"use client";

import { useEffect, useState } from "react";

interface CartCountProps {
	count: number | undefined;
	className: string;
}

export default function CartCount({ count, className }: CartCountProps) {
	const [isLoaded, setLoaded] = useState(false);

	useEffect(() => {
		setLoaded(true);
	}, []);

	return (
		<>
			{isLoaded && count && count != 0 && (
				<span className={className}>{count}</span>
			)}
		</>
	);
}
