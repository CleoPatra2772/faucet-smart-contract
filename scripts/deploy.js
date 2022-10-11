
const hre = require("hardhat");

async function main() {
  const DragonfruitToken = await hre.ethers.getContractFactory("DragonFruitToken");
  const dragonfruitToken = await DragonfruitToken.deploy(100000000, 50);

  await dragonfruitToken.deployed();

  console.log("Dragonfruit Token deployed: ", dragonfruitToken.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


// const { ethers } = require("hardhat");
// const hre = require("hardhat");

// async function main() {
 
//   const DragonfruitToken = await ethers.getContractFactory('DragonFruitToken');
//   const dragonfruitToken = DragonfruitToken.deploy(100000000, 50);

//   //await dragonfruitToken.deployed();

//   console.log("Dragonfruit Token deployed at: ",  dragonfruitToken.address);
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
