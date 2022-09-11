import { ethers } from "ethers";
import SmartAccountFactoryContract from './contractAbis/SmartAccountFactory.json';
import SmartAccountContract from './contractAbis/SmartAccount.json';

const smartAccountFactoryAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export const truncateAddress = (address) => {
    if (!address) return "No Account";
    const match = address.match(
        /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/
    );
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
};

export const toHex = (num) => {
    const val = Number(num);
    return "0x" + val.toString(16);
};

export function getAccountFactory(provider) {
    return new ethers.Contract(smartAccountFactoryAddress, SmartAccountFactoryContract.abi, provider);
}

export function getBankAccount(address, provider) {
    return new ethers.Contract(address, SmartAccountContract.abi, provider);
}

export async function createAccount(signer, savingPercent, sponsorAddress, factoryContract) {
    await factoryContract.connect(signer).createAccount(savingPercent, sponsorAddress);
}
