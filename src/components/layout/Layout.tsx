import clsx from "clsx";
import { motion } from "framer-motion";
import * as React from "react";

import { Footer } from "./footer/Footer";
import { Header } from "./header/Header";

type LayoutProps = {
	buildDate?: number;
	hero?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export function Layout({
	buildDate,
	className,
	hero,
	children,
	...restProps
}: LayoutProps) {
	return (
		<div
			id="app"
			className="bg-gradient dark flex flex-col justify-between overflow-x-hidden font-mona"
		>
			<Header />

			{hero}

			{/* @ts-expect-error: Framer Motion types */}
			<motion.main
				id="#"
				className={clsx(className, "relative")}
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
