import clsx from "clsx";

type LayoutContentProps = {
	children: React.ReactNode;
	maxWidth?: "max-w-6xl" | "max-w-7xl" | "max-w-8xl";
};

export function LayoutContent({
	children,
	maxWidth = "max-w-6xl",
}: LayoutContentProps) {
	return (
		<div className={clsx("mx-auto my-16 px-4 md:my-32", maxWidth)}>
			{children}
		</div>
	);
}
