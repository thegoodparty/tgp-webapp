
import { USER_COOKIE } from '../../constants';
import { parseCookie } from '../../support/utils';
import { APPLICATION_CARDS_1, step3Socials, step2Socials, leftLinks } from '../../../components/elections/application/fields';

describe('Application Flows 3', () => {
    it('test Application Page 3', () => {
        cy.signInWithDefaultUser();
        cy.visit(`/campaign-application/1/3`);
        cy.get('[data-cy=step-title]')
          .should('exist')
          .contains('Step 3: Add Campaign Details');
    });
});
