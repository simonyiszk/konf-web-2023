import clsx from "clsx";
import * as React from "react";

type LayoutProps = {
	buildDate?: number;
} & React.HTMLAttributes<HTMLDivElement>;

export function Layout({
	buildDate,
	className,
	children,
	...restProps
}: LayoutProps) {
	return (
		<div
			id="app"
			className="dark flex min-h-screen w-full flex-col justify-between overflow-x-hidden"
		>
			{/* <Navbar /> */}

			<main id="#" className={clsx(className, "w-full")} {...restProps}>
				{children}
			</main>

			{/* <Footer /> */}
		</div>
	);
}
