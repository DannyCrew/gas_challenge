const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Deploy Gas Challenge Contract", () => {
  let gas_contract;

  beforeEach(async () => {
    const gas_challenge_contract = await ethers.getContractFactory(
      "gasChallenge"
    );
    gas_contract = await gas_challenge_contract.deploy();
    await gas_contract.deployed();
  });

  describe("Compute Gas", () => {
    it("Should return lower gas", async () => {
      const gasUsageBefore = await gas_contract.estimateGas.notOptimizedFunction();
      await gas_contract.notOptimizedFunction();
      const gasUsageAfter = await gas_contract.estimateGas.optimizedFunction();
      expect(gasUsageAfter).to.be.lessThan(gasUsageBefore);
    });
  });

  describe("Check Sum Of Array", () => {
    it("Should return 0", async () => {
      await gas_contract.optimizedFunction();
      const sum = await gas_contract.getSumOfArray();
      expect(sum.toNumber()).to.equal(0);
    });
  });
});
