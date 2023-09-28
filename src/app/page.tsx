import Image from "next/image";

export default function Home() {
	return (
		<main className="w-screen h-screen bg-slate-600 ">
			<div className="container mx-auto flex h-full flex-col justify-center items-center gap-6 p-6">
				<div className="relative aspect-square w-full max-w-xs">
					<Image className="rounded-full" fill src="/logo.jpg" alt="" />
				</div>
				<span className="md:text-6xl text-4xl text-slate-400 drop-shadow-xl">
					Coming soon...
				</span>
			</div>
		</main>
	);
}
