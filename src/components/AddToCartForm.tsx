"use client";

import { ProductSettings } from "@/lib/schema";
import { SubmitButton } from "./ui/SubmitButton";
import { AddCartItem } from "@/actions/GeneralActions";
import { useState } from "react";
import { AddToCartFormDict } from "@/lib/languages/types";

interface AddToCartProps {
	settings: ProductSettings[];
	dict: AddToCartFormDict;
}

export default function AddToCartForm({ settings, dict }: AddToCartProps) {
	const [settingsIdx, setSettingsIdx] = useState(-1);
	const [showError, setShowError] = useState(false);

	return (
		<div className="flex flex-col gap-16">
			<div className="flex flex-col gap-5 text-zinc-800">
				{/* <div className="flex flex-col gap-2">
    <span className="font-bold text-xl">:اللون</span>
    <div className="flex flex-row gap-2 justify-end">
      {colors.map((color, i) => (
        <button
          key={i}
          className="w-8 h-8 rounded-md outline-black outline-[1px] outline hover:brightness-90 transition duration-300"
          style={{ backgroundColor: `#${color}` }}
        ></button>
      ))}
    </div>
  </div> */}
				<div className="flex flex-col gap-2">
					<span className="font-bold text-lg sm:text-xl">{dict.size}:</span>
					<div className="w-fit">
						<div dir="ltr" className="flex flex-row flex-wrap gap-2">
							{settings.map((size, i) => (
								<button
									key={size.id}
									className={
										"w-16 rounded-md bg-[#D9D9D9] py-1 hover:brightness-90 transition duration-300 border " +
										(settingsIdx == i ? "border-primary" : "border-transparent")
									}
									onClick={() => {
										setSettingsIdx(i);

										if (size.quantity <= 0) {
											setShowError(true);
										}
									}}
								>
									{size.size}
								</button>
							))}
						</div>
					</div>
				</div>

				<label className="text-red-500" hidden={!showError}>
					{dict.nostock}
				</label>
			</div>

			<div className="flex flex-row gap-10">
				<form
					action={async () => {
						if (settingsIdx == -1) {
							return;
						}

						const currSettings = settings[settingsIdx];

						await AddCartItem(currSettings.productId, currSettings.id, 1);
					}}
				>
					<SubmitButton
						className={
							"py-2 px-12 bg-primary rounded-md drop-shadow-lg brightness-100 hover:brightness-90 transition duration-300 disabled:brightness-90" +
							(showError ? " cursor-not-allowed" : "")
						}
						fallback={null}
					>
						<span>{dict.cart}</span>
					</SubmitButton>
				</form>
			</div>
		</div>
	);
}
