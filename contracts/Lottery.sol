// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15; //^0.8.15 의미: 0.8.15 <= 허용 < 0.9.0

contract Lottery {
    address public owner;
    address payable[] public players;//address payable: ETH를 수신할 수 있는 address 타입
    //나중에 winner 선정시 players 리스트 중에 선정 -> winner는 ETH를 받으므로 address payable 타입이어야함

    constructor() {
        owner = msg.sender;
    }

    function getBalance() public view returns(uint256) {
        return address(this).balance;
    }

    //memory: players 값은 storage에 저장되어 있는 값이므로 이 내용을 읽어서 return하고자 할 경우엔 memory 타입이어야함
    function getPlayers() public view returns(address payable[] memory){
        return players;
    }

    //enter() 함수는 사용자로부터 ETH를 전송받을 목적의 함수이므로 payable 타입이어야함
    function enter() public payable {
        require(msg.value >= .01 ether, "msg.value should be greater than equal to 0.01 ether");
        players.push(payable(msg.sender));
    }

    function getRandomNumber() public view returns(uint256) {
        //abi.encodePacked(owner, block.timestamp): owner와 block.timestamp 각각을 bytes로 converting한 값을 concat한 값
        return uint256(keccak256((abi.encodePacked(owner, block.timestamp))));
    }
}

// 모든 컨트랙트 소스코드 상단에 SPDX License 정보를 주석으로 추가해줘야함
// MIT License: 누구나 무상으로 소스코드 사용 가능