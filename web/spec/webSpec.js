import React from 'react';
import * as ReactDOM from "react-dom";
import {RPSApp} from "../src/RPSApp";

describe("play form", function () {
    describe('when the play use case tells the UI that the input is invalid', () => {
        it('tells the user that their input is invalid', () => {
            let domFixture = document.createElement('div');

            document.body.appendChild(domFixture);

            let alwaysInvalidRequest = {
                play: (p1, p2, observer) => observer.invalid()
            };

            ReactDOM.render(
                <RPSApp request={alwaysInvalidRequest}/>,
                domFixture
            );

            document.querySelector('button').click();
            expect(domFixture.innerText).toContain('INVALID!')
        });

    });
})