import clsx from "clsx";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";

type MenuProps = {
	isOpen?: boolean;
	closeFn?: () => void;
};

export function Menu({ isOpen, closeFn }: MenuProps) {
	const variant = isOpen ? "opened" : "closed";
	const container = {
		closed: {
			// Opacity is not working with backdrop-blur >:(
			// opacity: 0,
			translateY: "-100%",
		},
		opened: {
			// opacity: 1,
			translateY: "0%",
		},
	};
	return (
		<>
			<div
				className={clsx(
					isOpen ? "block" : "hidden",
					"fixed inset-0 h-full w-full bg-konf-overlay-blue/10 backdrop-blur-sm",
				)}
			>
				{/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
				<button className="h-full w-full" type="button" onClick={closeFn} />
			</div>
			<motion.div
				variants={container}
				animate={variant}
				className="fixed inset-x-0 top-0 z-10 flex w-full px-3 text-left sm:hidden"
			>
				<div className="relative z-20 w-full rounded-b-lg border border-gray-400/10 bg-konf-overlay-blue/70 p-4 pt-14 backdrop-blur-md">
					<p className="mb-4 text-3xl font-medium">
						Tekintsd meg korábbi konferenciáinkat:
					</p>
					<ul className="mx-8 flex flex-row justify-between gap-4 text-lg">
						<li className="w-full hover:opacity-75">
							<Link
								href="/2022"
								className="flex flex-col whitespace-nowrap text-center"
							>
								<span className="relative mb-2 inline-block h-16">
									<Image
										src="/assets/logo/xix.svg"
										fill
										alt="XIX. Simonyi Konferencia logó"
									/>
								</span>
								<span>
									2022
									<FiExternalLink className="ml-1 inline-block pb-1" />
								</span>
							</Link>
						</li>
						<li className="w-full self-end hover:opacity-75">
							<Link href="/2021">
								<span className="flex flex-col items-end">
									<span className="relative mb-2 inline-block h-16 w-16">
										<Image
											src="/assets/logo/18.svg"
											fill
											alt="18 Simonyi Konferencia logó"
										/>
									</span>
									<span>
										2021
										<FiExternalLink className="ml-1 inline-block pb-1" />
									</span>
								</span>
							</Link>
						</li>
					</ul>
					<hr className="blue-green-gradient m-4 mb-6 h-[2px] border-0" />
					<ul className=" flex flex-col justify-center gap-4">
						<li className="mb-2 flex justify-center hover:opacity-75">
							<a
								href="https://vik.bme.hu"
								className="relative inline-block h-14 w-14"
							>
								<Image src="/assets/logo/vik.svg" fill alt="BME VIK logó" />
							</a>
						</li>
						<li className="mb-2 flex justify-center hover:opacity-75">
							<a
								href="https://simonyi.bme.hu"
								className="relative inline-block h-10 w-48"
							>
								<Image
									src="/assets/logo/simonyi.svg"
									fill
									alt="Simonyi károly szakkollégium logó"
								/>
							</a>
						</li>
						<li className="mb-2 flex flex-col text-center text-sm font-light">
							<p className="mx-8 mb-2 mt-4">
								<span className="inline-block">az arculati elemeket</span>{" "}
								<span className="inline-block">
									és a weboldalt készítette:{" "}
								</span>
							</p>
							<a
								href="https://schdesign.hu"
								className="relative inline-block h-8 text-white hover:opacity-75"
							>
								<Image
									src="/assets/logo/schdesign.svg"
									fill
									alt="schdesign logó"
								/>
							</a>
						</li>
					</ul>
				</div>
			</motion.div>
		</>
	);
}
