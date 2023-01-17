import "@/styles/global.scss";

import type { AppProps } from "next/app";
import Script from "next/script";
import { appWithTranslation } from "next-i18next";
import React from "react";

import { TRACKING_ID } from "@/utils/track";

function KonfApp({ Component, pageProps }: AppProps) {
	return (
		<React.StrictMode>
			{/* Umami analytics */}
			<Script
				async
				defer
				data-website-id={TRACKING_ID}
				src="https://succ.andrisborbas.com/succ.js"
				// data-auto-track="false"
			/>

			{/* Purge old Gatsby service worker */}
			<Script
				id="YeetGatsby"
				dangerouslySetInnerHTML={{
					__html: `if(window.navigator && navigator.serviceWorker){navigator.serviceWorker.getRegistrations().then(function(registrations){for(let registration of registrations){registration.unregister();}});}`,
				}}
			/>
			<Component {...pageProps} />
		</React.StrictMode>
	);
}
export default appWithTranslation(KonfApp);
