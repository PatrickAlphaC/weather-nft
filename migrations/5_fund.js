const WeatherFeed = artifacts.require('WeatherFeed')
const Consensus2021ChainlinkWeatherNFT = artifacts.require('Consensus2021ChainlinkWeatherNFT')
const LinkTokenInterface = artifacts.require('LinkTokenInterface')
const { networkConfig } = require('../scripts/helper-scripts.js')

module.exports = async (deployer, network, [defaultAccount]) => {
    let amount = networkConfig[deployer.network_id]["fundAmount"]
    const weatherFeed = await WeatherFeed.deployed()
    const weatherNFT = await Consensus2021ChainlinkWeatherNFT.deployed()
    if (deployer.network_id != 4447) {
        const tokenAddress = networkConfig[deployer.network_id]["linkToken"]
        const token = await LinkTokenInterface.at(tokenAddress)
        console.log('Funding contract:', weatherFeed.address)
        let tx = await token.transfer(weatherFeed.address, amount, { from: defaultAccount })
        console.log(tx.tx)
        console.log('Funding contract:', weatherNFT.address)
        let tx2 = await token.transfer(weatherNFT.address, amount, { from: defaultAccount })
        console.log(tx2.tx)
    }

}
