import clsx from "clsx";
import type { Asset } from "contentful";
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

type SponsorLogoProps = Omit<TypeSponsorLogoFields, "image"> &
	React.HTMLProps<HTMLDivElement> & { image?: Asset };

export function SponsorLogo({
	name,
	image,
	link,
	...restProps
}: SponsorLogoProps) {
	if (!image?.fields.file?.url) {
		return null;
	}
	return (
		<ConditionalWrapper
			condition={!!link}
			renderWrapper={(children) => (
				<a
					href={link}
					target="_blank"
					rel="noopener noreferrer"
					className={restProps.className}
				>
					{children}
				</a>
			)}
		>
			<div className={clsx("relative p-2")}>
				<Image
					src={`https:${image.fields.file.url}`}
					alt={`${name} logo`}
					unoptimized
					width={image.fields.file.details.image?.width}
					height={image.fields.file.details.image?.height}
					loading="lazy"
				/>
			</div>
		</ConditionalWrapper>
	);
}
