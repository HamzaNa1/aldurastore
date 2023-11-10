"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({
	className,
	fallback,
	children,
}: {
	className: string;
	fallback: React.ReactNode;
	children: React.ReactNode;
}) {
	const { pending } = useFormStatus();

	return (
		<button type="submit" className={className} aria-disabled={pending}>
			{pending ? fallback ?? children : children}
		</button>
	);
}
