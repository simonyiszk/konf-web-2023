import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense } from "react";
import { TextureLoader } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { Layout } from "@/components/layout/Layout";

function Scene() {
	const gltf = useLoader(GLTFLoader, "assets/3d/baked.gltf");
	const tex = useLoader(TextureLoader, "assets/3d/baked.png");
	return (
		<mesh>
			<primitive object={gltf.scene} scale={3} position={[0, 0, -17]} />
			<meshPhysicalMaterial emissive="white" emissiveIntensity={10} />
		</mesh>
	);
}

export default function Page3D() {
	return (
		<Layout>
			<Canvas style={{ width: "100vw", height: "100vh" }}>
				<Suspense fallback={null}>
					<Scene />
					<OrbitControls />
					{/* <Environment preset="sunset" background /> */}
				</Suspense>
			</Canvas>
		</Layout>
	);
}
