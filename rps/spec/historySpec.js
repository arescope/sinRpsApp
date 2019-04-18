const {Requests, Round} = require("../src/rps")
const {FakeRoundRepo} = require("./fakeRepo")

describe("history", function () {
    let repo, requests;

    beforeEach(function () {
        repo = new FakeRoundRepo()
        requests = new Requests(repo)
    })

    describe("no rounds", function () {
        it("should tell the observer there are no rounds", function () {
            let observer = jasmine.createSpyObj("observer", ["noRounds"])

            requests.getHistory(observer)

            expect(observer.noRounds).toHaveBeenCalled()
        })
    })

    describe("rounds have been played", function () {
        it('should send the rounds to the UI', function () {
            let playRoundObserver = {
                invalid() {
                }, draw() {
                }, p1Wins() {
                }, p2Wins() {
                }
            }
            let observer = jasmine.createSpyObj("observer", ["rounds"])

            requests.playRound("rock", "sailboat", playRoundObserver)
            requests.playRound("rock", "rock", playRoundObserver)
            requests.playRound("rock", "scissors", playRoundObserver)
            requests.playRound("rock", "paper", playRoundObserver)

            requests.getHistory(observer)

            expect(observer.rounds).toHaveBeenCalledWith([
                new Round("rock", "sailboat", "invalid"),
                new Round("rock", "rock", "draw"),
                new Round("rock", "scissors", "p1Wins"),
                new Round("rock", "paper", "p2Wins"),
            ])
        });
    })
})