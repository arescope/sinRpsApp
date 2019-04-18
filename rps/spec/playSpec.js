'use strict';

const {Requests, THROW} = require('../src/rps');

describe('play', () => {
    let observer;

    describe('p1Wins', () => {

        beforeEach(() => {
            observer = jasmine.createSpyObj("observer", ["p1Wins"]);
        });

        it('rock vs scissors', () => {
            new Requests().playRound(THROW.ROCK, THROW.SCISSORS, observer, repo);

            expect(observer.p1Wins).toHaveBeenCalled();
        });

        it('paper vs rock', () => {
            new Requests().playRound(THROW.PAPER, THROW.ROCK, observer, repo);

            expect(observer.p1Wins).toHaveBeenCalled();
        });

        it('scissors vs paper', () => {
            new Requests().playRound(THROW.SCISSORS, THROW.PAPER, observer, repo);

            expect(observer.p1Wins).toHaveBeenCalled();
        });
    });

    describe('p2Wins', () => {
        beforeEach(() => {
            observer = jasmine.createSpyObj("observer", ["p2Wins"]);
        });

        it('scissors vs rock', () => {
            new Requests().playRound(THROW.SCISSORS, THROW.ROCK, observer, repo);

            expect(observer.p2Wins).toHaveBeenCalled();
        });

        it('rock vs paper', () => {
            new Requests().playRound(THROW.ROCK, THROW.PAPER, observer, repo);

            expect(observer.p2Wins).toHaveBeenCalled();
        });

        it('paper vs scissors', () => {
            new Requests().playRound(THROW.PAPER, THROW.SCISSORS, observer, repo);

            expect(observer.p2Wins).toHaveBeenCalled();
        });

    });

    describe('draw', () => {
        beforeEach(() => {
            observer = jasmine.createSpyObj("observer", ["draw"]);
        });

        it('rock vs rock', () => {
            new Requests().playRound(THROW.ROCK, THROW.ROCK, observer, repo);

            expect(observer.draw).toHaveBeenCalled();
        });

        it('paper vs paper', () => {
            new Requests().playRound(THROW.PAPER, THROW.PAPER, observer, repo);

            expect(observer.draw).toHaveBeenCalled();
        });

        it('scissors vs scissors', () => {
            new Requests().playRound(THROW.SCISSORS, THROW.SCISSORS, observer, repo);

            expect(observer.draw).toHaveBeenCalled();
        });
    });

    describe('invalid', () => {
        beforeEach(() => {
            observer = jasmine.createSpyObj("observer", ["invalid"]);
        });

        it('rock vs sailboat', () => {
            new Requests().playRound(THROW.SCISSORS, 'sailboat', observer, repo);

            expect(observer.invalid).toHaveBeenCalled();
        });

        it('sailboat vs rock', () => {
            new Requests().playRound('sailboat', THROW.SCISSORS, observer, repo);

            expect(observer.invalid).toHaveBeenCalled();
        });

        it('sailboat vs sailboat', () => {
            new Requests().playRound('sailboat', 'sailboat', observer, repo);

            expect(observer.invalid).toHaveBeenCalled();
        });
    });
});
