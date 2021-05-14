const WeatherNFT = artifacts.require('WeatherNFT')

module.exports = async callback => {
    // if (!network.startsWith('rinkeby')) {
    //     console.log("We can deploy stuff... but that's it!")
    // }
    console.log("Requesting...")
    const weatherNFT = await WeatherNFT.deployed()
    // const tx = await WeatherNFT.attemptPassword("FreeBe")
    // console.log(tx)
    console.log(weatherNFT)
    callback(tx.tx)
}

