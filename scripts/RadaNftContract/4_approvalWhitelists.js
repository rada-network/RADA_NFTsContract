const { ethers, upgrades, hardhatArguments } = require('hardhat');
const { addresses: contractAddresses } = require('./proxyAddresses');
const { pe,fe,fu,pu } = require('../utils');

async function main() {
  const [deployer] = await ethers.getSigners();

  const network = hardhatArguments.network;
  const contractAddress = contractAddresses[network];

  console.log("With the account:", deployer.address);
  console.log("With RadaNftContract address:", contractAddress);
  const beforeDeploy = fe(await deployer.getBalance());

  const nftContract = await ethers.getContractAt("RadaNftContract",contractAddress);

  await nftContract.approvalWhitelists("0x16DA4c7B28dc30BCE9e2B384E17a7b0078Fb97AE");
  await nftContract.approvalWhitelists("0x0c1954CEB2227e3C5E6155B40fd929C1fF64F5f5"); // Hieuvector


  console.log("approvalWhitelists done");

  const afterDeploy = fe(await deployer.getBalance());
  console.log("Cost deploy:", (beforeDeploy-afterDeploy));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });