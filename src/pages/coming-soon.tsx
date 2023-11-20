import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";

export default function ComingSoon() {
	return (
		<>
			<Head>
				<title>Hamarasoan | XXI. Simonyi Konferencia</title>
			</Head>
			<div
				style={{
					backgroundPosition: "center",
					backgroundImage:
						"url(https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
				}}
			>
				<AnimatePresence>
					<motion.div
						initial={{ opacity: 0, y: -40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1.5, ease: "easeOut" }}
						className="flex h-screen"
					>
						<div className="m-auto text-center">
							<p className="mb-4 text-4xl font-normal tracking-[0.2em] lg:text-9xl">
								Hamarosan
							</p>
							<h1 className="text-3xl font-light tracking-widest lg:text-5xl">
								XXI. Simonyi Konferencia
							</h1>
							<h2 className="my-3 text-2xl font-light lg:text-4xl">
								2024. március 19.
							</h2>
						</div>
					</motion.div>
				</AnimatePresence>
			</div>
		</>
	);
}
