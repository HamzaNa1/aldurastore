import ProductView from "@/components/ProductView";
const image = "/test.png";

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
		"/test.png",
		"/test.png",
	];

	return (
		<>
			<div className="w-full h-fit bg-secondary flex flex-row flex-wrap justify-start gap-10 px-80 ">
				{images.map((image) => (
					<ProductView imageURL={image}></ProductView>
				))}
				;
			</div>
		</>
	);
}
