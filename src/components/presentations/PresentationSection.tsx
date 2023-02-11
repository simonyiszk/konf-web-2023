import { TextButton } from "../button/TextButton";
import { PresentationPreviewTile } from "./PresentationPreviewTile";

type PresentationSectionProps = {
	presentations: any[];
};

export function PresentationSection() {
	return (
		<section className="mx-auto w-full px-4 py-16 xl:max-w-6xl">
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
				<PresentationPreviewTile
					href="asd"
					title="Kicsiben is nagyok: budapesti fejlesztésű MEMS-érzékelők és méréstechnikai kihívások"
				/>
				<PresentationPreviewTile
					className="hidden md:flex"
					href="asd"
					title="Rövid cím bla bla bla"
				/>
				<PresentationPreviewTile
					className="hidden md:flex"
					href="asd"
					title="Kicsiben is nagyok: budapesti fejlesztésű MEMS-érzékelők"
				/>
				<PresentationPreviewTile
					className="hidden md:flex xl:hidden"
					href="asd"
					title="Kicsiben is nagyok: budapesti fejlesztésű MEMS-érzékelők"
				/>
			</div>
			<div className="mx-auto my-8 max-w-lg">
				<TextButton href="/presentations" text="További izgalmas előadások" />
			</div>
		</section>
	);
}
