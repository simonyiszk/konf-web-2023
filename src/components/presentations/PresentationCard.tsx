import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

const mock = {
	title: "Lorem ipsum dolor sit amet, consectetur no se mas en la",
	description:
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sagittis nisl vitae malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sagittis nisl vitae Curabitur sagittis nisl vitae malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sagittis nisl vitae",
};

function sliceString(str: string, length: number) {
	if (str.length > length) {
		const slicedString = str.slice(0, 200);
		const nearestWhiteSpace = slicedString.lastIndexOf(" ");
		return `${slicedString.slice(0, nearestWhiteSpace)}...`;
	}
	return str.slice(0, length);
}

type PresentationCardProps = {
	presenter: string;
	title: string;
	description: string;
};

// TODO: remove PARTIAL
export function PresentationCard({
	title = mock.title,
	presenter = "Dr. Dudás Levente",
	description = mock.description,
}: Partial<PresentationCardProps>) {
	const slicedDescription = sliceString(description, 200);

	return (
		<div className="relative w-[350px] overflow-hidden rounded bg-konf-overlay-blue">
			<div className="relative h-[300px] w-full bg-gradient-to-b from-konf-primary-green to-transparent">
				<Image
					src="http://placekitten.com/350/200"
					fill
					className="object-cover object-bottom"
					alt={presenter}
					draggable={false}
					unoptimized
				/>
			</div>
			<div className="absolute mx-auto -mt-3 flex w-full flex-row justify-center">
				<span className="inline-block w-2/3 bg-konf-accent-yellow text-center text-xl font-bold text-konf-background-blue">
					{presenter}
				</span>
			</div>
			<div className="my-10 px-5">
				<h2 className={clsx("mb-5 text-xl font-bold text-white")}>{title}</h2>
				<p className="text-base">{slicedDescription}</p>
			</div>
			<Link
				className="inline-block w-full bg-konf-primary-green py-2 text-center text-xl font-bold text-konf-background-blue                "
				href="/"
			>
				Részletek
			</Link>
		</div>
	);
}
