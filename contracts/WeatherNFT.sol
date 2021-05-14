//
// SPDX-License-Identifier: MIT

pragma solidity ^0.6.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./interfaces/IWeatherFeed.sol";
import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract WeatherNFT is ERC721, Ownable, ChainlinkClient {
    using Strings for string;
    bool public overRide;
    string public overRideWeather;
    uint256 public tokenCounter; 
    address public weatherFeedAddress; 
    uint256 public response;

    bytes32 public jobId;
    address public oracle;
    uint256 public fee; 

    mapping(bytes32 => address) public requestIdToAttemptee;
    mapping(string => string) public weatherToWeatherURI;
    mapping(uint256 => string) public overRideTokenIdToWeatherURI;
    mapping(uint256 => bool) public tokenIdTaken;
    event attemptedPassword(bytes32 requestId);
    /**
     * Constructor inherits VRFConsumerBase
     * Network: Rinkeby
     * LINK token address:                0x01BE23585060835E02B77ef475b0Cc51aA1e0709
     */
    constructor(address _link, address _weatherFeed, address _oracle, bytes32 _jobId, uint256 _fee) public
        ERC721("WeatherNFT", "wNFT")
    {   
        if (_link == address(0)) {
            setPublicChainlinkToken();
        } else {
            setChainlinkToken(_link);
        }
        weatherFeedAddress = _weatherFeed;
        weatherToWeatherURI["Thunderstorm"] = "https://ipfs.io/ipfs/QmP3TpPig2St3nTwvi9TFAGdv6YTew5k4pmC1yFtaLwFFo";
        weatherToWeatherURI["Drizzle"] = "https://ipfs.io/ipfs/QmP3TpPig2St3nTwvi9TFAGdv6YTew5k4pmC1yFtaLwFFo";
        weatherToWeatherURI["Rain"] = "https://ipfs.io/ipfs/QmP3TpPig2St3nTwvi9TFAGdv6YTew5k4pmC1yFtaLwFFo";
        weatherToWeatherURI["Snow"] = "https://ipfs.io/ipfs/QmaeYdJ8EydzUGdGQGkPNkSBEQUmwRmAv2QWq1VTfsfrdk";
        weatherToWeatherURI["Atmosphere"] = "https://ipfs.io/ipfs/QmbNEeSa8pZrepYhGnnhSCmABZXymvc7YR5JKFT7TuYuYY";
        weatherToWeatherURI["Clear"] = "https://ipfs.io/ipfs/QmcKEV1xJQ3ZCyPsDPJHsuEZnF95hNZf8S3rBEvzCKwjof";
        weatherToWeatherURI["Clouds"] = "https://ipfs.io/ipfs/QmbNEeSa8pZrepYhGnnhSCmABZXymvc7YR5JKFT7TuYuYY";
        overRide = false;
        overRideTokenIdToWeatherURI[0] = weatherToWeatherURI["Rain"];
        overRideTokenIdToWeatherURI[1] = weatherToWeatherURI["Clear"];
        overRideTokenIdToWeatherURI[2] = weatherToWeatherURI["Clouds"];
        overRideTokenIdToWeatherURI[3] = weatherToWeatherURI["Snow"];
        oracle = _oracle;
        jobId = _jobId;
        fee = _fee;
    }

    function mintWeatherNFT() public onlyOwner{
        _safeMint(msg.sender, tokenCounter);
        tokenCounter = tokenCounter + 1;
    }

    function setOverRide(uint256 _overRide) public onlyOwner {
        if (_overRide == 0){
            overRide = false;
        }
        if (_overRide == 1){
            overRide = true;
        }
    }

    function setWeatherURI(string memory weather, string memory tokenUri, uint256 tokenId) public onlyOwner {
        weatherToWeatherURI[weather] = tokenUri;
        overRideTokenIdToWeatherURI[tokenId] = tokenUri;
    }

    function tokenURI(uint256 tokenId) public view override (ERC721) returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        if(overRide == true){
            return overRideTokenIdToWeatherURI[tokenId % 4];
        }
        return weatherToWeatherURI[IWeatherFeed(weatherFeedAddress).weather()];
        // snow
        // rain
        // sun
        // clouds
    }

    function attemptPassword(string memory password) public returns (bytes32 requestId){
        Chainlink.Request memory req = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        req.add("password", password);
        requestId = sendChainlinkRequestTo(oracle, req, fee);
        requestIdToAttemptee[requestId] = msg.sender;
        emit attemptedPassword(requestId);
    }

    function fulfill(bytes32 _requestId, uint256 _data) public recordChainlinkFulfillment(_requestId)
    {   
        require(tokenIdTaken[0] == false, "This token is taken!");
        response = _data;
        if(response == 0){
            safeTransferFrom(ownerOf(0), requestIdToAttemptee[_requestId], 1);
            tokenIdTaken[0] = true; 
        }
        if (response == 1){
                safeTransferFrom(ownerOf(1), requestIdToAttemptee[_requestId], 1);
                tokenIdTaken[1] = true; 
        }
        if (response == 2){
                safeTransferFrom(ownerOf(2), requestIdToAttemptee[_requestId], 2);
                tokenIdTaken[2] = true; 
        }
        if (response == 3){
                safeTransferFrom(ownerOf(3), requestIdToAttemptee[_requestId], 3);
                tokenIdTaken[3] = true; 
        }
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
