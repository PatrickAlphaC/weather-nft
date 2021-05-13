const WeatherFeed = artifacts.require('WeatherFeed')
const { networkConfig } = require('../scripts/helper-scripts.js')

module.exports = async (deployer, network, [defaultAccount]) => {
    // Local (development) networks need their own deployment of the LINK
    // token and the Oracle contract
    if (!network.startsWith('rinkeby')) {
        console.log("We can deploy stuff... but that's it!")
    }

    await deployer.deploy(WeatherFeed,
        networkConfig[deployer.network_id]["linkToken"],
        web3.utils.toHex(networkConfig[deployer.network_id]["weatherJobId"]),
        networkConfig[deployer.network_id]["oracle"],
        networkConfig[deployer.network_id]["fee"],
        { from: defaultAccount })
}
