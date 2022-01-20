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
  var startId,endId;

  startId = 100;
  endId = 199;
  await nftContract.batchSafeMint("0x0A5D85009f9cB85C90D6BeEd810532F68a74dB79", startId, endId); // NFTAuctionContract 10
  console.log("safeMint #",startId," => ",endId);
  /* for (var i=startId; i<=endId;i++) {
    await nftContract.safeMint("0xaCEE77e4ae3FfD23f943605Aa21d9BBaa16C142b", i); // NFTAuctionContract
    console.log("safeMint #",i);
  } */

  startId = 200;
  endId = 299;
  /* await nftContract.batchSafeMint("0xe25DA05393Cb8050820BB651e97789CD49423237", startId, endId); // NFTFixedSwapContract 11
  console.log("safeMint #",startId," => ",endId); */
  /* for (var i=startId; i<=endId;i++) {
    await nftContract.safeMint("0xe25DA05393Cb8050820BB651e97789CD49423237", i); // NFTFixedSwapContract
    console.log("safeMint #",i);
  } */


  const afterDeploy = fe(await deployer.getBalance());
  console.log("Cost deploy:", (beforeDeploy-afterDeploy));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });