import { ethers } from "hardhat";

async function main() {
  const smartAccountAddress = "0x2239e693243c19F50d8eF5f4dfED02698b06d498";
  const [deployer, funder] = await ethers.getSigners();

  try {
    await funder.sendTransaction({
      to: smartAccountAddress,
      value: ethers.utils.parseEther("10.0")
    });
  } catch (e) {
    console.log(e);
  }

  console.log("Sent 10 eth to", smartAccountAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
