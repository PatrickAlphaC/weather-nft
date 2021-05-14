const WeatherFeed = artifacts.require('WeatherFeed')
const WeatherNFT = artifacts.require('WeatherNFT')
const LinkTokenInterface = artifacts.require('LinkTokenInterface')
const { networkConfig } = require('../scripts/helper-scripts.js')

module.exports = async (deployer, network, [defaultAccount]) => {
    // Local (development) networks need their own deployment of the LINK
    // token and the Oracle contract
    if (!network.startsWith('rinkeby')) {
        console.log("Skipping...")
    }
    let amount = networkConfig[deployer.network_id]["fee"]
    const weatherFeed = await WeatherFeed.deployed()
    const weatherNFT = await WeatherNFT.deployed()
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
