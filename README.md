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

Build & Deploy BSC testnet | RadaNftContract

```shell

npx hardhat run scripts/RadaNftContract/1_deploy.js --network testnet
# Copy Token address to proxyAddresses.js
npx hardhat run scripts/RadaNftContract/2_setup.js --network testnet
npx hardhat run scripts/RadaNftContract/3_setMintFactories.js --network testnet
npx hardhat run scripts/RadaNftContract/4_approvalWhitelists.js --network testnet

# npx hardhat run scripts/RadaNftContract/safeMint_to_Contract.js --network testnet

# npx hardhat verify --network testnet --contract contracts/RadaNftContract.sol:RadaNftContract 0x71e2b6854dd19966Ae6dFd8D5107500dA1E7FA32

```
