import clsx from "clsx";
import type {
	EntryCollectionWithLinkResolutionAndWithoutUnresolvableLinks,
	EntryWithLinkResolutionAndWithoutUnresolvableLinks,
} from "contentful";
import { useTranslation } from "next-i18next";

import type { TypeSponsorLogoFields } from "@/@types/generated";

import { SponsorLogo } from "./SponsorLogo";
import styles from "./SponsorSection.module.scss";

type SponsorSectionProps = {
	goldSponsor: EntryWithLinkResolutionAndWithoutUnresolvableLinks<TypeSponsorLogoFields>;
	silverSponsors: EntryCollectionWithLinkResolutionAndWithoutUnresolvableLinks<TypeSponsorLogoFields>;
	bronzeSponsors: EntryCollectionWithLinkResolutionAndWithoutUnresolvableLinks<TypeSponsorLogoFields>;
};

export function SponsorSection({
	goldSponsor,
	silverSponsors,
	bronzeSponsors,
}: SponsorSectionProps) {
	const { t } = useTranslation("common");
	return (
		<div className="span bg-white">
			<section className={styles.section} id="sponsors">
				<h2 className="text-3xl font-bold">{t("sponsors.title")}</h2>
				<div>
					<h3 className="text-3xl">{t("sponsors.items.main")}</h3>
					<div className={styles.containerOne}>
						{goldSponsor.fields.image && (
							<SponsorLogo
								key={goldSponsor.fields.name}
								{...goldSponsor.fields}
								className="h-auto w-[232px]"
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
										className="h-auto w-[192px]"
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
								className="h-auto w-[158px]"
							/>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
