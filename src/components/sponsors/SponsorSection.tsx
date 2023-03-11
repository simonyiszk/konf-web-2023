import clsx from "clsx";
import { useTranslation } from "next-i18next";

import type { ReturnTypeSponsors } from "@/utils/contentful";

import { SponsorLogo } from "./SponsorLogo";
import styles from "./SponsorSection.module.scss";

type SponsorSectionProps = ReturnTypeSponsors;

export function SponsorSection({
	goldSponsor,
	silverSponsors,
	bronzeSponsors,
}: SponsorSectionProps) {
	const { t } = useTranslation("common");
	return (
		<div className="w-full bg-white">
			<section className={styles.section} id="sponsors">
				<h2 className="text-3xl font-bold">{t("sponsors.title")}</h2>
				<div className="flex flex-col justify-center">
					<h3 className="mb-auto text-3xl">{t("sponsors.items.main")}</h3>
					<div className={styles.containerOne}>
						{goldSponsor.fields.image && (
							<SponsorLogo
								key={goldSponsor.fields.name}
								{...goldSponsor.fields}
								className="mx-0 h-auto w-72 sm:w-96 2xl:w-80"
							/>
						)}
					</div>
				</div>
				<div>
					<h3 className="text-3xl">{t("sponsors.items.featured")}</h3>
					<div className={styles.containerMany}>
						{silverSponsors.items.map(
							({ fields }) =>
								fields.image && (
									<SponsorLogo
										key={fields.name}
										{...fields}
										className="col-span-2 h-auto max-w-[200px]"
									/>
								),
						)}
					</div>
				</div>
				<div>
					<h3 className="text-3xl">{t("sponsors.items.other")}</h3>
					<div className={clsx(styles.containerMany)}>
						{bronzeSponsors.items.map(({ fields }) => (
							<SponsorLogo
								key={fields.name}
								{...fields}
								className="col-span-2 h-auto max-w-[170px]"
							/>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
