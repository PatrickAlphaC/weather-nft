const WeatherFeed = artifacts.require('WeatherFeed')
const Consensus2021ChainlinkWeatherNFT = artifacts.require('Consensus2021ChainlinkWeatherNFT')

module.exports = async (deployer, network, [defaultAccount]) => {
    // Local (development) networks need their own deployment of the LINK
    // token and the Oracle contract
    if (!network.startsWith('rinkeby')) {
        console.log("We can deploy stuff... but that's it!")
    }
    const weatherNFT = await Consensus2021ChainlinkWeatherNFT.deployed()
    const weatherFeed = await WeatherFeed.deployed()
    console.log(await weatherFeed.weather())
    console.log(await weatherNFT.tokenURI(0))
}
