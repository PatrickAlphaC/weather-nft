const Migrations = artifacts.require('Migrations')
const { LinkToken } = require('@chainlink/contracts/truffle/v0.4/LinkToken')
const { Oracle } = require('@chainlink/contracts/truffle/v0.6/Oracle')


module.exports = async (deployer, network, [defaultAccount]) => {
  deployer.deploy(Migrations, { from: defaultAccount })
  if (!network.startsWith('kovan')) {
    LinkToken.setProvider(deployer.provider)
    Oracle.setProvider(deployer.provider)
  }
}
