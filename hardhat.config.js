require("@nomicfoundation/hardhat-toolbox")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "sepolia",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    hardhat: {
      // See its defaults
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/aEbH4bvKCRKB-ZojqcUAt-WQ-A-V9yid",
      accounts:["8cd3c677ffb2238e9314f82eda9359eb91fa8928362e3c29ac6b1a2e605b8563"]
    }
  },
  solidity: {
    version: "0.8.20",
    settings: { 
      optimizer: {
        enabled: true,
        runs: 1,
      },
    },
  },
};