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
	const href = i18n.language === "hu" ? "/eloadasok" : "/presentations";
	return (
		<section className="mx-auto w-full px-4 py-16 xl:max-w-6xl">
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
				<PresentationPreviewTile
					href={href}
					title="Kicsiben is nagyok: budapesti fejlesztésű MEMS-érzékelők és méréstechnikai kihívások"
				/>
				<PresentationPreviewTile
					className=""
					href={href}
					title="Rövid cím bla bla bla"
				/>
				<PresentationPreviewTile
					className=""
					href={href}
					title="Kicsiben is nagyok: budapesti fejlesztésű MEMS-érzékelők"
				/>
				<PresentationPreviewTile
					className="hidden md:flex xl:hidden"
					href={href}
					title="Kicsiben is nagyok: budapesti fejlesztésű MEMS-érzékelők"
				/>
			</div>
			<div className="mx-auto my-8 max-w-lg">
				<TextButton href={href} text={t("presentations.items.more")} />
			</div>
		</section>
	);
}
