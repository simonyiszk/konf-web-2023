import type { DetailedHTMLProps, HTMLAttributes } from "react";

export const components = {
	p: (
		props: DetailedHTMLProps<
			HTMLAttributes<HTMLParagraphElement>,
			HTMLParagraphElement
		>,
	) => <p className="text-base" {...props} />,
	code: (
		props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
	) => (
		<code
			className="rounded bg-slate-900 px-1 text-base text-gray-300"
			{...props}
		/>
	),
	h1: (
		props: DetailedHTMLProps<
			HTMLAttributes<HTMLHeadingElement>,
			HTMLHeadingElement
		>,
	) => (
		<h1 className="text-lg font-semibold" {...props}>
			{props.children}
		</h1>
	),
	ul: (
		props: DetailedHTMLProps<
			HTMLAttributes<HTMLUListElement>,
			HTMLUListElement
		>,
	) => <ul className="list-inside list-disc" {...props} />,
};
