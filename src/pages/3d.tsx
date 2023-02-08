import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import { Scene, ThreeBlobs } from "@/components/layout/decorations/ThreeDee";
import { Layout } from "@/components/layout/Layout";

export default function Page3D() {
	return (
		<Layout>
			<Scene />
		</Layout>
	);
}
