import { Effects, OrbitControls } from "@react-three/drei";
import {
	Canvas,
	extend,
	GroupProps,
	ObjectMap,
	useLoader,
} from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";
import { Group, Mesh, TextureLoader } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { UnrealBloomPass } from "three-stdlib";

extend({ UnrealBloomPass });

type ThreeBlobProps = {
	object: GLTF & ObjectMap;
} & GroupProps;

/* eslint-disable react/no-unknown-property */

function ThreeBlob({ object, position, scale, ...restProps }: ThreeBlobProps) {
	const ref = useRef<Mesh>(null);
	// console.log(position);
	// console.log(object.nodes.Projection1);

	// const [geometry] = useState(() => new THREE.SphereGeometry(1, 32, 32), []);

	// useFrame((state) => {
	// 	ref.current.position.x =
	// 		position.x + Math.sin((state.clock.getElapsedTime() * scale.x) / 2);
	// 	ref.current.position.y =
	// 		position.y + Math.sin((state.clock.getElapsedTime() * scale.x) / 2);
	// 	ref.current.position.z =
	// 		position.z + Math.sin((state.clock.getElapsedTime() * scale.x) / 2);
	// });

	return (
		<mesh
			// @ts-expect-error: asd
			ref={ref}
			// @ts-expect-error: asd
			geometry={object.nodes.Projection1.geometry}
			position={position}
			scale={scale}
			{...restProps}
		>
			<meshBasicMaterial color={[0.5, 1, 4]} toneMapped={false} />
		</mesh>
	);
}

export function ThreeBlobs({ ...restProps }) {
	const ref = useRef<Group>(null);
	const model = useLoader(GLTFLoader, "assets/3d/baked.gltf");
	const tex = useLoader(TextureLoader, "assets/3d/baked.png");
	return (
		<group ref={ref} {...restProps}>
			<ThreeBlob object={model} position={[4, 0, 4]} scale={3} />
			<ThreeBlob object={model} position={[0, 0, 3]} scale={2} />
			<ThreeBlob object={model} position={[10, 0, 5]} scale={4} />
			{/* <ThreeBlob object={model} position={[0, 0, -20]} scale={3} /> */}
		</group>
	);
}
// @ts-expect-error: asd
function Shape({ children, color, ...props }) {
	return (
		<mesh {...props}>
			{children}
			{/* Now, in order to get selective bloom we simply crank colors out of
        their natural spectrum. Where colors are normally defined between 0 - 1 we push them
        way out of range, into a higher defintion (HDR). What previously was [1, 1, 1] now could
        for instance be [10, 10, 10]. This requires that toneMapping is off, or it clamps to 1 */}
			<meshBasicMaterial color={color} toneMapped={false} />
		</mesh>
	);
}

export function Scene() {
	const { threshold, intensity, radius } = useControls({
		threshold: { value: 1, min: 0, max: 1, step: 0.1 },
		intensity: { value: 1, min: 0, max: 10, step: 0.1 },
		radius: { value: 1, min: 0, max: 10, step: 0.1 },
	});
	return (
		<Canvas style={{ width: "100vw", height: "100vh" }}>
			<Effects disableGamma>
				{/* threshhold has to be 1, so nothing at all gets bloom by default */}
				{/* @ts-expect-error: asd */}
				<unrealBloomPass
					threshold={threshold}
					strength={intensity}
					radius={radius}
				/>
			</Effects>
			<Shape color={[4, 0.1, 1]} position={[-2, 0, 0]}>
				<planeGeometry args={[1.5, 1.5]} />
			</Shape>
			<Shape
				color={[0.5, 1, 4]}
				position={[0, -0.25, 0]}
				rotation={[0, 0, Math.PI / 2]}
			>
				<circleGeometry args={[1, 1]} />
			</Shape>
			<Shape color={[1, 4, 0.5]} position={[2, 0, 0]}>
				<circleGeometry args={[0.8, 64]} />
			</Shape>
			<ThreeBlobs />
			<OrbitControls />
		</Canvas>
	);
}

/* eslint-enable */
