const { expect } = require("chai");
const { ethers } = require("hardhat");
const hre = require("hardhat");
const { EDIT_DISTANCE_THRESHOLD } = require("hardhat/internal/constants");

describe('DragonFruit Token contract', function () {
    let Token;
    let dragonfruitToken;
    let owner;
    let addr1;
    let addr2;
    let tokenCap = 100000000;
    let tokenBlockReward = 50;

    beforeEach(async () => {
        Token = await ethers.getContractFactory('DragonFruitToken');
        [owner, addr1, addr2] = await hre.ethers.getSigners();

        dragonfruitToken = await Token.deploy(tokenCap, tokenBlockReward);

    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect (await dragonfruitToken.owner()).to.equal(owner.address);
        });

        it("Should assign the total supply of tokens to the owner", async function () {
            const ownerBalance = await dragonfruitToken.balanceOf(owner.address);
            expect(await dragonfruitToken.totalSupply()).to.equal(ownerBalance);
        });

        it("Should set the max capped supply to the argument provided during deployment", async function() {
            const cap = await dragonfruitToken.cap();
            expect(Number(hre.ethers.utils.formatEther(cap))).to.equal(tokenCap);
        });

        it("Should set the blockReward to the argument provided during deployment", async function() {
            const blockReward = await dragonfruitToken.blockReward();
            expect(Number(hre.ethers.utils.formatEther(blockReward))).to.equal(tokenBlockReward);
            
        })
    });




})