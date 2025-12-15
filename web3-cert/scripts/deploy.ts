import * as hre from "hardhat";

async function main() {
  const { ethers } = hre;

  // Ambil contract factory
  const CertificateNFT = await ethers.getContractFactory("CertificateNFT");

  // Deploy
  const certificateNFT = await CertificateNFT.deploy();

  // Tunggu sampai benar-benar terdeploy
  await certificateNFT.waitForDeployment();

  console.log("CertificateNFT deployed to:", await certificateNFT.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
