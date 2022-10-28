import promisify from 'cypress-promise';
import CandidateCard from '../../../components/shared/CandidateCard';
import TestComponent from '../TestComponent';

const sampleCandidateList = [36, 30, 43];

context('CandidateCard.cy.js', () => {
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
            Component={CandidateCard}
            candidate={candidate}
          />
        );
        const {
          id,
          firstName,
          lastName,
          positions,
        } = candidate;
        cy.get('[data-cy="candidate-link"]')
          .should('have.attr', 'href');
        cy.get('[data-cy="candidate-name"]')
          .should('contain', firstName)
          .contains(lastName);
        if(positions) {
          cy.get('[data-cy=position]')
          .should('have.length', positions.length) 
          .each(($el, index) => {
            cy.wrap($el)
              .contains(positions[index].name);
          });
        }
        // cy.get('[data-cy="candidate-view"]')
        //   .contains('View');
      });
    });
  });
})