import BackButton from "@/components/ui/BackButton";
import getCountry from "@/lib/country";
import db from "@/lib/db";
import { localizePrice, localizePrices } from "@/lib/Utils/locationUtils";
import { getServerSession } from "@/lib/Utils/userUtils";
import Link from "next/link";
import { BsCartX } from "react-icons/bs";
import { DeleteCartItem } from "@/actions/GeneralActions";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { FaSquareXmark } from "react-icons/fa6";
import getLanguage, { getDirection } from "@/lib/languages/language";
import { getDictionary } from "@/lib/languages/dictionaries";

export default async function Cart() {
	const user = getServerSession();
	const country = getCountry();

	const language = getLanguage();
	const cartDict = (await getDictionary(language)).cart;

	const cartItems = user
		? await db.query.cartItems.findMany({
				where: (item, { eq }) => eq(item.userId, user.id),
				with: {
					product: {
						with: {
							productPrices: {
								where: (price, { eq }) => eq(price.country, country),
							},
						},
					},
					productSettings: true,
				},
		  })
		: [];

	if (cartItems.length == 0) {
		return (
			<div className="flex flex-col gap-4 place-self-center items-center py-20">
				<span className="text-zinc-800 text-3xl font-semibold place-self-center">
					{cartDict.empty}
				</span>
				<BsCartX className="w-48 h-48 fill-primary" />
				<Link
					href="/products"
					className="w-48 h-12 bg-white text-zinc-800 brightness-100 hover:brightness-95 rounded-lg flex items-center justify-center drop-shadow-lg transition"
				>
					<span className="text-2xl">{cartDict.shopping}</span>
				</Link>
			</div>
		);
	}

	const dir = getDirection();

	return (
		<>
			<div
				dir="ltr"
				className="flex flex-row container h-full bg-secondary justify-center gap-16 py-20 px-2 flex-wrap"
			>
				<div dir={dir} className="flex flex-col flex-[1_1_200px] h-full gap-3">
					<span className="text-primarytext text-3xl font-bold w-full h-10">
						{cartDict.cartDetails}
					</span>
					<table className="table-fixed border-separate border-spacing-y-6">
						<thead className={dir == "rtl" ? "text-right" : "text-left"}>
							<tr className="text-black text-sm bg-zinc-300 rounded-sm outline outline-zinc-300">
								<th>{cartDict.totalCost}</th>
							</tr>
						</thead>
						<tbody>
							<tr className="text-black text-sm outline outline-zinc-300 bg-white rounded-sm">
								<td className="px-1">
									{localizePrices(
										cartItems.map((x) => x.product.productPrices[0].cost),
										country
									)}
								</td>
							</tr>
						</tbody>
					</table>
					{cartItems.find((x) => x.productSettings.quantity <= 0) ? (
						<div className="bg-red-500 text-white h-7 w-full rounded-md text-center">
							{cartDict.cantcontinue}
						</div>
					) : (
						<Link
							className="bg-primary hover:brightness-95 h-7 w-full rounded-md text-center"
							href="/checkout"
							prefetch
						>
							{cartDict.continue}
						</Link>
					)}
					<BackButton>
						<div className=" text-black bg-white hover:brightness-[.98] h-7 w-full rounded-md">
							{cartDict.back}
						</div>
					</BackButton>
				</div>
				<div dir={dir} className="flex flex-col h-full gap-7 flex-[2_2_350px] ">
					<span className="text-primarytext text-3xl font-bold w-full h-10">
						{cartDict.products}
					</span>
					<table className="sticky table-fixed w-full">
						<thead className="sticky text-zinc-50 text-sm outline outline-[0.5px] rounded-tr-sm rounded-tl-sm bg-primary outline-primary h-fit">
							<tr className={dir == "rtl" ? "text-right" : "text-left"}>
								<th className="font-semibold">{cartDict.cartTable.product}</th>
								<th className="font-semibold">{cartDict.cartTable.size}</th>
								<th className="py-1 font-semibold">
									{cartDict.cartTable.price}
								</th>
								<th className="w-[12.5%]"></th>
								<th className="w-[7%]"></th>
							</tr>
						</thead>
						<tbody>
							{cartItems.map((item) => (
								<tr
									key={item.id}
									className={
										"text-zinc-800 text-sm outline outline-[0.5px] last:rounded-b-sm bg-white outline-zinc-400 h-fit"
									}
								>
									<td className="relative px-1 py-2">
										{item.productSettings.quantity <= 0 && (
											<div
												className={
													"select-none absolute text-xs text-white pb-[2px] px-[2px] bg-red-500 top-[1px]" +
													(dir == "rtl"
														? " right-0 rounded-bl-md pl-1"
														: " left-0 rounded-br-md pr-1")
												}
											>
												{cartDict.nostock}
											</div>
										)}
										{item.product.name}
									</td>
									<td className="px-1 py-2">{item.productSettings.size}</td>
									<td className="px-1 font-semibold">
										{localizePrice(
											item.product.productPrices[0].cost,
											item.product.productPrices[0].country
										)}
									</td>
									<td className="relative flex items-center justify-center h-full aspect-square">
										<div className="absolute w-full h-full p-1 flex justify-center items-center">
											<img
												src={item.product.imageURL}
												alt={item.product.name}
												className="h-full object-center object-contain"
											/>
										</div>
									</td>
									<td className="h-full aspect-square">
										<div className="w-full h-full flex justify-center items-center">
											<form
												action={async () => {
													"use server";
													if (!item.id) {
														return;
													}

													await DeleteCartItem(item.id);
												}}
											>
												<SubmitButton
													className="w-4 h-4 disabled:brightness-50"
													fallback={undefined}
												>
													<FaSquareXmark className="w-full h-full fill-primary hover:brightness-90 transition duration-300" />
												</SubmitButton>
											</form>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
