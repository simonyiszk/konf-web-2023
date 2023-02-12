import { useTranslation } from "next-i18next";

import { TextButton } from "../button/TextButton";
import { PresentationPreviewTile } from "./PresentationPreviewTile";

/* 
type PresentationSectionProps = {
	presentations: any[];
};
 */
export function PresentationSection() {
	const { t, i18n } = useTranslation("common");
	return (
		<section className="mx-auto w-full px-4 py-16 xl:max-w-6xl">
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
				<PresentationPreviewTile
					href="/presentations"
					title="Kicsiben is nagyok: budapesti fejlesztésű MEMS-érzékelők és méréstechnikai kihívások"
				/>
				<PresentationPreviewTile
					className=""
					href="/presentations"
					title="Rövid cím bla bla bla"
				/>
				<PresentationPreviewTile
					className=""
					href="/presentations"
					title="Kicsiben is nagyok: budapesti fejlesztésű MEMS-érzékelők"
				/>
				<PresentationPreviewTile
					className="hidden md:flex xl:hidden"
					href="/presentations"
					title="Kicsiben is nagyok: budapesti fejlesztésű MEMS-érzékelők"
				/>
			</div>
			<div className="mx-auto my-8 max-w-lg">
				<TextButton
					href={i18n.language === "hu" ? "/eloadasok" : "/presentations"}
					text={t("presentations.items.more")}
				/>
			</div>
		</section>
	);
}
