const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TaipeiConnect", function () {
  let TaipeiConnect;
  let taipeiConnect;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    TaipeiConnect = await ethers.getContractFactory("TaipeiConnect");
    taipeiConnect = await TaipeiConnect.deploy();
    await taipeiConnect.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await taipeiConnect.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await taipeiConnect.balanceOf(owner.address);
      expect(await taipeiConnect.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("User Registration", function () {
    it("Should allow users to register", async function () {
      await taipeiConnect.connect(addr1).registerUser("Alice");
      const profile = await taipeiConnect.getUserProfile(addr1.address);
      expect(profile.name).to.equal("Alice");
      expect(profile.reputation).to.equal(0);
    });

    it("Should prevent duplicate registration", async function () {
      await taipeiConnect.connect(addr1).registerUser("Alice");
      await expect(
        taipeiConnect.connect(addr1).registerUser("Alice")
      ).to.be.revertedWith("User already registered");
    });
  });

  describe("Reputation System", function () {
    it("Should allow owner to update reputation", async function () {
      await taipeiConnect.connect(addr1).registerUser("Alice");
      await taipeiConnect.updateReputation(addr1.address, 10);
      const profile = await taipeiConnect.getUserProfile(addr1.address);
      expect(profile.reputation).to.equal(10);
    });

    it("Should prevent non-owner from updating reputation", async function () {
      await taipeiConnect.connect(addr1).registerUser("Alice");
      await expect(
        taipeiConnect.connect(addr1).updateReputation(addr1.address, 10)
      ).to.be.reverted;
    });
  });

  describe("Token Rewards", function () {
    it("Should allow owner to reward users", async function () {
      await taipeiConnect.connect(addr1).registerUser("Alice");
      const rewardAmount = 100;
      await taipeiConnect.rewardUser(addr1.address, rewardAmount);
      expect(await taipeiConnect.balanceOf(addr1.address)).to.equal(rewardAmount);
    });
  });
}); 