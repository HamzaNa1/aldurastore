export default function ProductView() {
	return (
		<>
			<div className="w-[400px] h-[700px] bg-red-50 flex flex-col">
				<div className="w-full aspect-square bg-black">
					<img src="" />
				</div>

				<div className=" w-full h-auto p-4 flex flex-col gap-4">
					<div className="text-[#145654]   right-0 text-right text-3xl">
						اسم المنتج اسم المنتج اسم المنتج اسم المنتج
					</div>

					<div className="text-[#909090]  right-0 text-right text-xl">
						وصف المنتج وصف المنتج وصف المنتج وصف المنتج وصف المنتج وصف المنتج
						وصف المنتج وصف المنتج وصف المنتج وصف المنتج وصف المنتج وصف
					</div>
				</div>
			</div>
		</>
	);
}
