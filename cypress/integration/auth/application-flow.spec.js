
import promisify from 'cypress-promise';
import { APPLICATION_CARDS_1 } from '../../../utils/constants';
import { USER_COOKIE } from '../../constants';
import { parseCookie } from '../../support/utils';
import { step3Socials, step2Socials, leftLinks } from '../../../components/elections/application/fields';

describe('Application Flows', () => {
    const user = parseCookie(USER_COOKIE);
    let applicationId;
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
        // cy.visit('/profile/campaigns');
        // cy.get('[data-cy=start-application]')
        //   .should('exist')
        //   .click();
        // cy.wait(1000);
        // cy.location().should((location) => {
        //     console.log(location.pathname.split('/'))
        //     applicationId=location.pathname.split('/')[2]
        // });
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
    it('test Application Page 2', () => {
        cy.signInWithDefaultUser();
        cy.visit(`/campaign-application/1/2`);
        cy.get('[data-cy=step-title]')
          .should('exist')
          .contains('Step 2: Add Candidate Details');
    });
    it('test Application Page 3', () => {
        cy.signInWithDefaultUser();
        cy.visit(`/campaign-application/1/3`);
        cy.get('[data-cy=step-title]')
          .should('exist')
          .contains('Step 3: Add Campaign Details');
    });
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
    it('test Application Page 5', () => {
        cy.signInWithDefaultUser();
        cy.visit(`/campaign-application/1/5`);
        cy.get('[data-cy=step-title]')
          .should('exist')
          .contains('Step 5: Select Top Issues');
        cy.get('[data-cy=step-subtitle]')
          .should('exist')
          .contains('Please select up to top five (5) issue you are aligned with to help');
    });
    it('test Application Page 6', () => {
        cy.signInWithDefaultUser();
        cy.visit(`/campaign-application/1/6`);
        cy.get('[data-cy=step-title]')
          .should('exist')
          .contains('Step 6: Highlight Key Endorsements');
        cy.get('[data-cy=step-subtitle]')
          .should('exist')
          .contains(`Use this page to add any institutional endorsements you may have`);
    });
    it('test Application Page 7', () => {
        cy.signInWithDefaultUser();
        cy.visit(`/campaign-application/1/7`);
        cy.get('[data-cy=step-title]')
          .should('exist')
          .contains('Step 7: Review Application Checklist');
    });
});
