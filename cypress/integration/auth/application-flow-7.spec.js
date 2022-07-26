
import { USER_COOKIE } from '../../constants';
import { parseCookie } from '../../support/utils';
import { APPLICATION_CARDS_1, step3Socials, step2Socials, leftLinks } from '../../../components/elections/application/fields';

describe('Application Flows 7', () => {
    it('test Application Page 7', () => {
        cy.signInWithDefaultUser();
        cy.visit(`/campaign-application/1/7`);
        cy.get('[data-cy=step-title]')
          .should('exist')
          .contains('Step 7: Review Application Checklist');
    });
});
