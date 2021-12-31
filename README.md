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
// Copy Token address to proxyAddresses.js
# npx hardhat run scripts/RadaNftContract/2_setup.js --network testnet

// npx hardhat verify --network testnet --contract contracts/RadaNftContract.sol:RadaNftContract 0x6d6E82862a32A16787cC6a4b7084B05d38f22948

```
