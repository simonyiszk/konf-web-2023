import clsx from "clsx";
import Link from "next/link";

type TextButtonProps = {
	size?: 60 | 48 | 24;
	text: React.ReactNode;
	fullWidth?: boolean;
} & React.ComponentProps<typeof Link>;

export function TextButton({
	href,
	size = 60,
	className,
	text,
	fullWidth = false,
	...restProps
}: TextButtonProps) {
	const isExternalLink =
		typeof href === "string"
			? href.startsWith("http")
			: href.href?.startsWith("http");
	return (
		<Link
			href={href}
			className={clsx(
				className,
				size === 60 && "rounded-[16px]",
				size === 48 && "rounded-[12px]",
				size === 24 && "rounded-[6px]",
				fullWidth ? "w-full" : "w-fit",
				`group relative block overflow-hidden bg-gradient-to-r from-konf-primary-blue to-konf-primary-green p-[3px] text-center`,
			)}
			target={isExternalLink ? "_blank" : undefined}
			{...restProps}
		>
			<div
				className={clsx(
					size === 60 && "rounded-[13px] text-2xl",
					size === 48 && "rounded-[9px] text-xl",
					size === 24 && "rounded-[3px] text-base",
					"h-full w-full bg-konf-overlay-blue p-3 hover:bg-transparent group-hover:bg-transparent",
				)}
			>
				<p className="blue-green-gradient gradient-on-text group-hover:no-gradient-on-text inline-block w-full bg-clip-text font-bold group-hover:text-konf-overlay-blue">
					{text}
				</p>
			</div>
		</Link>
	);
}
