import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Layout } from "@/components/layout/Layout";

export async function getStaticProps({ locale }: GetStaticPropsContext) {
	const i18n = await serverSideTranslations(locale ?? "hu", ["common"]);
	return {
		props: {
			...i18n,
			buildDate: Date.now(),
		},
	};
}

export default function Custom404({
	buildDate,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<Layout
			className="relative m-auto flex w-full grow flex-col justify-center font-mona sm:px-4 md:px-8 lg:px-12 xl:px-16"
			buildDate={buildDate}
		>
			<section className="mt-32 mb-16 flex h-full flex-col">
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
