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

	const windowSize = useWindowSize();
	const [sliderRef] = useKeenSlider(
		{
			vertical: windowSize.width > 1280,
			mode: "free",
			slides: { perView: "auto", spacing: 5 },
		},
		[]
	);

	useEffect(() => {
		setLoaded(true);
	}, []);

	return (
		<div className="relative w-full flex flex-col-reverse xl:flex-row py-4 gap-3">
			<div className="relative h-[13%] xl:h-auto xl:w-[13%] overflow-hidden shrink-0">
				{loaded ? (
					<div className="absolute w-full h-full">
						<div ref={sliderRef} className="w-full h-full">
							{imageUrls.map((url, i) => (
								<button
									key={i}
									className="keen-slider__slide relative h-full xl:w-full xl:h-auto aspect-square"
									onClick={() => {
										setCurrentImage(i);
									}}
								>
									<div className="w-full h-full bg-white">
										<img
											src={url}
											alt=""
											className="w-full h-full object-center object-contain"
										/>
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
			<div className="relative w-full aspect-square bg-white">
				<img
					src={imageUrls[currentImage]}
					alt=""
					className="absolute w-full h-full object-center object-contain"
				/>
			</div>
		</div>
	);
}

function useWindowSize() {
	const [windowSize, setWindowSize] = useState({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		function handleResize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}
		window.addEventListener("resize", handleResize);
		handleResize();
		return () => window.removeEventListener("resize", handleResize);
	}, []);
	return windowSize;
}
