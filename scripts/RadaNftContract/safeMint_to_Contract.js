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

  /* startId = 10000;
  endId = 10009;
  for (var i=startId; i<=endId;i++) {
    await nftContract.safeMint("0x0A5D85009f9cB85C90D6BeEd810532F68a74dB79", i); // NFTAuctionContract 10
    console.log("safeMint #",i);
  } */

  /* startId = 10100;
  endId = 10109;
  await nftContract.batchSafeMint("0x0A5D85009f9cB85C90D6BeEd810532F68a74dB79", startId, endId); // NFTAuctionContract 10
  console.log("safeMint #",startId," => ",endId); */


  startId = 80029;
  endId = 80049;
  /* await nftContract.batchSafeMint("0x0A5D85009f9cB85C90D6BeEd810532F68a74dB79", startId, endId); // NFTAuctionContract 10
  console.log("safeMint #",startId," => ",endId); */
  for (var i=startId; i<=endId;i++) {
    await nftContract.safeMint("0xffA91816a176bdcb4E805f956DD578d8db0D4C20", i); // NFTAuctionContract 10
    console.log("safeMint #",i);
  }

  startId = 90000;
  endId = 90049;
  /* await nftContract.batchSafeMint("0xec7CDF97F016813Ab789a152E0b1c821073173B5", startId, endId); // NFTFixedSwapContract 11
  console.log("safeMint #",startId," => ",endId); */
  for (var i=startId; i<=endId;i++) {
    await nftContract.safeMint("0xD2B7a172e04eD493Db50c1084732b12296850AF5", i); // NFTFixedSwapContract 11
    console.log("safeMint #",i);
  }

  const afterDeploy = fe(await deployer.getBalance());
  console.log("Cost deploy:", (beforeDeploy-afterDeploy));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });