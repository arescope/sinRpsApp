import React from 'react';
import * as ReactDOM from "react-dom";
import ReactTestUtils from "react-dom/test-utils";
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
                playRound: (p1, p2, observer) => observer.invalid()
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
                playRound: function (p1, p2, observer) {
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
                playRound: function (p1, p2, observer) {
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
                playRound: function (p1, p2, observer) {
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

    it("sends the user input to the game module", function () {
        let playSpy = jasmine.createSpy()

        renderApp({playRound: playSpy})

        fillIn("p1Throw", "foo")
        fillIn("p2Throw", "bar")

        submitForm()

        //verify the game logic received those inputs
        expect(playSpy).toHaveBeenCalledWith("foo", "bar", jasmine.any(Object))
    })

    function fillIn(inputName, inputValue) {
        let input = document.querySelector(`[name='${inputName}']`)
        input.value = inputValue
        ReactTestUtils.Simulate.change(input)
    }

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