'use strict';

const {FakeRoundRepo} = require("./fakeRepo");

const {Requests, THROW} = require('../src/rps');

describe('play', () => {
    let observer, repo, requests;

    beforeEach(() => {
        repo = new FakeRoundRepo();
        requests = new Requests(repo);
    });

    describe('p1Wins', () => {

        beforeEach(() => {
            observer = jasmine.createSpyObj("observer", ["p1Wins"]);
        });

        it('rock vs scissors', () => {
            requests.playRound(THROW.ROCK, THROW.SCISSORS, observer);

            expect(observer.p1Wins).toHaveBeenCalled();
        });

        it('paper vs rock', () => {
            requests.playRound(THROW.PAPER, THROW.ROCK, observer);

            expect(observer.p1Wins).toHaveBeenCalled();
        });

        it('scissors vs paper', () => {
            requests.playRound(THROW.SCISSORS, THROW.PAPER, observer);

            expect(observer.p1Wins).toHaveBeenCalled();
        });
    });

    describe('p2Wins', () => {
        beforeEach(() => {
            observer = jasmine.createSpyObj("observer", ["p2Wins"]);
        });

        it('scissors vs rock', () => {
            requests.playRound(THROW.SCISSORS, THROW.ROCK, observer);

            expect(observer.p2Wins).toHaveBeenCalled();
        });

        it('rock vs paper', () => {
            requests.playRound(THROW.ROCK, THROW.PAPER, observer);

            expect(observer.p2Wins).toHaveBeenCalled();
        });

        it('paper vs scissors', () => {
            requests.playRound(THROW.PAPER, THROW.SCISSORS, observer);

            expect(observer.p2Wins).toHaveBeenCalled();
        });

    });

    describe('draw', () => {
        beforeEach(() => {
            observer = jasmine.createSpyObj("observer", ["draw"]);
        });

        it('rock vs rock', () => {
            requests.playRound(THROW.ROCK, THROW.ROCK, observer);

            expect(observer.draw).toHaveBeenCalled();
        });

        it('paper vs paper', () => {
            requests.playRound(THROW.PAPER, THROW.PAPER, observer);

            expect(observer.draw).toHaveBeenCalled();
        });

        it('scissors vs scissors', () => {
            requests.playRound(THROW.SCISSORS, THROW.SCISSORS, observer);

            expect(observer.draw).toHaveBeenCalled();
        });
    });

    describe('invalid', () => {
        beforeEach(() => {
            observer = jasmine.createSpyObj("observer", ["invalid"]);
        });

        it('rock vs sailboat', () => {
            requests.playRound(THROW.SCISSORS, 'sailboat', observer);

            expect(observer.invalid).toHaveBeenCalled();
        });

        it('sailboat vs rock', () => {
            requests.playRound('sailboat', THROW.SCISSORS, observer);

            expect(observer.invalid).toHaveBeenCalled();
        });

        it('sailboat vs sailboat', () => {
            requests.playRound('sailboat', 'sailboat', observer);

            expect(observer.invalid).toHaveBeenCalled();
        });
    });
});
