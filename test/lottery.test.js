const Lottery = artifacts.require("Lottery");
const should = require("chai").should();
const { expect } = require("chai");
const truffleAssert = require("truffle-assertions");

//contract는 async 못씀(제공X)
contract("Lottery", (accounts) => {
  console.log(accounts);

  let lottery;

  before(async () => {
    lottery = await Lottery.deployed();
    console.log(lottery.address);
  });

  describe("Constructor", () => {
    it("Owner should be set to accounts[0]", async () => {
      const owner = await lottery.owner();
      assert.equal(owner, accounts[0]);
      expect(owner).to.equal(accounts[0]);
      owner.should.equal(accounts[0]); //import해야 쓸수있음
    });
  });

  describe("Enter", () => {
    it("Should revert if a player enters less than 0.01 ether", async () => {
      const enterAmt = web3.utils.toWei("0.009", "ether");
      console.log(`enterAmt: ${enterAmt}`);

      await truffleAssert.reverts(
        lottery.enter({ from: accounts[1], value: enterAmt })
      );
    });

    it("Enter 3 players and check values", async () => {
      const enterAmt = web3.utils.toWei("0.01", "ether");
      console.log(`enterAmt: ${enterAmt}`);

      // player1 enter
      await lottery.enter({ from: accounts[1], value: enterAmt });

      // check values
      // assert
      assert.equal(await lottery.getBalance(), enterAmt);
      assert.deepEqual(await lottery.getPlayers(), [accounts[1]]); //array끼리 체크는 deep을 사용(서로 다른 객체더라도 그 안에 value가 같은지)
      //expect
      expect((await lottery.getBalance()).toString()).to.equal(enterAmt); //getBalance는 bigNumber을 리턴, enterAmt은 string이라 toString()사용
      expect(await lottery.getPlayers()).to.deep.equal([accounts[1]]);
      //should
      (await lottery.getBalance()).toString().should.equal(enterAmt);
      (await lottery.getPlayers()).should.deep.equal([accounts[1]]);

      // player2 enter
      await lottery.enter({ from: accounts[2], value: enterAmt });
      assert.equal(
        await lottery.getBalance(),
        web3.utils.toBN(enterAmt).mul(web3.utils.toBN(2)).toString()
      ); //enterAmt*2(2번째 플레이어니까) 하기위해 빅넘버의 mul(곱하기)함수를 사용. mul안에도 빅넘버로 치환, 빅넘버가 문제될떈 string으로...
      assert.deepEqual(await lottery.getPlayers(), [accounts[1], accounts[2]]); //array끼리 체크는 deep을 사용(서로 다른 객체더라도 그 안에 value가 같은지)

      // player3 enter
      await lottery.enter({ from: accounts[3], value: enterAmt });
      assert.equal(
        await lottery.getBalance(),
        web3.utils.toBN(enterAmt).mul(web3.utils.toBN(3)).toString()
      );
      assert.deepEqual(await lottery.getPlayers(), [
        accounts[1],
        accounts[2],
        accounts[3],
      ]);
    });
  });

  describe("PickWinner", () => {
    it("Should revert if PickWinner is called by not owner", async () => {
      await truffleAssert.reverts(lottery.pickWinner({ from: accounts[1] }));
    });

    it("PickWinner", async () => {
      console.log(">>> before pickWinner");

      //check players ETH balance before pickWinner
      const account1ETHBal_bef = await web3.eth.getBalance(accounts[1]);
      console.log(`account1's ETH balance: ${account1ETHBal_bef}`);
      console.log(
        `account1's ETH balance to ether: ${account1ETHBal_bef / 10 ** 18}`
      );
      const account2ETHBal_bef = await web3.eth.getBalance(accounts[2]);
      console.log(`account2's ETH balance: ${account2ETHBal_bef}`);
      const account3ETHBal_bef = await web3.eth.getBalance(accounts[3]);
      console.log(`account3's ETH balance: ${account3ETHBal_bef}`);

      console.log(">>> pickWinner");
      await lottery.pickWinner();

      console.log(">>> after pickWinner");

      const lotteryId = await lottery.lotteryId();
      console.log(`lotteryId: ${lotteryId}`);
      assert.equal(lotteryId, 1);

      const winner = await lottery.lotteryHistory(lotteryId - 1); //이전 회차 우승자
      console.log(`winner at lotteryID ${lotteryId - 1}: ${winner}`);

      //check players ETH balance after pickWinner
      const account1ETHBal_aft = await web3.eth.getBalance(accounts[1]);
      console.log(`account1's ETH balance: ${account1ETHBal_aft}`);
      console.log(
        `account1's ETH balance to ether: ${account1ETHBal_bef / 10 ** 18}`
      );
      const account2ETHBal_aft = await web3.eth.getBalance(accounts[2]);
      console.log(`account2's ETH balance: ${account2ETHBal_aft}`);
      const account3ETHBal_aft = await web3.eth.getBalance(accounts[3]);
      console.log(`account3's ETH balance: ${account3ETHBal_aft}`);

      console.log(
        `account1's ETH balance difference: ${web3.utils
          .toBN(account1ETHBal_aft)
          .sub(web3.utils.toBN(account1ETHBal_bef))}`
      );
      console.log(
        `account2's ETH balance difference: ${web3.utils
          .toBN(account2ETHBal_aft)
          .sub(web3.utils.toBN(account2ETHBal_bef))}`
      );
      console.log(
        `account3's ETH balance difference: ${web3.utils
          .toBN(account3ETHBal_aft)
          .sub(web3.utils.toBN(account3ETHBal_bef))}`
      );
    });
  });
});
