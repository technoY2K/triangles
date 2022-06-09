import { useRef } from "react";
import { type MeshProps, useFrame } from "@react-three/fiber";

type ShapeProps = MeshProps & {
    meshColor: string;
};

const Box = (props: ShapeProps) => {
    const boxMesh = useRef<JSX.IntrinsicElements["mesh"]>();
    useFrame(({ clock }) => {
        if (boxMesh.current) {
            boxMesh.current.rotation.y = clock.elapsedTime * 0.3;
        }
    });

    const { meshColor, ...p } = props;
    return (
        <mesh ref={boxMesh} {...p} scale={1.5}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={meshColor} />
        </mesh>
    );
};

export { Box };
