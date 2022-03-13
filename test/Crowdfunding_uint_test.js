const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Crowdfunding", function () {
  const my_value = 20
  let account0
  let account1
  let donations

  beforeEach(async function() {
       [account0, account1] = await ethers.getSigners()
       const Crowdfunding = await ethers.getContractFactory("Crowdfunding", account0)
       donations = await Crowdfunding.deploy();
       await donations.deployed()
   })


  it("Should be deployed", async function () {
    expect(donations.address).to.be.properAddress
  })

  it("Should be possible to donate funds", async function () {
    const tx = await donations.connect(account0).donate({value: my_value})

    expect(() => tx).to.changeBalances([account0, donations], [-my_value, my_value])
  })

  it("Should be possible transfer funds to any address", async function () {
    await donations.connect(account0).donate({value: my_value})
    const tx2 = await donations.connect(account0).transferOut(account1.address, 20)

    await expect(() => tx2).to.changeBalances([donations, account1], [-my_value, my_value])
  })

  it("Should be possible transfer funds for owner only", async function () {
    await donations.connect(account0).donate({value: my_value})

    expect(donations.connect(account0).transferOut(account0.address, 20)).revertedWith('Nobody but the owner can do it');
  })

  it("Should be possible view all donators", async function () {
    await donations.connect(account0).donate({value: my_value})
    await donations.connect(account1).donate({value: my_value})

    expect(await donations.getAllDonators()).have.members([account0.address,account1.address])
  })

  it("Should be possible view donate per address", async function () {
    await donations.connect(account0).donate({value: my_value})
    await donations.connect(account1).donate({value: my_value})
    value = await donations.getDonationsOfAddess(account1.address)

    expect(my_value).to.equal(value)
  })
});