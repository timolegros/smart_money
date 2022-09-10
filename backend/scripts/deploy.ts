import { ethers } from "hardhat";

async function main() {
  // CoinCenterOrg
  const charity_address = "0x15322B546e31F5Bfe144C4ae133A9Db6F0059fe3";
  const [deployer] = await ethers.getSigners();

  const saEthersFactory = await ethers.getContractFactory("SmartAccount");
  const saInstance = await saEthersFactory.connect(deployer).deploy();

  console.log(`Smart Account implementation deployed at ${saInstance.address}`);

  const saFactoryEthersFactory = await ethers.getContractFactory("SmartAccountFactory");
  const saFactoryInstance = await saFactoryEthersFactory.connect(deployer).deploy(saInstance.address, charity_address);

  console.log(`Smart Account factory deployed at ${saFactoryInstance.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
