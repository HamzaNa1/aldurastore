"use client";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { GoDot, GoDotFill } from "react-icons/go";

interface HeroComponentProps {
	images: string[];
}

export default function Hero({ images }: HeroComponentProps) {
	const [currIndex, setCurrIndex] = useState(0);
	const [loaded, setLoaded] = useState(true);

	const prevSlide = () => {
		instanceRef.current?.prev();
	};

	const nextSlide = () => {
		instanceRef.current?.next();
	};

	const [sliderRef, instanceRef] = useKeenSlider(
		{
			loop: true,
			slides: {
				perView: 1,
			},
		},
		[
			(slider) => {
				let timeout: NodeJS.Timeout;

				function clearNextTimeout() {
					clearTimeout(timeout);
				}

				function nextTimeout() {
					clearTimeout(timeout);
					timeout = setTimeout(() => {
						slider.next();
					}, 4000);
				}

				slider.on("dragStarted", clearNextTimeout);
				slider.on("animationEnded", nextTimeout);
				slider.on("updated", nextTimeout);
				slider.on("slideChanged", (e) => {
					setCurrIndex(e.track.details.rel);
				});

				nextTimeout();
			},
		]
	);

	useEffect(() => {
		setLoaded(true);
	}, []);

	return (
		<div className="w-full h-full bg-[#B9B9B9]">
			{loaded && (
				<div ref={sliderRef} className="keen-slider w-full h-full">
					{images.map((src, i) => (
						<div key={i} className="keen-slider__slide w-full h-full">
							<img
								src={src}
								alt=""
								className="w-full h-full object-center object-contain"
							/>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
