const WeatherFeed = artifacts.require('WeatherFeed')
const WeatherNFT = artifacts.require('WeatherNFT')
const { networkConfig } = require('../scripts/helper-scripts.js')

module.exports = async (deployer, network, [defaultAccount]) => {
    // Local (development) networks need their own deployment of the LINK
    // token and the Oracle contract
    if (!network.startsWith('rinkeby')) {
        console.log("We can deploy stuff... but that's it!")
    }
    weatherFeed = await WeatherFeed.deployed()
    tx1 = await deployer.deploy(WeatherNFT,
        networkConfig[deployer.network_id]["linkToken"],
        WeatherFeed.address,
        networkConfig[deployer.network_id]["oracle"],
        web3.utils.toHex(networkConfig[deployer.network_id]["passwordJobId"]),
        networkConfig[deployer.network_id]["fee"],
        { from: defaultAccount })
}
