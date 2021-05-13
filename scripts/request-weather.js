const WeatherFeed = artifacts.require('WeatherFeed')

module.exports = async callback => {
    if (!network.startsWith('rinkeby')) {
        console.log("We can deploy stuff... but that's it!")
    }
    console.log("Requesting...")
    const weatherFeed = await WeatherFeed.deployed()
    const tx = await weatherFeed.getWeather()
    callback(tx.tx)
}

