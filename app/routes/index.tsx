import { useRef } from "react";
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { type MeshProps, Canvas, useFrame } from "@react-three/fiber";
import provider from "~/web3/provider";
import { type Block } from "@ethersproject/abstract-provider";
import { utils } from "ethers";

import Scene from "~/components/Metaverse/Scene";

type LoaderData = {
    block: Block;
    gas: string;
};

export const loader: LoaderFunction = async () => {
    const latestBlockNumber = await provider.getBlockNumber();
    const block = await provider.getBlock(latestBlockNumber);
    const rawGasPrice = await provider.getGasPrice();
    const gas = utils.formatUnits(rawGasPrice, "gwei");

    const data: LoaderData = {
        block,
        gas,
    };

    return json(data);
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
    const data = useLoaderData<LoaderData>();

    return (
        <section className="h-[91vh] pt-8">
            <div className="mb-4">
                {data ? (
                    <div className="text-white text-lg">
                        <p className="text-2xl text-[#f1fa8c] mb-4">
                            Ethereum Block Stats
                        </p>
                        <p>{`Block Number: ${data.block.number}`}</p>
                        <p>{`Gas Price (Gwei): ${data.gas}`}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div className="bg-[#44475a] h-2/3">
                <Scene>
                    <Box position={[0, 0.2, 2]} meshColor="#bd93f9" />
                </Scene>
            </div>
        </section>
    );
}

export function ErrorBoundary({ error }: { error: Error }) {
    return <div className="text-white text-3xl">Oops an error has occured</div>;
}
