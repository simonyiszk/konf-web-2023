import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

type DownArrowButtonProps = {
	size?: 60 | 48 | 24;
	hasBG?: boolean;
} & React.ComponentProps<typeof Link>;

export function DownArrowButton({
	href,
	size = 60,
	className,
	hasBG,
	...restProps
}: DownArrowButtonProps) {
	return (
		<Link
			href={href}
			className={clsx(
				className,
				size === 60 && "h-[60px] w-[60px] rounded-[16px]",
				size === 48 && "h-12 w-12 rounded-[16px]",
				size === 24 && "h-6 w-6 rounded-[6px]",
				hasBG &&
					"bg-gradient-to-r from-konf-primary-blue to-konf-primary-green",
				`relative aspect-1 overflow-hidden  p-[3px]`,
			)}
			{...restProps}
		>
			<div
				className={clsx(
					(size === 60 || size === 48) && "rounded-[13px]",
					size === 24 && "rounded-[3px]",
					hasBG && "bg-konf-overlay-blue",
					"h-full w-full",
				)}
			>
				<Image
					alt="down arrow"
					src="/assets/icon/downArrow.svg"
					draggable={false}
					fill
					className={clsx(
						size === 60 && "p-3",
						size === 48 && "p-2",
						size === 24 && "p-1",
						"h-full w-full select-none",
						"transition-all duration-300 ease-in-out hover:translate-y-1",
					)}
				/>
			</div>
		</Link>
	);
}
