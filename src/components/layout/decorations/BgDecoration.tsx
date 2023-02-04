import clsx from "clsx";
import Image from "next/image";
import type { CSSProperties } from "react";

import styles from "./BgDecoration.module.scss";

type BgElementProps = {
	img: "blue" | "green";
	rotate: number;
	dimensions: {
		width: number;
		height: number;
	};
} & React.HTMLAttributes<HTMLDivElement>;

function BgElement({
	img = "blue",
	dimensions,
	rotate,
	style,
	className,
	...restProps
}: BgElementProps) {
	return (
		<div
			style={style}
			className={clsx(
				"pointer-events-none absolute -z-20 select-none overflow-hidden",
				className,
			)}
			{...restProps}
		>
			<Image
				alt=""
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
		<div className="container -z-10 mx-auto overflow-hidden">
			<BgElement
				img="blue"
				dimensions={{
					height: 1000,
					width: 1000,
				}}
				className={styles.animateLeft}
				rotate={45}
				style={
					{
						left: "-500px",
						"--x": "-500px",
						top: "-100px",
						"--y": "-100px",
						animationDelay: "-1.5s",
					} as React.CSSProperties
				}
			/>

			<BgElement
				img="green"
				dimensions={{
					height: 1200,
					width: 1200,
				}}
				className={styles.animateRight}
				rotate={-45}
				style={
					{
						right: "-600px",
						"--x": "-600px",
						top: "0px",
						"--y": "0px",
						animationDelay: "-12.5s",
					} as React.CSSProperties
				}
			/>

			<BgElement
				img="blue"
				dimensions={{
					width: 400,
					height: 400,
				}}
				rotate={45}
				className={styles.animateLeft}
				style={
					{
						left: "170px",
						"--x": "170px",
						top: "100px",
						"--y": "100px",
						animationDelay: "-4.5s",
					} as React.CSSProperties
				}
			/>

			<BgElement
				img="green"
				dimensions={{
					width: 400,
					height: 400,
				}}
				rotate={0}
				className={styles.animateLeft}
				style={
					{
						left: "100px",
						"--x": "100px",
						top: "400px",
						"--y": "400px",
						animationDelay: "-8.5s",
					} as React.CSSProperties
				}
			/>

			<BgElement
				img="green"
				dimensions={{
					width: 600,
					height: 600,
				}}
				rotate={66}
				className={styles.animateRight}
				style={
					{
						right: "200px",
						"--x": "200px",
						top: "0px",
						"--y": "0px",
						animationDelay: "-7.5s",
					} as React.CSSProperties
				}
			/>

			<BgElement
				img="blue"
				dimensions={{
					width: 400,
					height: 400,
				}}
				rotate={0}
				className={styles.animateRight}
				style={
					{
						right: "500px",
						"--x": "500px",
						top: "350px",
						"--y": "350px",
						animationDelay: "-10.5s",
					} as React.CSSProperties
				}
			/>
		</div>
	);
}
