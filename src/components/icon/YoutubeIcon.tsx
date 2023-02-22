import { memo, SVGProps } from "react";

function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 40 40"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M11.648 8.15a107.08 107.08 0 0 1 16.704 0l3.735.293a4.542 4.542 0 0 1 4.125 3.78c.86 5.149.86 10.405 0 15.554a4.542 4.542 0 0 1-4.126 3.78l-3.734.292c-5.56.435-11.144.435-16.704 0l-3.734-.292a4.542 4.542 0 0 1-4.126-3.78 47.192 47.192 0 0 1 0-15.554 4.542 4.542 0 0 1 4.126-3.78l3.734-.292Zm5.019 15.967v-8.234a.5.5 0 0 1 .757-.429l6.861 4.117a.5.5 0 0 1 0 .858l-6.861 4.117a.5.5 0 0 1-.757-.429Z"
				fill="#fff"
			/>
		</svg>
	);
}

export const YoutubeIconMemo = memo(YoutubeIcon);
