import clsx from "clsx";
import React from "react";

// https://stackoverflow.com/a/43235785
export type HighlightedProps = {
	text: string;
	highlight: string;
	className?: string;
	wrapper?: React.ElementType;
};

export function Highlighted({
	text = "",
	highlight = "",
	className = "",
	wrapper,
}: HighlightedProps) {
	if (!highlight.trim()) {
		return <span>{text}</span>;
	}
	const parts = text.split(new RegExp(`(${highlight})`, "gi"));
	return (
		<span>
			{" "}
			{parts.map((part, i) => {
				const isMatched = part.toLowerCase() === highlight.toLowerCase();
				const content = (
					<span
						// eslint-disable-next-line react/no-array-index-key
						key={i}
						className={clsx(isMatched && className)}
					>
						{part}
					</span>
				);

				if (isMatched && wrapper) {
					return React.createElement(
						wrapper,
						{
							// eslint-disable-next-line react/no-array-index-key
							key: i,
						},
						content,
					);
				}

				return content;
			})}{" "}
		</span>
	);
}
