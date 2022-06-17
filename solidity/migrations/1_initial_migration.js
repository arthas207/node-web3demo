const coinDemo = artifacts.require("CoinDemo");

module.exports = function (deployer) {
  deployer.deploy(coinDemo);
};
