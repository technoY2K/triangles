import { useRef } from "react";
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { type MeshProps, Canvas, useFrame } from "@react-three/fiber";
import provider from "~/web3/provider";
import { type Block } from "@ethersproject/abstract-provider";

export const loader: LoaderFunction = async () => {
    const latestBlockNumber = await provider.getBlockNumber();
    const block = await provider.getBlock(latestBlockNumber);

    return json(block);
};

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

export default function Index() {
    const block = useLoaderData<Block>();

    return (
        <section className="h-[91vh]">
            <div className="bg-[#44475a] h-5/6">
                <Canvas>
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <Box position={[0, 0.2, 2]} meshColor="red" />
                </Canvas>
            </div>
        </section>
    );
}

export function ErrorBoundary({ error }: { error: Error }) {
    return <div className="text-white text-3xl">Oops an error has occured</div>;
}
