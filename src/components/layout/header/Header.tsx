import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { FiExternalLink } from "react-icons/fi";

import { MenuButton } from "@/components/menu/MenuButton";
import { useBool, useWindowSize } from "@/utils/hooks";

// const routeSwitcher = {
// 	presentations: "eloadasok",
// 	eloadasok: "presentations",
// 	contact: "kapcsolat",
// 	kapcsolat: "contact",
// };

// const localeSwitcher = (current: string) => {
// 	const found = Object.entries(routeSwitcher).find((v) =>
// 		current.includes(v[0]),
// 	);
// 	if (found) {
// 		return current.replace(found[0], found[1]);
// 	}
// 	if (process.env.VERCEL_ENV !== "production") {
// 		// eslint-disable-next-line no-console
// 		console.warn("No route found for", current);
// 	}
// 	return current;
// };

export function Header() {
	const { t, i18n } = useTranslation("common");
	const router = useRouter();

	const [isMenuOpen, setMenuOpen] = useBool(false);

	const size = useWindowSize();

	useEffect(() => {
		if (size.width) {
			if (size.width >= 1024 && !isMenuOpen) {
				setMenuOpen.setTrue();
			}
			if (size.width < 1024 && isMenuOpen) {
				setMenuOpen.setFalse();
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [size, size.width]);

	return (
		<header className="fixed top-2 z-30 mx-auto flex w-full items-center px-2">
			<div className="backdrop-blur-safari flex w-full flex-col justify-between rounded-lg bg-black/20 px-3 py-2 backdrop-blur lg:flex-row">
				<div className="mx-auto flex w-full flex-row items-center justify-between">
					<div className="flex w-full items-center justify-between gap-8">
						<Link
							className="p-1"
							href="/"
							scroll={router.pathname !== "/"}
							onClick={() => {
								if (router.pathname === "/") {
									document
										.getElementById("app")
										?.scrollIntoView({ behavior: "smooth" });
								}
							}}
						>
							<div className="relative block h-7 w-16">
								<Image
									src="/favicon.svg"
									alt="XX. Simonyi Konferencia logó"
									fill
								/>
							</div>
						</Link>
						<div className="z-40 lg:hidden">
							<button
								type="button"
								className="z-40 p-2 hover:opacity-75"
								onClick={setMenuOpen.toggle}
								aria-label="Menü megnyitása"
							>
								<MenuButton isOpen={isMenuOpen} className="m-2" />
							</button>
						</div>
					</div>
				</div>
				<motion.nav
					className="flex w-full flex-col lg:flex lg:flex-row lg:justify-end lg:gap-4 lg:opacity-100"
					variants={{
						open: {
							opacity: 1,
							y: 0,
							display: "flex",
							transition: { staggerChildren: 0.077 },
							height: "auto",
						},
						closed: {
							opacity: 0,
							y: -20,
							display: "flex",
							transition: { staggerChildren: 0.02, staggerDirection: -1 },
							height: 0,
							transitionEnd: { display: "none" },
						},
					}}
					defaultValue={(size.width ?? 1100) >= 1024 ? "open" : "closed"}
					initial={(size.width ?? 0) >= 1024 ? "open" : "closed"}
					animate={isMenuOpen ? "open" : "closed"}
				>
					<motion.div
						variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
						className="py-2 pl-1 pr-4"
					>
						<Link
							href={i18n.language === "hu" ? "/eloadasok" : "/presentations"}
							className="text-xl font-semibold hover:text-konf-accent-yellow active:text-konf-accent-yellow"
						>
							{t("presentations.title")}
						</Link>
					</motion.div>
					<motion.div
						variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
						className="py-2 pl-1 pr-4"
					>
						<Link
							href="/workshopok"
							className="text-xl font-semibold hover:text-konf-accent-yellow active:text-konf-accent-yellow"
						>
							{t("workshop.title")}
						</Link>
					</motion.div>
					<motion.div
						variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
						className="py-2 pl-1 pr-4"
					>
						<Link
							href="/kapcsolat"
							className="text-xl font-semibold hover:text-konf-accent-yellow active:text-konf-accent-yellow"
						>
							{t("contact.title")}
						</Link>
					</motion.div>
					<motion.div
						variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
						className="py-2 pl-1 pr-4"
					>
						<Link
							href="/nyeremenyjatek"
							className="text-xl font-semibold hover:text-konf-accent-yellow active:text-konf-accent-yellow"
							scroll={router.pathname !== "/"}
						>
							{t("raffle.title")}
						</Link>
					</motion.div>
					<motion.div
						variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
						className="py-2 pl-1 pr-4"
					>
						<Link
							href="/golya"
							target="_blank"
							className="group flex flex-row gap-1 text-xl font-semibold hover:text-konf-accent-yellow active:text-konf-accent-yellow"
							scroll={router.pathname !== "/"}
						>
							<span className="inline">{t("golya.title")}</span>
							<span>
								<FiExternalLink className="inline pb-1 text-white group-hover:text-konf-accent-yellow" />
							</span>
						</Link>
					</motion.div>
				</motion.nav>
			</div>
		</header>
	);
}
