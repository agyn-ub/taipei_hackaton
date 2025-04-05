const hre = require("hardhat");

async function main() {
  console.log("Deploying CivicDAO to Polygon...");

  // Deploy the contract
  const CivicDAO = await hre.ethers.getContractFactory("CivicDAO");
  const civicDAO = await CivicDAO.deploy();

  await civicDAO.waitForDeployment();

  const address = await civicDAO.getAddress();
  console.log("CivicDAO deployed to:", address);

  // Verify the contract
  console.log("Waiting for 5 block confirmations...");
  await civicDAO.deploymentTransaction().wait(5);
  
  console.log("Verifying contract...");
  await hre.run("verify:verify", {
    address: address,
    constructorArguments: [],
  });

  console.log("Contract verified!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 