const {Round} = require('../src/rps');
const {FakeRoundRepo} = require('./fakeRepo');


describe('FakeRoundRepo', () => {
    let repo;

    beforeEach(() => {
        repo = new FakeRoundRepo();
    });

    describe('when there is no rounds', () => {
        it('is empty', () => {
            expect(repo.isEmpty()).toBeTruthy();
        });
    });

    describe('when there are rounds', () => {
        it('is not empty', () => {
            repo.save(new Round());

            expect(repo.isEmpty()).toBeFalsy();
        });

        it('returns saved rounds', () => {
            let round = new Round();

            repo.save(round);

            expect(repo.getAll()).toEqual([round]);
        });
    });
});
