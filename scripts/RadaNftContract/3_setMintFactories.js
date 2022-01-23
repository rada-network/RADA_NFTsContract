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

  // await nftContract.setMintFactory("0x16DA4c7B28dc30BCE9e2B384E17a7b0078Fb97AE");// Quang
  // await nftContract.setMintFactory("0xbA92132B464af8BC073fA1a7a518b32298435d68");// Open box
  // await nftContract.setMintFactory("0x7C2e7fF40254c465d1941B923C669Df9F6488898"); // Auction
  // await nftContract.setMintFactory("0x49117A8E02872C0B6b399829823bD912Bf74B097"); // Fixed
  // await nftContract.setMintFactory("0x2da63e30F846E2Dc9bF7A6982E8e7F805C89b67b"); // Open Box
  // await nftContract.setMintFactory("0xF567103C1F846217C58995c205662F3ECF22302B"); // Open Box
  // await nftContract.setMintFactory("0x63B70bAD9a1958eF743EeF22086637FaD92f3555"); // Auction
  // await nftContract.setMintFactory("0x8cE3514596bfe2E15c1e38c3446DCca17F2317df"); // Fixed
  // await nftContract.setMintFactory("0x16DA4c7B28dc30BCE9e2B384E17a7b0078Fb97AE"); // Deployer
  // await nftContract.setMintFactory("0xBB04873c3D00dd6779dAE848029a2bC82a3A222b"); // NFTMan
  await nftContract.setMintFactory("0x77f866b1E2528544C8CBfda8D58001dd1abcE70e"); // NFTMan Polygon



  console.log("setMintFactory changed");

  const afterDeploy = fe(await deployer.getBalance());
  console.log("Cost deploy:", (beforeDeploy-afterDeploy));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });