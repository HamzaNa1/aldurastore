"use client";

import { useRef, useState } from "react";

interface AutoCompleteProps {
	label?: string;
	className?: string;
	optionClassName?: string;
	placeholder?: string;
	options?: string[];
	onInput?: (value: string) => void;
}

export default function AutoComplete({
	label,
	className,
	optionClassName,
	placeholder,
	options,
	onInput,
}: AutoCompleteProps) {
	const [input, setInput] = useState("");
	const [focus, setFocus] = useState(false);
	const [realInput, setRealInput] = useState("");

	const inputRef = useRef<HTMLInputElement>(null);

	const InputSetter = (value: string) => {
		setInput(value);
		setRealInput(value);

		if (onInput) {
			onInput(value);
		}
	};

	return (
		<div style={{ direction: "rtl" }} className={className + " relative h-fit"}>
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
					<span className="text-xs text-zinc-500 pt-1 pr-1 select-none">
						{label}
					</span>
				)}
				<input
					className="appearance-none focus:outline-none w-full h-full px-1"
					placeholder={placeholder}
					value={input}
					ref={inputRef}
					onChange={(e) => {
						if (
							!options ||
							options.findIndex((x) => x == e.currentTarget.value) != -1
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
