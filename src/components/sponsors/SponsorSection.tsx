import clsx from "clsx";
import { useTranslation } from "next-i18next";

import type { TypeSponsorLogoFields } from "@/@types/generated";

import { SponsorLogo } from "./SponsorLogo";
import styles from "./SponsorSection.module.scss";

type SponsorSectionProps = {
	sponsors?: TypeSponsorLogoFields[];
};

export function SponsorSection({ sponsors }: SponsorSectionProps) {
	const mainSponsor =
		sponsors?.find((sponsor) => sponsor.sponsorshipGrade === "főtámogató") ??
		null;

	const featuredSponsors =
		sponsors?.filter((s) => s.sponsorshipGrade === "kiemelt támogató") ?? [];

	const otherSponsors =
		sponsors?.filter((s) => s.sponsorshipGrade === "támogató") ?? [];

	const { t } = useTranslation("common");
	return (
		<div className="bg-white">
			<section className={styles.section}>
				<h2 className="text-3xl font-bold">{t("sponsors.title")}</h2>
				<div>
					<h3 className="text-3xl">{t("sponsors.items.main")}</h3>
					<div className={styles.containerOne}>
						{mainSponsor && (
							<SponsorLogo key={mainSponsor.name} {...mainSponsor} />
						)}
					</div>
				</div>
				<div>
					<h3 className="text-3xl">{t("sponsors.items.featured")}</h3>
					<div className={styles.containerMany}>
						{featuredSponsors.map((sponsor) => (
							<SponsorLogo key={sponsor.name} {...sponsor} />
						))}
					</div>
				</div>
				<div>
					<h3 className="text-3xl">{t("sponsors.items.other")}</h3>
					<div className={clsx(styles.containerMany)}>
						{otherSponsors.map((sponsor) => (
							<SponsorLogo key={sponsor.name} {...sponsor} />
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
