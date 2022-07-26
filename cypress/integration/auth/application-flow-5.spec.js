
import { USER_COOKIE } from '../../constants';
import { parseCookie } from '../../support/utils';
import { APPLICATION_CARDS_1, step3Socials, step2Socials, leftLinks } from '../../../components/elections/application/fields';

describe('Application Flows 5', () => {
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
});
