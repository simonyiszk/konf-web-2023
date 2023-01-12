import "@/styles/global.scss";

import type { AppProps } from "next/app";
import Script from "next/script";
import React from "react";

export default function KonfApp({ Component, pageProps }: AppProps) {
	return (
		<React.StrictMode>
			<Script
				id="YeetGatsby"
				dangerouslySetInnerHTML={{
					__html: `if(window.navigator && navigator.serviceWorker) {
  												navigator.serviceWorker.getRegistrations()
  												.then(function(registrations) {
    												for(let registration of registrations) {
      												registration.unregister();
    											}
  										});
											}`,
				}}
			/>
			<Component {...pageProps} />
		</React.StrictMode>
	);
}
