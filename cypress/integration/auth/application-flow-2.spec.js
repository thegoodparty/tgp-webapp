
import { USER_COOKIE } from '../../constants';
import { parseCookie } from '../../support/utils';
import { APPLICATION_CARDS_1, step3Socials, step2Socials, leftLinks } from '../../../components/elections/application/fields';

describe('Application Flows 2', () => {
    it('test Application Page 2', () => {
        cy.signInWithDefaultUser();
        cy.visit(`/campaign-application/1/2`);
        cy.get('[data-cy=step-title]')
          .should('exist')
          .contains('Step 2: Add Candidate Details');
    });
});
