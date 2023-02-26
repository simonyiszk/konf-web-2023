import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export function Header() {
	const router = useRouter();
	const { t, i18n } = useTranslation("common");
	const { locale } = router;

	return (
		<header className="sticky top-0 z-20 mx-auto -mb-14 w-full max-w-6xl rounded-lg bg-white/10 py-2 px-5 backdrop-blur">
			<div className="container mx-auto flex w-full flex-row items-center justify-between">
				<nav className="relative flex gap-8">
					<Link className="relative block h-7 w-16" href="/">
						<Image src="/favicon.svg" alt="XX. Simonyi Konferencia logó" fill />
					</Link>
					<Link
						href={i18n.language === "hu" ? "/eloadasok" : "/presentations"}
						className="text-xl font-semibold hover:text-konf-accent-yellow active:text-konf-accent-yellow"
					>
						{t("presentations.title")}
					</Link>
					<Link
						href="/kapcsolat"
						className="text-xl font-semibold hover:text-konf-accent-yellow active:text-konf-accent-yellow"
					>
						{t("contact.title")}
					</Link>
					<Link
						href="/nyeremenyjatek"
						className="text-xl font-semibold hover:text-konf-accent-yellow active:text-konf-accent-yellow"
					>
						{t("raffle.title")}
					</Link>
				</nav>
				<div>
					<button
						type="button"
						className="group p-2"
						onClick={() => {
							const path = router.asPath;
							if (locale === "en") {
								router.push(path, path.replace("presentations", "eloadasok"), {
									locale: "hu",
								});
							} else {
								router.push(path, path.replace("eloadasok", "presentations"), {
									locale: "en",
								});
							}
						}}
						aria-label="Nyelv váltása"
					>
						<span
							className={clsx(
								locale === "hu" && "text-konf-accent-yellow",
								locale === "hu" &&
									"group-hover:text-white group-hover:opacity-60",
								locale !== "hu" && "group-hover:text-konf-accent-yellow",
							)}
						>
							HU
						</span>{" "}
						|{" "}
						<span
							className={clsx(
								locale === "en" && "text-konf-accent-yellow",
								locale === "en" &&
									"group-hover:text-white group-hover:opacity-60",
								locale !== "en" && "group-hover:text-konf-accent-yellow",
							)}
						>
							EN
						</span>
					</button>
				</div>
			</div>
		</header>
	);
}
