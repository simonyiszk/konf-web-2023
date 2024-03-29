import { memo, SVGProps } from "react";

function EmailIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 32 26"
			{...props}
		>
			<path
				d="M8.149 1.18a90.66 90.66 0 0 1 15.702 0l2.518.218a4.814 4.814 0 0 1 3.854 2.575.393.393 0 0 1-.152.513L19.628 10.95a7.083 7.083 0 0 1-7.332.075L1.783 4.814a.393.393 0 0 1-.171-.489 4.815 4.815 0 0 1 4.02-2.927l2.517-.219Z"
				fill="#fff"
			/>
			<path
				d="M1.603 7.612a.413.413 0 0 0-.622.312 50.585 50.585 0 0 0 .307 12.598 4.813 4.813 0 0 0 4.344 4.08l2.517.219a90.67 90.67 0 0 0 15.702 0l2.518-.22a4.813 4.813 0 0 0 4.343-4.079c.646-4.295.735-8.652.268-12.965a.413.413 0 0 0-.628-.304l-9.408 5.823a9.583 9.583 0 0 1-9.92.103l-9.42-5.567Z"
				fill="#fff"
			/>
		</svg>
	);
}

export const EmailIconMemo = memo(EmailIcon);
