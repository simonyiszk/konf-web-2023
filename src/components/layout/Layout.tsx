import clsx from "clsx";
import * as React from "react";

import { Footer } from "../footer/Footer";

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
			className="bg-gradient dark flex min-h-screen w-full flex-col justify-between overflow-x-hidden font-mona"
		>
			{/* <Navbar /> */}

			<main
				id="#"
				className={clsx(className, "relative z-10 w-full overflow-x-hidden")}
				{...restProps}
			>
				{children}
			</main>

			<Footer fill="pattern" buildDate={buildDate} />
		</div>
	);
}
