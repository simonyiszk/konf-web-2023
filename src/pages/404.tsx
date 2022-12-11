import Link from "next/link";

import { Layout } from "@/components/layout/Layout";

export default function Custom404() {
	return (
		<Layout className="safe-area-x relative mx-auto mb-8 flex flex-col sm:px-4 md:px-8 lg:px-12 xl:px-16">
			<section className="mt-16 flex flex-col">
				<h1 className="m-4 text-center text-2xl font-semibold lg:text-5xl">
					404 - Ez az oldal sajnos nem található 😔
				</h1>
				<Link
					href="/"
					className="m-2 text-center text-lg underline decoration-yellow-300 underline-offset-2 hover:underline-offset-4 lg:text-2xl"
				>
					Vissza a főoldalra
				</Link>
			</section>
		</Layout>
	);
}
