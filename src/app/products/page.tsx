import ProductView from "@/components/ProductView";

export default function Products() {
	const images = [
		"/logo.png",
		"/logo.png",
		"/logo.png ",
		"/test.png",
		"/test.png",
		"/test.png",
		"/test.png",
		"/test.png",
	];

	return (
		<>
			<div className="w-full h-fit bg-secondary flex flex-row flex-wrap justify-start gap-10 px-80 ">
				{images.map((image, i) => (
					<ProductView key={i} imageURL={image}></ProductView>
				))}
			</div>
		</>
	);
}
