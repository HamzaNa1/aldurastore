"use client";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { GoDot, GoDotFill } from "react-icons/go";

import Image from "next/image";

interface HeroComponentProps {
	images: string[];
}

export default function Hero({ images }: HeroComponentProps) {
	const [currIndex, setCurrIndex] = useState(0);
	const [loaded, setLoaded] = useState(false);

	const prevSlide = () => {
		instanceRef.current?.prev();
	};

	const nextSlide = () => {
		instanceRef.current?.next();
	};

	const [sliderRef, instanceRef] = useKeenSlider(
		{
			loop: true,
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
		<div className="relative w-full h-full bg-[#B9B9B9]">
			<div className="absolute w-full top-0 left-0 bottom-0 right-0">
				<div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-1 p-2 cursor-pointer z-10">
					<BsChevronCompactLeft
						className="fill-black"
						onClick={prevSlide}
						size={30}
					/>
				</div>
				<div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] right-1 p-2 cursor-pointer z-10">
					<BsChevronCompactRight
						className="fill-black"
						onClick={nextSlide}
						size={30}
					/>
				</div>
				<div className="absolute bottom-0 right-[50%] translate-x-[50%] flex flex-row justify-center items-end z-10 p-2">
					{images.map((_, i) => (
						<div
							key={i}
							className="w-5 h-5 cursor-pointer"
							onClick={() => instanceRef.current?.moveToIdx(i)}
						>
							{i == currIndex ? (
								<GoDotFill className="fill-primary w-full h-full"></GoDotFill>
							) : (
								<GoDot className="fill-primary w-full h-full"></GoDot>
							)}
						</div>
					))}
				</div>
			</div>

			{loaded && (
				<div ref={sliderRef} className="keen-slider w-full h-full">
					{images.map((src, i) => (
						<div key={i} className="keen-slider__slide w-full h-full">
							<Image
								src={src}
								alt=""
								className="h-full object-center object-contain"
								fill
							/>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
