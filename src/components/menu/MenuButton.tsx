import { motion, SVGMotionProps, Transition } from "framer-motion";

type MenuButtonProps = {
	isOpen?: boolean;
	color?: string;
	strokeWidth?: string | number;
	transition?: Transition;
	lineProps?: SVGMotionProps<SVGLineElement>;
} & SVGMotionProps<SVGSVGElement>;

export function MenuButton({
	isOpen = false,
	width = 24,
	height = 14,
	strokeWidth = 2,
	color = "#ffffff",
	transition = undefined,
	lineProps = undefined,
	...props
}: MenuButtonProps) {
	const variant = isOpen ? "opened" : "closed";
	const top = {
		closed: {
			rotate: 0,
			translateY: 0,
		},
		opened: {
			rotate: -45,
			translateY: 2,
			translateX: 0,
		},
	};
	const center = {
		closed: {
			opacity: 1,
			translateX: 0,
		},
		opened: {
			opacity: 0,
			translateX: 3,
		},
	};
	const bottom = {
		closed: {
			rotate: 0,
			translateY: 0,
		},
		opened: {
			rotate: 45,
			translateY: -2,
			translateX: 0,
		},
	};
	const extendedLineProps = {
		stroke: color,
		strokeWidth: strokeWidth as number,
		vectorEffect: "non-scaling-stroke",
		initial: "closed",
		animate: variant,
		transition,
		...lineProps,
	};
	const unitHeight = 4;
	const unitWidth = (unitHeight * (width as number)) / (height as number);

	return (
		<motion.svg
			viewBox={`0 0 ${unitWidth} ${unitHeight}`}
			overflow="visible"
			preserveAspectRatio="none"
			width={width}
			height={height}
			{...props}
		>
			<motion.line
				x1="0"
				x2={unitWidth}
				y1="0"
				y2="0"
				variants={top}
				{...extendedLineProps}
			/>
			<motion.line
				x1="0"
				x2={unitWidth}
				y1="2"
				y2="2"
				variants={center}
				{...extendedLineProps}
			/>
			<motion.line
				x1="0"
				x2={unitWidth}
				y1="4"
				y2="4"
				variants={bottom}
				{...extendedLineProps}
			/>
		</motion.svg>
	);
}
