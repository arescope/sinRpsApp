fdescribe('repoTest', () => {
    describe('when there is no rounds', () => {
        it('is empty', () => {
            let repo = new FakeRoundRepo();

            expect(repo.isEmpty()).toBeTruthy();
        });
    });

    describe('when there are rounds', () => {
        it('is not empty', () => {

        });
    });
});

function FakeRoundRepo() {
    this.isEmpty = () => {
        return true;
    }
}
