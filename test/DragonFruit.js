const { expect } = require("chai");
const { ethers } = require("hardhat");
const hre = require("hardhat");


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

    describe("Transactions", function () {
        it("Should transfer tokens between accounts", async function (){
            //Transfer 50 tokens from owner to addr1
            await dragonfruitToken.transfer(addr1.address, 50);
            const addr1Balance = await dragonfruitToken.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(50);

        });
    

    it("Should fail if sender doesn't have enough tokens", async function () {
        const initialOwnerBalance = await dragonfruitToken.balanceOf(owner.address);
        //try to send 1 token from addr1 (0 tokens)  to owner (1000000 tokens)
        // 'require' will evaluate false and revert the transaction
        await expect(
            dragonfruitToken.connect(addr1).transfer(owner.address, 1)
        ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

        //owner balance shouldn't have changed
        expect(await dragonfruitToken.balanceOf(owner.address)).to.equal(
            initialOwnerBalance
        );
    });

    it("Should upated balances after transfers", async function () {
        const initialOwnerBalance = await dragonfruitToken.balanceOf(owner.address);

        //Transfer 100 tokens from owner to addr1.
        await dragonfruitToken.transfer(addr1.address, 100);

        //Transfer another 50 tokens from owner to addr2;
        await dragonfruitToken.transfer(addr2.address, 50);

        const finalOwnerBalance = await dragonfruitToken.balanceOf(owner.address);
        expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(150));

        const addr2Balance = await dragonfruitToken.balanceOf(addr2.address);
        expect(addr2Balance).to.equal(50);


    });



}); 




});