require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version : "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  hardhat:{
    allowUnlimitedContractSize: true,
    gas: 1000000
  },
  networks: {
    hardhat: {
      forking: {
        //url: "https://eth-mainnet.alchemyapi.io/v2/process.env.ALCHEMY_MAINNET_KEY",
        url: "https://polygon-mumbai.g.alchemy.com/v2/"+process.env.ALCHEMY_MUMBAI_KEY
      },
      accounts:{
        count:100,
        accountsBalance: "100000000000000000000000"
      }
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts:[process.env.PRIVATE_KEY]
    },
    matic: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};