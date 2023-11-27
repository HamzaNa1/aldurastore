"use client";

import { useRef, useState } from "react";

interface AutoCompleteProps {
	id?: string;
	label?: string;
	className?: string;
	optionClassName?: string;
	placeholder?: string;
	options?: string[];
	inputDir?: "rtl" | "ltr";
	inputAlign?: "text-right" | "text-left";
	labelDir?: "rtl" | "ltr";
	labelAlign?: "text-right" | "text-left";
	type?: "normal" | "phonenumber";
	onInput?: (value: string) => void;
}

export default function AutoComplete({
	id,
	label,
	className,
	optionClassName,
	placeholder,
	options,
	inputDir,
	inputAlign,
	labelDir,
	labelAlign,
	type = "normal",
	onInput,
}: AutoCompleteProps) {
	const [input, setInput] = useState("");
	const [focus, setFocus] = useState(false);
	const [realInput, setRealInput] = useState("");

	const inputRef = useRef<HTMLInputElement>(null);

	const valid = (value: string) => {
		if (type == "phonenumber") {
			const phoneNumberRegex =
				/^\+\d{1,3}[-. ]?\d{1,4}[-. ]?\d{1,4}[-. ]?\d{1,9}$/;

			if (!phoneNumberRegex.test(value)) {
				return false;
			}
		}

		return true;
	};

	const InputSetter = (value: string) => {
		setInput(value);
		setRealInput(value);

		if (onInput) {
			onInput(value);
		}
	};

	return (
		<div className={className + " relative h-fit"}>
			<div
				className="flex flex-col cursor-text"
				onFocus={() => {
					inputRef.current?.focus();
					setFocus(true);
				}}
				onBlur={() => {
					setFocus(false);
					setInput(realInput);
				}}
				tabIndex={0}
			>
				{label && (
					<span
						dir={labelDir}
						className={
							"text-xs text-zinc-500 pt-1 pr-1 select-none " + labelAlign
						}
					>
						{label}
					</span>
				)}
				<input
					className={
						"appearance-none focus:outline-none w-full h-full p-1 " + inputAlign
					}
					dir={inputDir}
					id={id}
					name={id}
					placeholder={placeholder}
					value={input}
					ref={inputRef}
					autoComplete="off"
					required
					onChange={(e) => {
						if (
							valid(e.currentTarget.value) &&
							(!options ||
								options.findIndex((x) => x == e.currentTarget.value) != -1)
						) {
							InputSetter(e.currentTarget.value);
							return;
						}

						setInput(e.currentTarget.value);
					}}
				/>
			</div>
			{focus && options && (
				<div className="absolute w-full h-fit z-50 drop-shadow-lg">
					<div className="relative max-h-[150px] overflow-auto bg-white">
						{options
							.filter((x) => x.startsWith(input))
							.map((x) => (
								<button
									className={optionClassName}
									onMouseDown={() => {
										InputSetter(x);
									}}
								>
									{x}
								</button>
							))}
					</div>
				</div>
			)}
		</div>
	);
}
