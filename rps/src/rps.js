const THROW = {
    ROCK: 'rock',
    PAPER: 'paper',
    SCISSORS: 'scissors'
};

const VALID_THROWS = [THROW.ROCK, THROW.PAPER, THROW.SCISSORS];

function Round(p1Throw, p2Throw, result) {
    this.p1Throw = p1Throw;
    this.p2Throw = p2Throw;
    this.result = result;
}

function Requests(repo) {
    this.playRound = (player1, player2, observer) => {
        new PlayRoundRequest(player1, player2, observer, repo).process();
    }
    this.getHistory = (observer) => {
        if (repo.isEmpty()) {
            observer.noRounds();
        } else {
            observer.rounds(repo.getAll());
        }
    }
}


function PlayRoundRequest(p1, p2, observer, repo) {
    function draw() {
        return p1 === p2;
    }

    function p1Wins() {
        return (p1 === THROW.ROCK && p2 === THROW.SCISSORS) ||
            (p1 === THROW.PAPER && p2 === THROW.ROCK) ||
            (p1 === THROW.SCISSORS && p2 === THROW.PAPER);
    }

    function invalid(choice) {
        return !VALID_THROWS.includes(choice);
    }

    this.process = () => {
        if (invalid(p1) || invalid(p2)) {
            repo.save(new Round(p1, p2, 'invalid'))
            observer.invalid();
        } else if (draw()) {
            repo.save(new Round(p1, p2, 'draw'))
            observer.draw();
        } else if (p1Wins()) {
            repo.save(new Round(p1, p2, 'p1Wins'))
            observer.p1Wins();
        } else {
            repo.save(new Round(p1, p2, 'p2Wins'))
            observer.p2Wins();
        }
    }
}

module.exports = {Requests, THROW, Round}
