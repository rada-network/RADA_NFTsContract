// We import Chai to use its asserting functions here.
const {
  expect
} = require("chai");
const {
  ethers,
  upgrades
} = require('hardhat');
const {
  BN,
  constants,
  expectEvent,
  expectRevert
} = require('@openzeppelin/test-helpers');

describe("NFT Contract", function () {

  let contractNFT;
  const MINTER_ROLE = "0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6";
  const URL_BASE = "https://nft.1alo.com/v1/rada/";
  const tokenId = "100000";
  // Utils
  const pe = (num) => ethers.utils.parseEther(num) // parseEther
  const fe = (num) => ethers.utils.formatEther(num) // formatEther
  const pu = (num, decimals = 0) => ethers.utils.parseUnits(num, decimals) // parseUnits
  const fu = (num, decimals = 0) => ethers.utils.formatUnits(num, decimals) // formatEther

  beforeEach(async function () {

    [owner, approvalUser, minterFactoryUser, user1,...addrs] = await ethers.getSigners();

    const RadaNftContract = await ethers.getContractFactory("RadaNftContract");
    contractNFT = await RadaNftContract.deploy();

    /* NFT */
    // Set updateBaseURI
    await contractNFT.updateBaseURI(URL_BASE);

    // Set approval
    await contractNFT.addApprovalWhitelist(approvalUser.address);

    // Set minterFactory for NFT
    await contractNFT.setMintFactory(minterFactoryUser.address);

    // Mint an NFT
    await contractNFT.connect(minterFactoryUser).safeMint(user1.address, tokenId);

  });

  it('Deploy v1 and should set right minterFactory address, right minter address', async function () {
    expect(await contractNFT.hasRole(MINTER_ROLE, minterFactoryUser.address)).to.equal(true);
    expect(await contractNFT.approvalWhitelists(approvalUser.address)).to.equal(true);
  });

  it('Should lock tokenId', async function () {
    await contractNFT.connect(approvalUser).handleLock(tokenId, true);
    expect(await contractNFT.isLocked(tokenId)).to.equal(true);
  });
  it('Should use tokenId', async function () {
    await contractNFT.connect(approvalUser).handleUse(tokenId, true);
    expect(await contractNFT.isUsed(tokenId)).to.equal(true);
  });
  it('Should set type tokenId', async function () {
    await contractNFT.connect(approvalUser).setType(tokenId, 1);
    expect(await contractNFT.typeTokens(tokenId)).to.equal(1);
  });

});