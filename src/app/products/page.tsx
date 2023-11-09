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
			<div className="flex justify-center w-full bg-secondary brightness-90 p-2">
				<div className="container flex flex-row flex-wrap gap-3 justify-center">
					{Filter("Woman")}
					{Filter("Men")}
					{Filter("Children")}
				</div>
			</div>
			<div className="w-full h-fit bg-secondary flex flex-row flex-wrap justify-start gap-10 px-80">
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
