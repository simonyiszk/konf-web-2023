import { memo, SVGProps } from "react";

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 40 40"
			{...props}
		>
			<path
				d="M20 14.583a5.417 5.417 0 1 0 0 10.834 5.417 5.417 0 0 0 0-10.834Z"
				fill="#fff"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M11.283 5.136a79.118 79.118 0 0 1 17.434 0c3.165.353 5.717 2.846 6.088 6.021a76.112 76.112 0 0 1 0 17.685c-.371 3.176-2.924 5.669-6.087 6.022a79.118 79.118 0 0 1-17.435 0c-3.164-.353-5.716-2.846-6.088-6.021a76.12 76.12 0 0 1 0-17.686c.372-3.175 2.924-5.668 6.088-6.021ZM28.333 10a1.667 1.667 0 1 0 0 3.333 1.667 1.667 0 0 0 0-3.333Zm-16.25 10a7.917 7.917 0 1 1 15.834 0 7.917 7.917 0 0 1-15.834 0Z"
				fill="#fff"
			/>
		</svg>
	);
}

export const InstagramIconMemo = memo(InstagramIcon);
