interface ProductPageProps {
	params: {
		id: string;
	};
}

export default function Product({ params: { id } }: ProductPageProps) {
	const colors = ["1", "2", "3"];
	const sizes = ["S", "M", "L", "XL"];
	return (
		<div>
			<div className="bg-secondary w-full h-fit flex flex-row justify-center p-[60px]">
				<div className="bg-secondary w-full h-[800px] flex justify-center items-center">
					<div className="w-[780px] h-[780px] bg-black"></div>
				</div>
				<div className="bg-secondary w-full h-[800px] ">
					<div className="w-full h-fit text-right font-bold text-[32px]">
						<span className="text-primary ">
							xxxxxxxxxxxx <br />
							xxxxxxxxxxxx
						</span>
					</div>
					<div className="h-[3px] w-full bg-primary "></div>
					<div className="w-full h-fit text-right text-[20px]">
						<span className="text-black">9.99$</span>
					</div>

					<div className="text-black text-right py-60">
						<div>
							<span>:المقاس</span>
							<div className=""></div>
						</div>
						<div>
							<span>:اللون</span>
						</div>
					</div>
				</div>
			</div>
			<span className="text-black">{id}</span>;
		</div>
	);
}
