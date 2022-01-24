# RADA Auction Contract

Configuration .env file

```shell
PRIVATE_KEY=
RINKEBY_API_KEY=
ETHERSCAN_API_KEY=
BSC_API_KEY=
MNEMONIC=
```

The following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
```

Build & Deploy BSC polygonMumbai | RadaNftContract

```shell

npx hardhat run scripts/RadaNftContract/1_deploy.js --network polygonMumbai
# Copy Token address to proxyAddresses.js
npx hardhat run scripts/RadaNftContract/verify.js --network polygonMumbai

npx hardhat run scripts/RadaNftContract/2_setup.js --network polygonMumbai
npx hardhat run scripts/RadaNftContract/3_setMintFactories.js --network polygonMumbai
# npx hardhat run scripts/RadaNftContract/4_approvalWhitelists.js --network polygonMumbai

# npx hardhat run scripts/RadaNftContract/safeMint_to_Contract.js --network polygonMumbai

```
