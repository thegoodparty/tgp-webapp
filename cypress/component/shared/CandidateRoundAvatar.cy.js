import promisify from 'cypress-promise';
import CandidateRoundAvatar from '../../../components/shared/CandidateRoundAvatar';
import TestComponent from '../TestComponent';

const sampleCandidateList = [36, 30, 43];

context('CandidateRoundAvatar.cy.js', () => {
  let candidate;
  sampleCandidateList.forEach(candidateId => {
    describe(`check candidate round avatar - ${candidateId}`, () => {
      it(`loads candidate data`, async () => {
          candidate = await promisify(
              cy.getCandidate(candidateId).then(response => response.body),
          );
          candidate = candidate.candidate;
      });
      it(`should render avatar`, () => {
        cy.mount(
          <TestComponent 
            Component={CandidateRoundAvatar}
            candidate={candidate}
          />
        );
        const {
          isClaimed
        } = candidate;
        cy.get('[data-cy="candidate-img"]')
          .should('exist');
        if(isClaimed) {
            cy.get('[data-cy="certified-label"]')
              .should('exist')
              .contains('GOOD CERTIFIED');
            cy.get('[data-cy="certified-icon"]')
              .should('exist');
        }
        else {
            cy.get('[data-cy="certified-label"]')
              .should('not.exist');
            cy.get('[data-cy="certified-icon"]')
              .should('not.exist');
        }
      });
    });
  });
})