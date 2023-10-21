interface ProductPageProps {
	params: {
		id: string;
	};
}

export default function Product({ params: { id } }: ProductPageProps) {
	return <span>{id}</span>;
}
