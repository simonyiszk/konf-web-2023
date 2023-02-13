import { useRouter } from "next/router";

export function Header() {
	const router = useRouter();
	const { locale } = router;

	return (
		<div className="absolute top-2 right-2 z-30 sm:top-4 sm:right-4">
			<button
				type="button"
				className="p-2 hover:underline hover:opacity-75"
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
				{locale === "en" ? "HU" : "EN"}
			</button>
		</div>
	);
}
