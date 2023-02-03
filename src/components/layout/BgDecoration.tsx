import Image from "next/image";
import type { CSSProperties } from "react";

type BgElementProps = {
	img: "blue" | "green";
	rotate: number;
	dimensions: {
		width: number;
		height: number;
	};
	style: CSSProperties;
};

function BgElement({
	img = "blue",
	dimensions,
	rotate,
	style,
}: BgElementProps) {
	return (
		<div
			className="pointer-events-none absolute select-none overflow-hidden"
			style={style}
		>
			<Image
				alt="-"
				src={`/assets/bg/${img}1.png`}
				height={dimensions.height}
				width={dimensions.width}
				style={{
					rotate: `${rotate}deg`,
				}}
				unoptimized
				unselectable="on"
				draggable={false}
				loading="eager"
				className="object-cover"
			/>
		</div>
	);
}

export function BgDecoration() {
	return (
		<div className="container -z-10 mx-auto">
			<BgElement
				img="blue"
				dimensions={{
					height: 1000,
					width: 1000,
				}}
				rotate={45}
				style={{
					left: "-500px",
					top: "-100px",
				}}
			/>

			<BgElement
				img="green"
				dimensions={{
					height: 1200,
					width: 1200,
				}}
				rotate={-45}
				style={{
					right: "-600px",
					top: "0px",
				}}
			/>

			<BgElement
				img="blue"
				dimensions={{
					width: 400,
					height: 400,
				}}
				rotate={45}
				style={{
					left: "170px",
					top: "100px",
				}}
			/>

			<BgElement
				img="green"
				dimensions={{
					width: 400,
					height: 400,
				}}
				rotate={0}
				style={{
					left: "100px",
					top: "400px",
				}}
			/>

			<BgElement
				img="green"
				dimensions={{
					width: 600,
					height: 600,
				}}
				rotate={66}
				style={{
					right: "200px",
					top: "0px",
				}}
			/>

			<BgElement
				img="blue"
				dimensions={{
					width: 400,
					height: 400,
				}}
				rotate={0}
				style={{
					right: "500px",
					top: "350px",
				}}
			/>
		</div>
	);
}
