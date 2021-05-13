/* eslint-disable @typescript-eslint/no-var-requires */
const { oracle } = require('@chainlink/test-helpers')
const { expectRevert, time } = require('@openzeppelin/test-helpers')
const { networkConfig } = require('../scripts/helper-scripts.js')

contract('MyContract', accounts => {
  const { LinkToken } = require('@chainlink/contracts/truffle/v0.4/LinkToken')
  const WeatherNFT = artifacts.require('WeatherNFT')
  const MockOracle = artifacts.require('MockOracle')


  const defaultAccount = accounts[0]
  const oracleNode = accounts[1]
  const stranger = accounts[2]

  // These parameters are used to validate the data was received
  // on the deployed oracle contract. The Job ID only represents
  // the type of data, but will not work on a public testnet.
  // For the latest JobIDs, visit a node listing service like:
  // https://market.link/
  const jobId = web3.utils.toHex('4c7b7ffb66b344fbaa64995af81e355a')

  // Represents 1 LINK for testnet requests
  const payment = web3.utils.toWei('1')

  let linkToken, mockOracle, weatherNFT

  beforeEach(async () => {
    linkToken = await LinkToken.new({ from: defaultAccount })
    mockOracle = await MockOracle.new(linkToken.address, { from: defaultAccount })
    const jobId = web3.utils.toHex('4c7b7ffb66b344fbaa64995af81e355a')
    weatherNFT = await WeatherNFT.new(linkToken.address, linkToken.address, mockOracle.address, jobId, '1000000000000000000', { from: defaultAccount })
    await weatherNFT.mintWeatherNFT({ from: defaultAccount })
  })

  describe('#canTransferFromOracle', () => {
    context('runs the full suite of sending the NFT to a new user', () => {
      it('triggers a log event in the new Oracle contract', async () => {
        owner_add = await weatherNFT.ownerOf(0)
        const tx1 = await weatherNFT.approve(oracleNode, 0, { from: defaultAccount })
        await linkToken.transfer(weatherNFT.address, '2000000000000000000', { from: defaultAccount })
        const transaction = await weatherNFT.attemptPassword("FreeBe", { from: stranger })
        let requestId = await mockOracle.bigRequestId()
        const expected = "0"
        const returnData = web3.utils.padLeft(web3.utils.padLeft(web3.utils.toHex(expected)), 64)
        const tx = await mockOracle.fulfillOracleRequest(requestId, returnData)
        let ownerOfZero = await weatherNFT.ownerOf(0)
        assert.equal(ownerOfZero == stranger)
      })
    })
  })
})
