import type { DetailedHTMLProps, HTMLAttributes } from "react";

export const components = {
	p: (
		props: DetailedHTMLProps<
			HTMLAttributes<HTMLParagraphElement>,
			HTMLParagraphElement
		>,
	) => <p className="text-lg" {...props} />,
	code: (
		props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
	) => (
		<code
			className="rounded bg-slate-900 px-1 text-lg text-gray-300"
			{...props}
		/>
	),
	h1: (
		props: DetailedHTMLProps<
			HTMLAttributes<HTMLHeadingElement>,
			HTMLHeadingElement
		>,
	) => (
		<h1 className="text-xl font-semibold" {...props}>
			{props.children}
		</h1>
	),
};
