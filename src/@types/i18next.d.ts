import "i18next";

import type hu from "../../public/locales/hu/common.json";

declare module "i18next" {
	interface CustomTypeOptions {
		defaultNS: "common";
		resources: {
			common: typeof hu;
		};
	}
}
