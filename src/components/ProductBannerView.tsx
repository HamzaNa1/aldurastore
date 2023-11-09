interface ProductBannerViewProps {
	id: string;
	name: string;
	description: string;
	imageURL: string;
}

export default function ProductBannerView({
	id,
	name,
	description,
	imageURL,
}: ProductBannerViewProps) {
	return (
		<>
			<div className="flex flex-row w-full outline rounded-sm p-3 bg-white outline-zinc-400 gap-10 justify-end">
				<span className="text-zinc-800 flex-grow">{name}</span>
				<span className="text-zinc-800 flex-grow">{id}</span>
				<span className="text-zinc-800 flex-grow">{description}</span>
				<div className="relative w-16 h-9 aspect-square flex-grow">
					<img
						src={imageURL}
						alt=""
						className="h-full object-center object-contain"
					/>
				</div>
			</div>
		</>
	);
}
