import {artifacts, ethers} from "hardhat";

async function main() {
  const smartAccountAddress = "0x2239e693243c19F50d8eF5f4dfED02698b06d498";
  const [user, sponsor, funder] = await ethers.getSigners();

  try {
    const smartAccount = await ethers.getContractAtFromArtifact(await artifacts.readArtifact("SmartAccount"), smartAccountAddress);
    await smartAccount.connect(sponsor).reviewBet(1, 2);
  } catch (e) {
    console.log(e);
  }

  console.log(`Bet 1 of ${smartAccountAddress} failed`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
