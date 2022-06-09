import React from "react";
import { Canvas } from "@react-three/fiber";

const Scene = ({ children }: { children: React.ReactNode }) => {
    return (
        <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            {children}
        </Canvas>
    );
};

export default Scene;
