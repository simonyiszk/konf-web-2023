import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FaArrowLeft } from "react-icons/fa";

import { Layout } from "@/components/layout/Layout";
import { LayoutContent } from "@/components/layout/LayoutContent";
import { Seo } from "@/components/layout/Seo";

const mock = {
	title: `Kicsiben is nagyok: budapesti fejlesztésű MEMS-érzékelők és
	méréstechnikai kihívások`,
	description: `Menetstabilizáló rendszer, okostelefon, earbud, gamer controller és
	a marsi helicopter. Mi ezekben a közös? Valamennyi rendszer lelke a
	MEMS-alapú érzékelés: gyorsulás, szögelfordulás, légnyomás, mágneses
	térerősség. Ezek az emberi hajszál átmérőjénél is kisebb
	mikrostruktúrák pár év alatt a hétköznapjaink észrevétlen és
	nélkülözhetetlen részévé váltak, milliószámra kerülnek okos
	eszközökbe és járművekbe, mégis nagyon kevesen ismerik működésük
	fizikai alapjait, ASIC-jük komplexitását és a gyártásuk során
	alkalmazott gépi tanulási algoritumusok rejtelmeit. Előadásunkban a
	Bosch mérnökei hozzák közelebb a MEMS-érzékelők bonyolult világát és
	adnak betekintést a Budapesti Innovációs Kampuszban zajló
	fejlesztések mérnöki kihívásaiba.`,
};

function TextContent() {
	return (
		<div className="sm:col-span-2">
			<h1 className="text-3xl font-semibold lg:text-5xl">{mock.title}</h1>
			{/* <p className="my-1 text-lg tracking-wider ">IB026 | 16:00 - 17:00</p> */}
			<p className="mt-4 text-lg">{mock.description}</p>
		</div>
	);
}

function Speaker() {
	return (
		<div>
			<div className="relative aspect-1 h-auto w-full">
				<Image
					className="rounded-lg object-cover"
					src="http://placekitten.com/200/300"
					fill
					alt="asd"
					unoptimized
				/>
			</div>
			<div className="relative flex flex-row justify-center">
				<p className="absolute mx-auto -mt-4 bg-konf-accent-yellow px-2 text-center text-2xl font-bold text-konf-background-blue">
					Borda Péter
				</p>
			</div>
			<div className="relative mt-8 h-16 w-full">
				<Image
					src="http://placekitten.com/200/300"
					alt="asd"
					fill
					className="object-cover"
					unoptimized
				/>
			</div>
		</div>
	);
}

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Presentation({ buildDate }: PageProps) {
	const { t, i18n } = useTranslation("common");

	const href = i18n.language === "hu" ? "/eloadasok" : "/en/presentations";
	return (
		<Layout buildDate={buildDate}>
			<Seo title={mock.title} description={mock.description} />
			<LayoutContent>
				<Link
					href={href}
					className="mb-8 text-lg opacity-70 transition duration-300 hover:opacity-100"
				>
					<FaArrowLeft className="inline" />{" "}
					{t("presentations.items.back").toLowerCase()}
				</Link>
				<div className="mt-8 rounded bg-konf-overlay-blue px-4">
					<section className="mx-auto grid max-w-5xl gap-8 py-16 sm:grid-cols-3">
						<Speaker />
						<TextContent />
					</section>
				</div>
			</LayoutContent>
		</Layout>
	);
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
	const i18n = await serverSideTranslations(locale ?? "hu", ["common"]);

	return {
		props: {
			...i18n,
			buildDate: Date.now(),
		},
	};
}

export async function getStaticPaths() {
	return {
		paths: ["/eloadasok/asd", "/en/eloadasok/asd"],
		fallback: false,
	};
}
