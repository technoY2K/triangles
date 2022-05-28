import { type MeshProps, Canvas, useFrame } from "@react-three/fiber";

type ShapeProps = MeshProps & {
    meshColor: string;
};

const Box = (props: ShapeProps) => {
    const { meshColor, ...p } = props;
    return (
        <mesh {...p} scale={1.5}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={meshColor} />
        </mesh>
    );
};

const Sphere = (props: ShapeProps) => {
    const { meshColor, ...p } = props;
    return (
        <mesh {...p} scale={1.5}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshPhongMaterial color={meshColor} shininess={150} />
        </mesh>
    );
};

export default function Index() {
    return (
        <section className="h-screen w-full mt-8 flex flex-col justify-start">
            <div className="bg-[#44475a] w-full h-5/6">
                <Canvas>
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <Box position={[-1, 0.2, 2]} meshColor="red" />
                    <Sphere position={[2, 1, 0]} meshColor="blue" />
                </Canvas>
            </div>
        </section>
    );
}
