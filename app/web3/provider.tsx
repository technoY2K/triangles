import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA);

export default provider;
