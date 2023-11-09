import { Product } from "@/lib/schema";

export default function Cart() {
	const testProduct: Product = {
		id: "100",
		name: "Shirt",
		description: "Big Shirt",
		imageURL: "/test.png",
		showOnMain: false,
		activated: true,
	};

	const products = [testProduct, testProduct, testProduct];

	return (
		<>
			<div className="flex flex-row w-full h-full bg-secondary px-64 justify-center gap-16 p-20">
				<div className="flex flex-col h-full flex-grow gap-3">
					<span className="text-black text-3xl font-bold text-right w-full h-10">
						تفاصيل الفاتورة
					</span>
					<table className="table-fixed border-separate border-spacing-y-6">
						<thead className="text-black text-sm text-right outline outline-zinc-400 bg-zinc-400 rounded-sm">
							<th>القيمة</th>
							<th>الوصف</th>
						</thead>
						<tbody>
							<tr className="text-black text-sm text-right outline outline-zinc-400 bg-white rounded-sm">
								<td className="pr-1">0</td>
								<td className="pr-1">10</td>
							</tr>
						</tbody>
					</table>
					<button className="bg-black h-7 w-full rounded-md">
						متابعة الشراء
					</button>
					<button className=" text-black bg-white h-7 w-full rounded-md">
						العودة للتسوق
					</button>
				</div>
				<div className="flex flex-col h-full flex-grow-0 min-w-[60%] gap-7">
					<span className="text-black text-3xl font-bold text-right w-full h-10">
						المنتجات
					</span>
					<table className="table-auto">
						<thead className="text-zinc-50 text-sm text-right outline rounded-sm bg-zinc-400 outline-zinc-400 h-fit">
							<td className="w-[7.5%]"></td>
							<td className="py-1">السعر</td>
							<td>الكمية</td>
							<td>المنتج</td>
						</thead>
						<tbody>
							{products.map((product, i) => (
								<tr
									key={i}
									className="text-zinc-800 text-sm text-right outline rounded-sm bg-white outline-zinc-400 h-fit"
								>
									<div className="relative flex items-center justify-center h-full aspect-square">
										<div className="absolute w-full h-full p-1 flex justify-center">
											<img
												src={product.imageURL}
												alt=""
												className="h-full object-center object-contain"
											/>
										</div>
									</div>
									<td className="pr-1">{10}</td>
									<td className="pr-1">{10}</td>
									<td className="pr-1 py-2">{product.name}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
