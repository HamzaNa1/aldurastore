"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";

interface ProductImageSliderProps {
	imageUrls: string[];
}

export default function ProductImageSlider({
	imageUrls,
}: ProductImageSliderProps) {
	const [loaded, setLoaded] = useState(false);
	const [currentImage, setCurrentImage] = useState(-1);

	const [sliderRef] = useEmblaCarousel({
		containScroll: "keepSnaps",
		dragFree: true,
	});

	const [mainSliderRef, mainSliderInstance] = useEmblaCarousel({
		dragFree: false,
		loop: true,
	});

	useEffect(() => {
		setLoaded(true);
	}, []);

	return (
		<>
			<div className="flex flex-col w-full h-full gap-3 py-4 items-start justify-start">
				<div className="relative w-full aspect-square bg-white">
					<div ref={mainSliderRef} className="w-full h-full overflow-hidden">
						<div className="flex flex-row w-full h-full ">
							{imageUrls.map((url, i) => (
								<button
									key={i}
									className="flex-[0_0_100%] bg-white cursor-zoom-in"
									onClick={() => setCurrentImage(i)}
								>
									<div className="h-full aspect-square">
										<img
											src={url}
											alt=""
											loading={i == 0 ? "eager" : "lazy"}
											className="w-full h-full object-center object-contain"
										/>
									</div>
								</button>
							))}
						</div>
					</div>
				</div>
				<div
					ref={sliderRef}
					className="relative h-[13%] w-full overflow-hidden"
				>
					<div className="flex flex-row w-full h-full ">
						{imageUrls.map((url, i) => (
							<button
								key={i}
								className="flex-[0_0_13%] mx-1 bg-white"
								onClick={() => mainSliderInstance?.scrollTo(i)}
							>
								<div className="h-full aspect-square">
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
			</div>
			{currentImage != -1 && (
				<div
					className="fixed flex justify-center inset-0 bg-black/90 z-50 cursor-zoom-out"
					onClick={() => setCurrentImage(-1)}
				>
					<div className="landscape:h-full portrait:w-full aspect-square">
						<img
							src={imageUrls[currentImage]}
							alt=""
							className="w-full h-full object-center object-contain"
						/>
					</div>
				</div>
			)}
		</>
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
