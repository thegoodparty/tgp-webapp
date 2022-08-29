import { APPLICATION_CARDS_1, leftLinks } from '../../../components/elections/application/fields';

describe('Application Flows 1', () => {
    it('test Application Page Wrapper', () => {
        cy.signInWithDefaultUser();
        cy.visit(`/campaign-application/1/1`);
        const topLinks = {};
        leftLinks.forEach((link) => {
            topLinks[link.step] = link;
        });
    });
    it('test Application Page 1', () => {
        cy.signInWithDefaultUser();
        cy.visit(`/campaign-application/1/1`);
        cy.get('[data-cy=step-title]')
          .should('exist')
          .contains('Step 1: Take the Good Party Pledge to get started');
        cy.get('[data-cy=step-subtitle]')
          .should('exist')
          .contains('Good Party candidates take a pledge to be')
          .contains('Honest, Independent and People-Powered');
        cy.get('[data-cy=step-card]')
          .should('have.length', APPLICATION_CARDS_1.length)
          .each(($el, index) => {
            cy.wrap($el)
              .find('[data-cy=step-card-title]')
              .should('exist')
              .contains(APPLICATION_CARDS_1[index].title);
            cy.wrap($el)
              .find('[data-cy=card-checkbox]')
              .should('have.length', APPLICATION_CARDS_1[index].checkboxes.length)
        });
    });
});
