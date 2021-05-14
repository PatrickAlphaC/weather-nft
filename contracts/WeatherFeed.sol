// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title MyContract is an example contract which requests data from
 * the Chainlink network
 * @dev This contract is designed to work on multiple networks, including
 * local test networks
 */
contract WeatherFeed is ChainlinkClient, Ownable {
  using Strings for string;
  string public weather;
  bytes32 public jobid;
  address public oracle; 
  uint256 public fee; 

  /**
   * @notice Deploy the contract with a specified address for the LINK
   * and Oracle contract addresses
   * @dev Sets the storage for the specified addresses
   * @param _link The address of the LINK token contract
   */
   // web3.utils.toHex(jobId)
  constructor(address _link, bytes32 _jobid, address _oracle, uint256 _fee) public {
    if (_link == address(0)) {
      setPublicChainlinkToken();
    } else {
      setChainlinkToken(_link);
    }
    jobid = _jobid;
    oracle = _oracle;
    fee = _fee; 
    weather = "Clear";
  }

  /**
   * @notice Returns the address of the LINK token
   * @dev This is the public implementation for chainlinkTokenAddress, which is
   * an internal method of the ChainlinkClient contract
   */
  function getChainlinkToken() public view returns (address) {
    return chainlinkTokenAddress();
  }

  function setWeather(string memory _weather) public onlyOwner {
    weather = _weather;
  }

  function getWeather() public onlyOwner
    returns (bytes32 requestId)
  {
    Chainlink.Request memory req = buildChainlinkRequest(jobid, address(this), this.fulfill.selector);
    req.add("city", "boston");
    req.add("copyPath", "weather.0.main");
    requestId = sendChainlinkRequestTo(oracle, req, fee);
  }

  /**
   * @notice The fulfill method from requests created by this contract
   * @dev The recordChainlinkFulfillment protects this function from being called
   * by anyone other than the oracle address that the request was sent to
   * @param _requestId The ID that was generated for the request
   * @param _data The answer provided by the oracle
   */
  function fulfill(bytes32 _requestId, bytes32 _data)
    public
    recordChainlinkFulfillment(_requestId)
  {
    weather = bytes32ToString(_data);
  }

  /**
   * @notice Allows the owner to withdraw any LINK balance on the contract
   */
  function withdrawLink() public onlyOwner {
    LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
    require(link.transfer(msg.sender, link.balanceOf(address(this))), "Unable to transfer");
  }


  function bytes32ToString(bytes32 _bytes32) public pure returns (string memory) {
        uint8 i = 0;
        while(i < 32 && _bytes32[i] != 0) {
            i++;
        }
        bytes memory bytesArray = new bytes(i);
        for (i = 0; i < 32 && _bytes32[i] != 0; i++) {
            bytesArray[i] = _bytes32[i];
        }
        return string(bytesArray);
    }
}
