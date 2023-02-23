import { memo, SVGProps } from "react";

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 40 40"
			{...props}
		>
			<path
				d="M23.667 4.792a7.708 7.708 0 0 0-7.709 7.708v4.292h-4.125a.375.375 0 0 0-.375.375v5.666c0 .208.168.375.375.375h4.125v11.625c0 .208.168.375.375.375H22a.375.375 0 0 0 .375-.375V23.208h4.162a.375.375 0 0 0 .363-.284l1.417-5.666a.375.375 0 0 0-.364-.466h-5.578V12.5a1.292 1.292 0 0 1 1.292-1.292H28a.375.375 0 0 0 .375-.375V5.167A.375.375 0 0 0 28 4.792h-4.333Z"
				fill="#fff"
			/>
		</svg>
	);
}

export const FacebookIconMemo = memo(FacebookIcon);
