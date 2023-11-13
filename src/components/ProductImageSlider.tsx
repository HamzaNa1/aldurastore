"use client";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from "react";

interface ProductImageSliderProps {
	imageUrls: string[];
}

export default function ProductImageSlider({
	imageUrls,
}: ProductImageSliderProps) {
	const [loaded, setLoaded] = useState(false);
	const [currentImage, setCurrentImage] = useState(0);

	const [sliderRef, instanceRef] = useKeenSlider(
		{
			vertical: true,
			mode: "free",
			slides: { perView: "auto", spacing: 5 },
		},
		[]
	);

	useEffect(() => {
		setLoaded(true);
	}, []);

	return (
		<div className="relative w-full h-fit flex p-10 gap-3">
			<div className="relative w-[13%] overflow-hidden">
				{loaded ? (
					<div className="absolute w-full h-full">
						<div ref={sliderRef} className="relative w-full h-full">
							{imageUrls.map((url, i) => (
								<button
									key={i}
									className="keen-slider__slide"
									onClick={() => {
										setCurrentImage(i);
									}}
								>
									<div className="w-full aspect-square bg-white">
										<img
											className="h-full object-center object-contain mx-auto"
											src={url}
										></img>
									</div>
								</button>
							))}
						</div>
					</div>
				) : (
					<div className="flex flex-col gap-3">
						<div className="w-full aspect-square bg-white animate-pulse"></div>
						<div className="w-full aspect-square bg-white animate-pulse"></div>
						<div className="w-full aspect-square bg-white animate-pulse"></div>
						<div className="w-full aspect-square bg-white animate-pulse"></div>
						<div className="w-full aspect-square bg-white animate-pulse"></div>
					</div>
				)}
			</div>
			<div className="w-full aspect-square bg-white">
				<img
					className="h-full object-center object-contain mx-auto"
					src={imageUrls[currentImage]}
				></img>
			</div>
		</div>
	);
}
