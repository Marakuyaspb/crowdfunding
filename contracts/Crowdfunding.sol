// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Crowdfunding {
 address private owner;
 address[] private all_addresses;

 struct DonatorValue {
  uint256 value;
 }

 mapping (address => DonatorValue) donators;

 constructor() {
  owner = msg.sender;
 }

 function donate() public payable {
  require(msg.value > 0, "0! Are you sure?");

  if (donators[msg.sender].value == 0)
   all_addresses.push(msg.sender);
  donators[msg.sender].value += msg.value;
 }

 function transferOut(address payable addrOut, uint256 _value) external payable {
  require(msg.sender == owner, "Nobody but the owner can do it");
  (bool success, ) = addrOut.call{value: _value}("");
  require(success, "Transfer failed.");
 }

 function getAllDonators() public view returns (address[] memory) {
  return all_addresses;
 }

 function getDonationsOfAddess(address addr) public view returns (uint256) {
    return donators[addr].value;
 }

}