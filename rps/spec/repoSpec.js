const {Round} = require('../src/rps');
const {FakeRoundRepo} = require('./fakeRepo');


repoContract(FakeRoundRepo);

function repoContract(RoundRepo) {
    describe('FakeRoundRepo', () => {
        let repo;

        beforeEach(() => {
            repo = new RoundRepo();
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
}