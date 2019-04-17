describe('play', () => {
    let observer;

    describe('p1Wins', () => {

        beforeEach(() => {
            observer = jasmine.createSpyObj("observer", ["p1Wins"]);
        });

        it('rock vs scissors', () => {
            new Requests().play('rock', 'scissors', observer);

            expect(observer.p1Wins).toHaveBeenCalled();
        });

        it('paper vs rock', () => {
            new Requests().play('paper', 'rock', observer);

            expect(observer.p1Wins).toHaveBeenCalled();
        });

        it('scissors vs paper', () => {
            new Requests().play('scissors', 'paper', observer);

            expect(observer.p1Wins).toHaveBeenCalled();
        });
    });

    describe('p2Wins', () => {
        beforeEach(() => {
            observer = jasmine.createSpyObj("observer", ["p2Wins"]);
        });

        it('scissors vs rock', () => {
            new Requests().play('scissors', 'rock', observer);

            expect(observer.p2Wins).toHaveBeenCalled();
        });

        it('rock vs paper', () => {
            new Requests().play('rock', 'paper', observer);

            expect(observer.p2Wins).toHaveBeenCalled();
        });

        it('paper vs scissors', () => {
            new Requests().play('paper', 'scissors', observer);

            expect(observer.p2Wins).toHaveBeenCalled();
        });

    });

    describe('tie', () => {
        beforeEach(() => {
            observer = jasmine.createSpyObj("observer", ["tie"]);
        });

        it('rock vs rock', () => {
            new Requests().play('rock', 'rock', observer);

            expect(observer.tie).toHaveBeenCalled();
        });

        it('paper vs paper', () => {
            new Requests().play('paper', 'paper', observer);

            expect(observer.draw).toHaveBeenCalled();
        });

        it('scissors vs scissors', () => {
            new Requests().play('scissors', 'scissors', observer);

            expect(observer.draw).toHaveBeenCalled();
        });
    });

    describe('invalid', () => {
        beforeEach(() => {
            observer = jasmine.createSpyObj("observer", ["invalid"]);
        });

        it('rock vs sailboat', () => {
            new Requests().play('scissors', 'sailboat', observer);

            expect(observer.invalid).toHaveBeenCalled();
        });

        it('sailboat vs rock', () => {
            new Requests().play('sailboat', 'scissors', observer);

            expect(observer.invalid).toHaveBeenCalled();
        });

        it('sailboat vs sailboat', () => {
            new Requests().play('sailboat', 'sailboat', observer);

            expect(observer.invalid).toHaveBeenCalled();
        });
    });
});

function Requests() {
    this.play = (player1, player2, observer) => {
        if (['rock', 'paper', 'scissors'].includes(player1) === false ||
            ['rock', 'paper', 'scissors'].includes(player2) === false) {
            observer.invalid();
        } else if (player1 === player2) {
            observer.draw();
        } else if ((player1 === 'rock' && player2 === 'scissors') ||
            (player1 === 'paper' && player2 === 'rock') ||
            (player1 === 'scissors' && player2 === 'paper')) {
            observer.p1Wins();
        } else {
            observer.p2Wins();
        }
    }
}
