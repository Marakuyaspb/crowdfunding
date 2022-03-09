task("donations_do_donate", "Let s donate")
  .addParam("address", "Contract address")
  .addParam("amount", "The amount of donations in wei")
  .setAction(async (taskArgs) => {
    const [acc1] = await ethers.getSigners()
    const Donators = await ethers.getContractFactory('Crowdfunding');
    const donations = await Donators.attach(taskArgs.address)
    await donations.connect(acc1).donate({value: taskArgs.amount})
});

task("donations_transfer", "Send coins out to any address")
  .addParam("address", "Contract address")
  .addParam("toAddress", "To address")
  .addParam("amount", "Amount in wei")
  .setAction(async (taskArgs) => {
    const Donators = await ethers.getContractFactory('Crowdfunding')
    const donations = await Donators.attach(taskArgs.address)
    await donations.transferOut(taskArgs.toAddress, taskArgs.amount)
});

task("donations_all_donators", "Show addresses of all donators")
  .addParam("address", "Contract address")
  .setAction(async (taskArgs) => {
    const Donators = await ethers.getContractFactory('Crowdfunding')
    const donators = await Donators.attach(taskArgs.address)
    const out = await donators.getAllDonators()
    console.log(out)
});

task("donations_donate_per_addess", "Show the amount of donation per address")
  .addParam("address", "Contract address")
  .addParam("donatorAddress", "Donator address")
  .setAction(async (taskArgs) => {
    const Donators = await ethers.getContractFactory('Crowdfunding')
    const donators = await Donators.attach(taskArgs.address)
    const out = await donators.getDonationsOfAddess(taskArgs.donatorAddress)
    console.log(out.toString())
});