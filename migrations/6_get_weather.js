const WeatherFeed = artifacts.require('WeatherFeed')
const LinkTokenInterface = artifacts.require('LinkTokenInterface')
const { networkConfig } = require('../scripts/helper-scripts.js')

module.exports = async (deployer, network, [defaultAccount]) => {

    const weatherFeed = await WeatherFeed.deployed()
    const tx = await weatherFeed.getWeather()
    console.log('Got weather!', tx)
}
