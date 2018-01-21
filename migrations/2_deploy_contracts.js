const TestCard = artifacts.require("TestCard")

module.exports = function(deployer) {
    deployer.deploy(TestCard);
}