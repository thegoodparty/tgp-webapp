import promisify from 'cypress-promise';

const id = 37;

let state = {}, candidate, endorsements;
describe('Candidate Portal - Endorsements', () => {
    it('test Site Footer', () => {
        cy.signInWithDefaultUser();
        cy.visit(`/candidate-portal/endorsements/${id}`);
        cy.testSiteFooter();
    });
    
    it('load CampaignCandidate', async () => {
        const content = await promisify(
            cy.getCampaignCandidate(id).then(response => response.body),
        );
        ({ candidate } = content);
    });

    it('load Endorsements', async () => {
        const content = await promisify(
            cy.getEndorsements(id).then(response => response.body),
        );
        ({ endorsements } = content);
    });
    it('test Endorsement List', () => {
        // cy.get('[data-cy=page-title]')
        //   .contains('Edit Key Endorsers');
        cy.get('[data-cy=endorsements-title]')
          .contains('Endorsements');
        cy.get('[data-cy=add-endorsement]')
          .contains('Add Endorsement');
        cy.get('[data-cy=endorsement-item]')
          .should('have.length', endorsements.length)
          .each(($el, index) => {
            const { summary, id, image, link, title } = endorsements[index];
            cy.wrap($el)
              .find('[data-cy=endorsement-edit]')
              .contains('Edit');
            cy.wrap($el)
              .find('[data-cy=endorsement-edit-delete]')
              .contains('Delete');
            cy.wrap($el)
              .find('[data-cy=endorsement-info]')
              .contains(title)
              .contains(summary);
        });
    });
});
