const Lottery = artifacts.require("Lottery"); //artifacts.require(“Lottery”): Lottery 컨트랙트 정보가 담겨있음
//deployer: 컨트랙트 배포시 사용되는 인터페이스 객체
module.exports = function (deployer) {
  deployer.deploy(Lottery);
};
