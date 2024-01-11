"use client";

import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	fallback?: React.ReactNode;
}

export function SubmitButton({
	fallback,
	children,
	disabled,
	...props
}: SubmitButtonProps) {
	const { pending } = useFormStatus();

	return (
		<button {...props} disabled={disabled || pending}>
			{pending ? fallback ?? children : children}
		</button>
	);
}
