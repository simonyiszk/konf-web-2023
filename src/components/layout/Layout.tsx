import clsx from "clsx";
import { motion } from "framer-motion";
import * as React from "react";

import { Footer } from "./footer/Footer";
import { Header } from "./header/Header";

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
			<Header />

			{/* @ts-expect-error: Framer Motion types */}
			<motion.main
				id="#"
				className={clsx(className, "relative z-10 w-full overflow-x-hidden")}
				{...restProps}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.25 }}
			>
				{children}
			</motion.main>

			<Footer fill="pattern" buildDate={buildDate} />
		</div>
	);
}
