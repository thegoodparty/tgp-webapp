
import { USER_COOKIE } from '../../constants';
import { parseCookie } from '../../support/utils';
import { APPLICATION_CARDS_1, step3Socials, step2Socials, leftLinks } from '../../../components/elections/application/fields';

describe('Application Flows 6', () => {
    it('test Application Page 6', () => {
        cy.signInWithDefaultUser();
        cy.visit(`/campaign-application/1/6`);
        cy.get('[data-cy=step-title]')
          .should('exist')
          .contains('Step 6: Highlight Key Endorsements');
        cy.get('[data-cy=step-description]')
          .should('exist')
          .contains(`Use this page to add any institutional endorsements you may have`);
    });
});
