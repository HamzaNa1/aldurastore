"use client";

import useEmblaCarousel from "embla-carousel-react";

interface SliderProps {
	children: React.ReactNode;
}

export default function Slider({ children }: SliderProps) {
	const [sliderRef, sliderInstance] = useEmblaCarousel({
		dragFree: false,
		axis: "y",
	});

	return (
		<div ref={sliderRef} className="w-full h-full overflow-hidden">
			<div className="flex flex-col w-full h-full">{children}</div>
		</div>
	);
}
