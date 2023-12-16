"use client";

import { countryToLocation, locations } from "@/lib/Utils/locationUtils";
import AutoComplete from "./ui/AutoComplete";
import { useEffect, useRef, useState } from "react";
import { CreateOrder } from "@/actions/GeneralActions";
import { CheckoutFormDict } from "@/lib/languages/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";

interface CheckoutFormProps {
	dict: CheckoutFormDict;
	dir: "rtl" | "ltr";
	sitekey: string;
}

export default function CheckoutForm({
	dict,
	dir,
	sitekey,
}: CheckoutFormProps) {
	const [country, setCountry] = useState<string>("");
	const [formData, setFormData] = useState<FormData | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [state, setState] = useState<string>("default");
	const recaptchaRef = useRef<ReCAPTCHA>(null);

	const router = useRouter();

	const pending = state != "default";

	useEffect(() => {
		if (!token) {
			return;
		}

		setState("submitting");
		Submit(token).finally(() => setState("default"));
	}, [token]);

	async function Submit(token: string) {
		if (!formData) {
			return;
		}

		const firstName = formData.get("firstname") as string;
		const lastName = formData.get("lastname") as string;
		const phonenumber = formData.get("phonenumber") as string;
		const location = formData.get("location") as string;
		const region = formData.get("region") as string;
		const area = formData.get("area") as string;
		const address = formData.get("address") as string;

		const successful = await CreateOrder({
			token: token,
			firstName: firstName,
			lastName: lastName,
			phoneNumber: phonenumber,
			location: location,
			region: region,
			area: area,
			address: address,
		});

		if (successful) {
			router.push("/thank-you");
			return;
		}

		toast.error(dict.fail);
		router.push("/cart");
	}

	return (
		<>
			<form
				action={(formData: FormData) => {
					setFormData(formData);

					recaptchaRef.current?.execute();
				}}
				className="flex flex-col gap-6 w-full"
			>
				<div className="flex flex-col gap-3 w-full">
					<AutoComplete
						id="location"
						label={dict.location}
						className="w-full h-10 rounded-sm text-black bg-white shadow"
						optionClassName="w-full h-full bg-white p-1 hover:brightness-90"
						placeholder={dict.locationLabel}
						options={locations.map((x) => x.name)}
						onInput={(value) => {
							setCountry(locations.find((x) => x.name == value)?.code ?? "");
						}}
					/>
					<div className="w-full flex gap-1">
						<AutoComplete
							id="firstname"
							label={dict.name}
							className="w-full h-10 rounded-sm text-black bg-white shadow"
						/>
						<AutoComplete
							id="lastname"
							label={dict.lastName}
							className="w-full h-10 rounded-sm text-black bg-white shadow"
						/>
					</div>
					<div className="flex flex-row">
						{country != "" && (
							<div className="whitespace-nowrap select-none flex justify-center items-center px-2 bg-white text-zinc-800 border border-zinc-300 shadow">
								<span>{`${countryToLocation[country]?.loc.countryCode} ${countryToLocation[country]?.loc.currency}`}</span>
							</div>
						)}
						<AutoComplete
							id="phonenumber"
							label={`${dict.phoneNumber} (WhatsApp)`}
							className="w-full h-10 rounded-sm text-black bg-white shadow"
							type="phonenumber"
							inputDir="ltr"
							inputAlign={dir == "rtl" ? "text-right" : "text-left"}
							options={country == "" ? [] : undefined}
						/>
					</div>
					<AutoComplete
						id="region"
						label={dict.region}
						className="w-full h-10 rounded-sm text-black bg-white shadow"
						optionClassName="w-full h-full bg-white p-1 hover:brightness-90"
						placeholder={dict.regionLabel}
						options={countryToLocation[country]?.loc.regions ?? []}
					/>
					<div className="w-full flex flex-row-reverse gap-1">
						<AutoComplete
							id="area"
							label={dict.area}
							className="w-full h-10 rounded-sm text-black bg-white shadow"
							placeholder={dict.areaLabel}
						/>
						<AutoComplete
							id="address"
							label={dict.address}
							className="w-full h-10 rounded-sm text-black bg-white shadow"
							placeholder={dict.addressLabel}
						/>
					</div>
				</div>
				<div className="flex flex-col gap-1 text-xs text-zinc-500">
					<span>*{dict.lable1}</span>
					<span>*{dict.label2}</span>
					<span>*{dict.label3}</span>
				</div>
				<button
					disabled={pending}
					type="submit"
					className="w-full bg-primary p-1 rounded-md drop-shadow-lg hover:brightness-90 disabled:brightness-90"
				>
					{dict.buy}
				</button>
			</form>
			<ReCAPTCHA
				ref={recaptchaRef}
				size="invisible"
				sitekey={sitekey}
				onChange={(token: string | null) => {
					setToken(token);
				}}
			/>
		</>
	);
}
