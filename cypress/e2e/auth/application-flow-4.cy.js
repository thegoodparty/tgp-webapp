
import { step3Socials, step2Socials } from '../../../components/elections/application/fields';

describe('Application Flows 4', () => {
    it('test Application Page 4', () => {
        cy.signInWithDefaultUser();
        cy.visit(`/campaign-application/1/4`);
        cy.get('[data-cy=step-title]')
          .should('exist')
          .contains('Step 4: Add Social Media');
        cy.get('[data-cy=social-step-3-wrapper]')
          .should('have.length', step3Socials.length)
          .each(($el, index) => {
              if(step3Socials[index].adornment) {
                cy.wrap($el)
                  .find('[data-cy=social-step-3]')
                  .should('exist')
                  .contains(step3Socials[index].adornment);
              }
        });
        cy.get('[data-cy=step-subtitle]')
          .should('exist')
          .contains('Personal social media links for the candidate');
        cy.get('[data-cy=social-step-2-wrapper]')
          .should('have.length', step2Socials.length)
          .each(($el, index) => {
              if(step2Socials[index].adornment) {
                cy.wrap($el)
                  .find('[data-cy=social-step-2]')
                  .should('exist')
                  .contains(step2Socials[index].adornment);
              }
        });
    });
});
