"use client";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

interface SliderProps {
	perView: number;
	children: React.ReactNode;
}

export default function ProductBannerSlider({
	perView,
	children,
}: SliderProps) {
	const [sliderRef, instanceRef] = useKeenSlider(
		{
			vertical: true,
			mode: "free",
			slides: { perView: perView, spacing: 10 },
		},
		[]
	);

	return (
		<div className="w-full h-full overflow-hidden">
			<div ref={sliderRef} className="relative w-full h-full">
				{children}
			</div>
		</div>
	);
}
