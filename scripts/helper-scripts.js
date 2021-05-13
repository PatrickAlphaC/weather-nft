// const MyContract = artifacts.require('MyContract')
const LinkTokenInterface = artifacts.require('LinkTokenInterface')

// const linkIpfsImageURIs = {
//     "rain": "",
//     "sun": "",
//     "snow": "",
//     "cloud": ""
// }

// const linkIpfsTokenURI = {
//     "rain": "",
//     "sun": "",
//     "snow": "",
//     "cloud": ""
// }

const payment = process.env.TRUFFLE_CL_BOX_PAYMENT || '1000000000000000000'

const fundContract = async (contractAddress, linkTokenAddress) => {
    const token = await LinkTokenInterface.at(linkTokenAddress)
    console.log('Funding contract:', contractAddress)
    const tx = await token.transfer(contractAddress, payment)
}

const networkConfig = {
    default: {
        name: 'ganache',
        linkToken: '0xa36085F69e2889c224210F603D836748e7dC0088',
        ethUsdPriceFeed: '0x9326BFA02ADD2366b30bacB125260Af641031331',
        keyHash: '0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4',
        vrfCoordinator: '0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9',
        oracle: '0xAA1DC356dc4B18f30C347798FD5379F3D77ABC5b',
        weatherJobId: '235f8b1eeb364efc83c26d0bef2d0c01',
        passwordJobId: '7dba1883480744b3a3a619aeb65b5d1f',
        fee: '100000000000000000',
    },
    4447: {
        name: 'ganache',
        linkToken: '0xa36085F69e2889c224210F603D836748e7dC0088',
        ethUsdPriceFeed: '0x9326BFA02ADD2366b30bacB125260Af641031331',
        keyHash: '0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4',
        vrfCoordinator: '0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9',
        oracle: '0xAA1DC356dc4B18f30C347798FD5379F3D77ABC5b',
        weatherJobId: '235f8b1eeb364efc83c26d0bef2d0c01',
        passwordJobId: '7dba1883480744b3a3a619aeb65b5d1f',
        fee: '100000000000000000',
    },
    31337: {
        name: 'localhost',
        fee: '100000000000000000',
        keyHash: '0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4',
        jobId: '29fa9aa13bf1468788b7cc4a500a45b8'
    },
    42: {
        name: 'kovan',
        linkToken: '0xa36085F69e2889c224210F603D836748e7dC0088',
        ethUsdPriceFeed: '0x9326BFA02ADD2366b30bacB125260Af641031331',
        keyHash: '0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4',
        vrfCoordinator: '0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9',
        oracle: '0xAA1DC356dc4B18f30C347798FD5379F3D77ABC5b',
        chainlinkNode: '0x1d1379d146a0Dc966BEb6042720ee018E70eeC72',
        weatherJobId: '235f8b1eeb364efc83c26d0bef2d0c01',
        passwordJobId: '7dba1883480744b3a3a619aeb65b5d1f',
        fee: '100000000000000000',
    },
    4: {
        name: 'rinkeby',
        linkToken: '0x01be23585060835e02b77ef475b0cc51aa1e0709',
        ethUsdPriceFeed: '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e',
        keyHash: '0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311',
        vrfCoordinator: '0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B',
        oracle: '0x8927c312d29d1bbef7bde10e8e9a2fa257efe8c7',
        weatherJobId: 'd8c92142857640a891b9434c72eed1e2',
        // TODO
        passwordJobId: '',
        fee: '100000000000000000',
    },
    1: {
        name: 'mainnet',
        linkToken: '0x514910771af9ca656af840dff83e8264ecf986ca'
    },
    5: {
        name: 'goerli',
        linkToken: '0x326c977e6efc84e512bb9c30f76e30c160ed06fb'
    },
    137: {
        name: 'matic',
        linkToken: '0xb0897686c545045afc77cf20ec7a532e3120e0f1',
        oracle: '0x0287bcf1dcbbf61b58766d69240c32d1ea13e920', // Alpha Chain Matic
        weatherJobId: '74873d17a942416586f812080c72fcdc',
        passwordJobId: '',
        fee: 10000000000000000
    }
}

module.exports = {
    networkConfig,
    fundContract
}
