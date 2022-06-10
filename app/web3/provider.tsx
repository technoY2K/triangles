import { ethers, utils } from "ethers";
import { type Block } from "@ethersproject/abstract-provider";

type Provider<B> = {
    getBlockNumber: () => Promise<number>;
    getBlock: (n: number) => Promise<B>;
    getGasPrice: () => Promise<string>;
};

const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA);

const p: Provider<Block> = {
    getBlockNumber: () => provider.getBlockNumber(),
    getBlock: (n: number) => provider.getBlock(n),
    getGasPrice: async () => {
        const rawGasPrice = await provider.getGasPrice();
        const gas = utils.formatUnits(rawGasPrice, "gwei");
        return gas;
    },
};

export default p;
