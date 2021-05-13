pragma solidity ^0.6.6;

interface IWeatherFeed {
  function weather() external view returns (string memory);
}
