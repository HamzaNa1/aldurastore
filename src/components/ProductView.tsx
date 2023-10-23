import Image from "next/image";

interface ProductViewProp {
	imageURL: string;
}

export default function ProductView({ imageURL }: ProductViewProp) {
	return (
		<>
			<div className="w-[400px] h-[700px] bg-white flex flex-col">
				<div className="relative w-full aspect-square">
					<Image
						src={imageURL}
						alt=""
						fill
						className="h-full object-center object-contain"
					/>
				</div>

				<div className="w-full h-auto p-4 flex flex-col gap-4">
					<div className="text-[#145654] right-0 text-right text-3xl">
						اسم المنتج اسم المنتج اسم المنتج اسم المنتج
					</div>

					<div className="text-[#909090] right-0 text-right text-xl">
						وصف المنتج وصف المنتج وصف المنتج وصف المنتج وصف المنتج وصف المنتج
						وصف المنتج وصف المنتج وصف المنتج وصف المنتج وصف المنتج وصف
					</div>
				</div>
			</div>
		</>
	);
}
