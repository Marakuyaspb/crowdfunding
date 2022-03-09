require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("./tasks/Crowdfunding.js");

 
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: process.env.RENKEBY_URL || '',
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
};