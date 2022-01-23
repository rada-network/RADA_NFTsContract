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
npx hardhat run scripts/RadaNftContract/2_setup.js --network polygonMumbai
npx hardhat run scripts/RadaNftContract/3_setMintFactories.js --network polygonMumbai
npx hardhat run scripts/RadaNftContract/4_approvalWhitelists.js --network polygonMumbai

# npx hardhat run scripts/RadaNftContract/safeMint_to_Contract.js --network polygonMumbai

# npx hardhat verify --network polygonMumbai --contract contracts/RadaNftContract.sol:RadaNftContract 0x6e1aa924A1882B7C1122290E11A9fE94F63Af52d
# npx hardhat verify --network polygonMumbai --contract contracts/RadaNftContract.sol:RadaNftContract 0x71e2b6854dd19966Ae6dFd8D5107500dA1E7FA32

npx hardhat verify --network polygonMumbai --contract contracts/RadaNftContract.sol:RadaNftContract 0xF820504f15Eb3db9BCC0f1c2b88a60101E3E52FB


```
