const WeatherFeed = artifacts.require('WeatherFeed')
const WeatherNFT = artifacts.require('WeatherNFT')
const { networkConfig } = require('../scripts/helper-scripts.js')

module.exports = async (deployer, network, [defaultAccount]) => {
    // Local (development) networks need their own deployment of the LINK
    // token and the Oracle contract
    if (!network.startsWith('rinkeby')) {
        console.log("We can deploy stuff... but that's it!")
    }
    weatherNFT = await WeatherNFT.deployed()
    await weatherNFT.mintWeatherNFT({ from: defaultAccount })
    await weatherNFT.mintWeatherNFT({ from: defaultAccount })
    await weatherNFT.mintWeatherNFT({ from: defaultAccount })
    await weatherNFT.mintWeatherNFT({ from: defaultAccount })
    await weatherNFT.approve(networkConfig[deployer.network_id]["oracle"], 0, { from: defaultAccount })
    await weatherNFT.approve(networkConfig[deployer.network_id]["oracle"], 1, { from: defaultAccount })
    await weatherNFT.approve(networkConfig[deployer.network_id]["oracle"], 2, { from: defaultAccount })
    await weatherNFT.approve(networkConfig[deployer.network_id]["oracle"], 3, { from: defaultAccount })
    console.log("View your NFTs on Opensea!")
    console.log("https://opensea.io/assets/matic/" + weatherNFT.address + "/0")
}
