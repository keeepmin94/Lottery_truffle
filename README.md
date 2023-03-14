# lottery-truffle
---
# 📖 목차 
 - [소개](#소개) 
 - [게임 방식](#게임-방식)
 - [개발 환경](#개발-환경)
 - [Lottery 서버](#서버)
---      
# 소개 

 - Lottery 스마트 컨트랙트를 통하여 게임 중개자 없이 투명한 플레이로 즐길 수 있는 **Gambling Game**

---
## 게임 방식
- 플레이어들이 게임에 참가
  - 참가시 참가비로 소정의 ether 필요 
- 컨트랙트 owner가 우승자를 랜덤하게 선정
  - 랜덤값을 구하는 방식이 다른 두개의 컨트랙트
- 플레이어들이 지불한 참가비가 모두 우승자에게 전송됨
- 회차가 종료되고 다음 회차 게임에 참여할 플레이어들이 다시 참가
  - 매 회차마다 winner history 누적

### Lottery 
- 블록 변수값을 이용
  - block.difficulty, block.number, block.timestamp 등
- 블록 해시를 이용

### CommitRevealLottery
- 참여자는 commit 기간 동안 secret 값을 생성 후 이를 해시하여 commit 한다.
- commit 기간이 끝나면, 공개(reveal) 기간동안 secret 값을 공개하며, 공개된 secret 값을 통해 seed 값이 계속 업데이트된다.
- 공개 기간이 끝나면, seed 값이 완성되는데 이는 안전한 랜덤값이다.


---
### 개발 환경
- 언어
    - Node.js
    - Solidity
- Deploy
    - Truffle
- Test
    - chai
    - truffle-assertions

---
### 서버
- 현재 Lottery 컨트랙트와 상호작용하는 API 서버
- https://github.com/keeepmin94/lottery-api-server
