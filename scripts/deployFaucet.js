const hre = require("hardhat");

async function main() {
const Faucet = await hre.ethers.getContractFactory("Faucet");
const faucet = await Faucet.deploy("0x76737097f828f96856D58Fe297258240Ce193c6F");

await faucet.deployed();

console.log("Faucet address: ", faucet.address)



}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });