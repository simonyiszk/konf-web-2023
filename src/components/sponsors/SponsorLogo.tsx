import Image from "next/image";

import type { TypeSponsorLogoFields } from "@/@types/generated";

function ConditionalWrapper({
	condition,
	renderWrapper: wrapper,
	children,
}: {
	condition: boolean;
	renderWrapper: (arg0: JSX.Element) => JSX.Element;
	children: JSX.Element;
}) {
	return condition ? wrapper(children) : children;
}

export function SponsorLogo({ name, image, link }: TypeSponsorLogoFields) {
	if (!image.fields.file?.url) {
		return null;
	}
	return (
		<ConditionalWrapper
			condition={!!link}
			renderWrapper={(children) => (
				<a href={link} target="_blank" rel="noopener noreferrer">
					{children}
				</a>
			)}
		>
			<div className="relative p-2">
				<Image
					src={`https:${image.fields.file.url}`}
					alt={`${name} logo`}
					unoptimized
					loading="lazy"
				/>
			</div>
		</ConditionalWrapper>
	);
}
