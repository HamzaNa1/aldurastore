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

	const products = images.map((x) => ({
		id: "1",
		name: "اسم المنتج",
		description: "وصف المنتج",
		imageURL: x,
		showOnMain: true,
		activated: true,
	}));

	return (
		<>
			<div className="w-full h-fit bg-secondary flex flex-row flex-wrap justify-start gap-10 px-80 py-10">
				{products.map((product, i) => (
					<ProductView key={i} product={product}></ProductView>
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
