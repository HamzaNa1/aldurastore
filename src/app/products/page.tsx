import ProductView from "@/components/ProductView";

export default function Products() {
	const images = [
		"/test.png",
		"/test2.png",
		"/test.png ",
		"/test2.png",
		"/test.png",
		"/test2.png",
		"/test.png",
		"/test2.png",
	];

	return (
		<>
			<div className="w-full h-fit bg-secondary flex flex-row flex-wrap justify-start gap-10 px-80 py-10">
				{images.map((image, i) => (
					<ProductView key={i} imageURL={image}></ProductView>
				))}
			</div>
		</>
	);
}

function Filter(filterName: string) {
	return (
		<button className="w-24 py-2 bg-white rounded-full text-black">
			{filterName}
		</button>
	);
}
