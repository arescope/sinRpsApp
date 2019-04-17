'use strict';

const {Requests, THROW} = require('../src/rps');

describe('play', () => {
    let observer;

    describe('p1Wins', () => {

        beforeEach(() => {
            observer = jasmine.createSpyObj("observer", ["p1Wins"]);
        });

        it('rock vs scissors', () => {
            new Requests().play(THROW.ROCK, THROW.SCISSORS, observer);

            expect(observer.p1Wins).toHaveBeenCalled();
        });

        it('paper vs rock', () => {
            new Requests().play(THROW.PAPER, THROW.ROCK, observer);

            expect(observer.p1Wins).toHaveBeenCalled();
        });

        it('scissors vs paper', () => {
            new Requests().play(THROW.SCISSORS, THROW.PAPER, observer);

            expect(observer.p1Wins).toHaveBeenCalled();
        });
    });

    describe('p2Wins', () => {
        beforeEach(() => {
            observer = jasmine.createSpyObj("observer", ["p2Wins"]);
        });

        it('scissors vs rock', () => {
            new Requests().play(THROW.SCISSORS, THROW.ROCK, observer);

            expect(observer.p2Wins).toHaveBeenCalled();
        });

        it('rock vs paper', () => {
            new Requests().play(THROW.ROCK, THROW.PAPER, observer);

            expect(observer.p2Wins).toHaveBeenCalled();
        });

        it('paper vs scissors', () => {
            new Requests().play(THROW.PAPER, THROW.SCISSORS, observer);

            expect(observer.p2Wins).toHaveBeenCalled();
        });

    });

    describe('draw', () => {
        beforeEach(() => {
            observer = jasmine.createSpyObj("observer", ["draw"]);
        });

        it('rock vs rock', () => {
            new Requests().play(THROW.ROCK, THROW.ROCK, observer);

            expect(observer.draw).toHaveBeenCalled();
        });

        it('paper vs paper', () => {
            new Requests().play(THROW.PAPER, THROW.PAPER, observer);

            expect(observer.draw).toHaveBeenCalled();
        });

        it('scissors vs scissors', () => {
            new Requests().play(THROW.SCISSORS, THROW.SCISSORS, observer);

            expect(observer.draw).toHaveBeenCalled();
        });
    });

    describe('invalid', () => {
        beforeEach(() => {
            observer = jasmine.createSpyObj("observer", ["invalid"]);
        });

        it('rock vs sailboat', () => {
            new Requests().play(THROW.SCISSORS, 'sailboat', observer);

            expect(observer.invalid).toHaveBeenCalled();
        });

        it('sailboat vs rock', () => {
            new Requests().play('sailboat', THROW.SCISSORS, observer);

            expect(observer.invalid).toHaveBeenCalled();
        });

        it('sailboat vs sailboat', () => {
            new Requests().play('sailboat', 'sailboat', observer);

            expect(observer.invalid).toHaveBeenCalled();
        });
    });
});
