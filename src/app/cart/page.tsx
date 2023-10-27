export default function Cart() {
	return (
		<>
			<div className="flex flex-row w-full h-full bg-secondary">
				<div className="flex flex-col w-full h-full gap-7 p-20">
					<span className="text-black text-3xl font-bold text-right h-10 w-[30%] justify-end">
						تفاصيل الفاتورة
					</span>
					<div className="flex flex-row h-7 w-[30%] outline rounded-sm p-1 bg-zinc-400 outline-zinc-400 ">
						<span className="text-black text-sm text-right "> القيمة</span>
						<span className="text-black text-sm text-left ml-auto"> الوصف</span>
					</div>
					<div className="flex flex-row h-7 w-[30%] outline rounded-sm p-3 bg-white outline-zinc-400 "></div>
					<div className="flex flex-row h-7 w-[30%] outline rounded-sm p-3 bg-white outline-zinc-400 "></div>
					<button className="bg-black h-7 w-[30%] rounded-md">
						متابعة الشراء
					</button>
					<button className=" text-black bg-white h-7 w-[30%] rounded-md">
						العودة للتسوق
					</button>
				</div>
				{/*left col */}
				<div className="flex flex-col"></div>
				{/*right col */}
			</div>
			{/* biggest div */}
		</>
	);
}
