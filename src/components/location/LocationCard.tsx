import clsx from "clsx";
import { useTranslation } from "next-i18next";
import { FaWaze } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";

const mapLinks = {
	google: "https://goo.gl/maps/dkXw1AjgX351WY4J6",
	waze: "https://ul.waze.com/ul?preview_venue_id=12517851.124916363.422156&navigate=yes",
};

export function LocationCard() {
	const { t } = useTranslation("common");
	return (
		<section className="grid gap-12 bg-white/10 px-4 py-8 md:grid-cols-3 md:px-12">
			<div className="order-2 flex flex-col justify-center gap-4 md:order-1">
				<h1
					className={clsx(
						"text-4xl font-black lg:text-5xl",
						"bg-gradient-to-r bg-clip-text text-transparent",
						"from-konf-primary-blue to-konf-primary-green",
						"animate-text",
						"text-center",
					)}
				>
					{t("location.title")}
				</h1>
				<address className="block text-center text-xl not-italic lg:text-2xl">
					<span className="block">{t("location.items.building")}</span>
					<span className="block">Budapest 1117</span>
					<span className="block">Magyar Tudósok Körútja 2.</span>
					<span className="block">{t("location.items.address")}</span>
				</address>
				<div className="flex flex-row justify-center gap-4">
					<a
						className="transition duration-200 hover:text-[#05c8f7]"
						href={mapLinks.waze}
						target="_blank"
						rel="noreferrer"
					>
						<FaWaze className="text-5xl" />
					</a>
					<a
						href={mapLinks.google}
						target="_blank"
						rel="noreferrer"
						className="transition duration-200 hover:text-konf-accent-yellow"
					>
						<SiGooglemaps className="text-5xl" />
					</a>
				</div>
			</div>
			<div className="order-1 h-full min-h-[300px] md:order-2 md:col-span-2 md:min-h-0 lg:aspect-2">
				<iframe
					title="Térkép"
					src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1348.437074543208!2d19.060099308679057!3d47.47288184641483!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741ddabb29bd997%3A0x4b453205e2d0f96b!2zQk1FIEkgw6lww7xsZXQ!5e0!3m2!1shu!2shu!4v1650888578884!5m2!1shu!2shu"
					className="h-full w-full rounded"
					allowFullScreen={false}
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
				/>
			</div>
		</section>
	);
}
