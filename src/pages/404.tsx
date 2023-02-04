import Link from "next/link";

import { Layout } from "@/components/layout/Layout";

export default function Custom404() {
	return (
		<Layout className="relative m-auto flex flex-col font-mona sm:px-4 md:px-8 lg:px-12 xl:px-16">
			<section className="mt-16 flex h-full flex-col">
				<h1 className="m-4 text-center text-2xl font-semibold lg:text-5xl">
					404 - Ez az oldal sajnos nem található 😔
				</h1>
				<Link
					href="/"
					className="blue-green-gradient gradient-on-text m-2 mx-auto w-fit text-center text-lg underline underline-offset-2 hover:underline-offset-4 lg:text-2xl"
				>
					Vissza a főoldalra
				</Link>
			</section>
		</Layout>
	);
}
