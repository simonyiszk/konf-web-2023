import { useTranslation } from "next-i18next";

import { TextButton } from "../button/TextButton";
import type { PresentationPreviewType } from ".";
import { PresentationPreviewTile } from "./PresentationPreviewTile";

type PresentationSectionProps = {
	presentations: PresentationPreviewType[];
};

export function PresentationSection({
	presentations,
}: PresentationSectionProps) {
	const { t, i18n } = useTranslation("common");
	const href = i18n.language === "hu" ? "/eloadasok" : "/presentations";
	return (
		<section id={href.split("/")[1]} className="mx-auto w-full px-4 py-16">
			<div className="grid grid-cols-1 place-items-center gap-8 md:grid-cols-2 xl:grid-cols-3">
				{presentations.map((p) => (
					<PresentationPreviewTile key={p.href} title={p.title} href={p.href} />
				))}
			</div>
			<div className="mx-auto my-8 max-w-lg">
				<TextButton href={href} text={t("presentations.items.more")} />
			</div>
		</section>
	);
}
