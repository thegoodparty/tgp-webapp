import promisify from 'cypress-promise';
import FollowButtonWrapper from '../../../components/shared/FollowButtonWrapper';
import TestComponent from '../TestComponent';

const sampleCandidateList = [36, 30, 43];

context('FollowButtonWrapper.cy.js', () => {
  let candidate;
  sampleCandidateList.forEach(candidateId => {
    describe(`check candidate card - ${candidateId}`, () => {
      it(`loads candidate data`, async () => {
          candidate = await promisify(
              cy.getCandidate(candidateId).then(response => response.body),
          );
          candidate = candidate.candidate;
      });
      it(`should render card without follow button`, () => {
        cy.mount(
          <TestComponent 
            Component={FollowButtonWrapper}
            testCandidate={candidate}
          />
        );
        
        cy.get('[data-cy="candidate-follow-btn"]')
          .should('contain', 'FOLLOW')
          .click();
        cy.get('[data-cy="follow-modal-title"]')
          .should('contain', 'Sign Up');
        cy.get('[data-cy="follow-modal-subtitle"]')
          .should('contain', 'Get Good Party updates and track indie campaigns near you!');
        cy.get('[data-cy="follow-modal-already-signed-up"]')
          .should('contain', 'Already signed up?');
        cy.get('[data-cy="follow-modal-login"]')
          .should('have.attr', 'href', '/?login=true')
          .contains('Login');
        cy.get('[data-cy="follow-gp-logo"]')
          .should('exist');
      });
    });
  });
})