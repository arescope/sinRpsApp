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

function Requests() {
    this.playRound = (player1, player2, observer) => {
        new PlayRoundRequest(player1, player2, observer).process();
    }
}


function PlayRoundRequest(p1, p2, observer) {
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
            observer.invalid();
        } else if (draw()) {
            observer.draw();
        } else if (p1Wins()) {
            observer.p1Wins();
        } else {
            observer.p2Wins();
        }
    }
}

module.exports = {Requests, THROW}
module.exports = {Requests, THROW, Round}
