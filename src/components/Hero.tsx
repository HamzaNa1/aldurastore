"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { GoDot, GoDotFill } from "react-icons/go";
import Image from "next/image";

interface HeroComponentProps {
	images: string[];
}

export default function Hero({ images }: HeroComponentProps) {
	const [currIndex, setCurrIndex] = useState(0);

	const options = {
		delay: 4000,
		stopOnMouseEnter: true,
		stopOnInteraction: false,
		rootNode: (emblaRoot: HTMLElement) => emblaRoot.parentElement,
	};

	const [sliderRef, sliderInstance] = useEmblaCarousel(
		{
			dragFree: false,
			loop: true,
		},
		[Autoplay(options)]
	);

	const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
		setCurrIndex(emblaApi.selectedScrollSnap());
	}, []);

	useEffect(() => {
		if (!sliderInstance) return;

		onSelect(sliderInstance);
		sliderInstance.on("select", onSelect);
	}, [sliderInstance, onSelect]);

	const prevSlide = () => {
		sliderInstance?.scrollPrev();
	};

	const nextSlide = () => {
		sliderInstance?.scrollNext();
	};

	return (
		<div className="aspect-video w-full">
			<div className="relative w-full h-full bg-[#B9B9B9] overflow-hidden drop-shadow-lg rounded-lg">
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
					<div className="hidden sm:flex absolute bottom-0 right-[50%] translate-x-[50%] flex-row justify-center items-end z-10 p-2">
						{images.map((_, i) => (
							<div
								key={i}
								className="w-5 h-5 cursor-pointer"
								onClick={() => sliderInstance?.scrollTo(i)}
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

				<div ref={sliderRef} className="w-full h-full overflow-hidden">
					<div className="flex flex-row w-full h-full">
						{images.map((src, i) => (
							<div key={i} className="flex-[0_0_100%]">
								<div className="w-full h-full relative">
									<Image
										src={src}
										className="absolute w-full h-full object-center object-contain"
										alt=""
										fill
										priority={i == 0}
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
