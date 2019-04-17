import React from 'react';
import * as ReactDOM from "react-dom";
import {RPSApp} from "../src/RPSApp";

describe("play form", () => {
    let domFixture;

    beforeEach(() => {
        domFixture = document.createElement('div');
        domFixture.id = 'reactApp';

        document.body.appendChild(domFixture);
    });

    afterEach(() => {
        domFixture.remove();
    });

    describe('the game logic reported that the input is invalid', () => {
        beforeEach(() => {
            renderApp({
                play: (p1, p2, observer) => observer.invalid()
            });
        });
        it('tells the user that their input is invalid', () => {
            expect(page()).not.toContain('INVALID!')

            submitForm();

            expect(page()).toContain('INVALID!')
        });

    });

    describe("the game logic reported that P1 won", function () {
        beforeEach(function () {
            renderApp({
                play: function (p1, p2, observer) {
                    observer.p1Wins()
                }
            });
        });

        it("displays 'P1 Wins!'", function () {
            expect(page()).not.toContain("P1 Wins!")
            submitForm()
            expect(page()).toContain("P1 Wins!")
        })
    });

    describe("the game logic reported that P2 won", function () {
        beforeEach(function () {
            renderApp({
                play: function (p1, p2, observer) {
                    observer.p2Wins()
                }
            });
        });


        it("displays 'P2 Wins!'", function () {
            expect(page()).not.toContain("P2 Wins!")
            submitForm()
            expect(page()).toContain("P2 Wins!")
        })
    });

    describe("the game logic reported that it was a draw", function () {
        beforeEach(function () {
            renderApp({
                play: function (p1, p2, observer) {
                    observer.draw()
                }
            });
        });

        it("displays 'DRAW'", function () {
            expect(page()).not.toContain("DRAW")
            submitForm()
            expect(page()).toContain("DRAW")
        });
    });

    function renderApp(useCases) {
        ReactDOM.render(
            <RPSApp requests={useCases}/>,
            domFixture
        );
    }

    function submitForm() {
        document.querySelector('button').click();
    }

    function page() {
        return domFixture.innerText;
    }
});