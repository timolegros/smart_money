import { ethers } from "hardhat";

async function main() {
  // CoinCenterOrg
  const charity_address = "0x817838ab98f50f87917359a918cb7e57c07f9fa4";
  const [user, sponsor, funder] = await ethers.getSigners();

  const saEthersFactory = await ethers.getContractFactory("SmartAccount");
  const saInstance = await saEthersFactory.connect(user).deploy();

  console.log(`Smart Account implementation deployed at ${saInstance.address}`);

  const saFactoryEthersFactory = await ethers.getContractFactory("SmartAccountFactory");
  const saFactoryInstance = await saFactoryEthersFactory.connect(user).deploy(saInstance.address, charity_address);

  console.log(`Smart Account factory deployed at ${saFactoryInstance.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
