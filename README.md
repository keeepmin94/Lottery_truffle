# Lottery_truffle
Lottery_truffle

# Gamblig Game DApp
## 여러가지 방법으로 랜덤한 값을 구해 player중에 우승자를 정하는 게임입니다.

블록체인은 결정론적인 환경 시스템이기 떄문에 블록체인에서는 랜덤값 생성 어렵습니다.
그래서 이 Dapp에서는 3가지 방법으로 랜덤한 값을 구해옵니다.

1. 블록의 상태값을 이용한 랜덤값 생성 방법(PRNG)) (불완전한 방법)
2. commit & reveal 패턴 (첫번째의 문제를 보완)(랜덤값 생성을 별개의 절차로 나눔)
3. 체인링크의 VRF(Verifiable Random Function)를 이용한 랜덤값 생성 방법 (외부 오라클 제공)

참가자들이 참여하고 우승자를 정하는 Contract를 solidity로 만들고 
Contract의 함수가 제대로 작동하는지 꼼꼼한 test.js 파일을 구현합니다.

또한 Contract에서 가져온 데이터를 다룰수있는 express 백엔드 서버를 구현합니다.
