import promisify from 'cypress-promise';

const id = 37;

let state = {}, candidate, candidatePositions;
describe('Candidate Portal - Top Issues', () => {
    it('test Site Footer', () => {
        cy.signInWithDefaultUser();
        cy.visit(`/candidate-portal/top-issues/${id}`);
        cy.testSiteFooter();
    });
    
    it('load CampaignCandidate', async () => {
        const content = await promisify(
            cy.getCampaignCandidate(id).then(response => response.body),
        );
        ({ candidate } = content);
    });

    it('load CampaignCandidatePositions', async () => {
        const content = await promisify(
            cy.getCampaignCandidatePositions(id).then(response => response.body),
        );
        ({ candidatePositions } = content);
    });
    it('test Top Issues List', () => {
      
        // cy.get('[data-cy=page-title]')
        //   .contains('Edit Campaign Issues');
        cy.get('[data-cy=top-issue-title]')
          .contains('Issues');
        cy.get('[data-cy=position-index]')
          .should('have.length', candidatePositions.length)
          .each(($el, index) => {
            cy.wrap($el)
              .contains(index + 1);
        });
        cy.get('[data-cy=position-issue-name]')
          .should('have.length', candidatePositions.length)
          .each(($el, index) => {
            cy.wrap($el)
              .contains(candidatePositions[index].topIssue?.name);
        });
        cy.get('[data-cy=position-pos-name]')
          .should('have.length', candidatePositions.length)
          .each(($el, index) => {
            cy.wrap($el)
              .contains(candidatePositions[index].position?.name);
        });
        cy.get('[data-cy=position-description]')
          .should('have.length', candidatePositions.length)
          .each(($el, index) => {
            cy.wrap($el)
              .contains(candidatePositions[index].description);
        });
    });
});
