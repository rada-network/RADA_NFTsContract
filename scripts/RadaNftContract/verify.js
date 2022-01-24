const { upgrades, hardhatArguments } = require('hardhat');
const { addresses } = require('./proxyAddresses');

async function main() {

  const network = hardhatArguments.network;
  const proxyAddress = addresses[network];

  console.log("Contract address is:", proxyAddress);

  await hre.run("verify:verify", {
    address: proxyAddress,
    constructorArguments: [],
  });

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });