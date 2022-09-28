import promisify from 'cypress-promise';
import { USER_COOKIE } from '../../constants';
import { parseCookie } from '../../support/utils';

describe('Profile Page', () => {
    let user;
    it('test Profile', () => {
        cy.signInWithDefaultUser();
        cy.visit('/profile');
        user = parseCookie(USER_COOKIE);
        cy.get('[data-cy=profile-username]')
          .contains(user.name);
        cy.get('[data-cy=profile-edit-link')
          .should('have.attr', 'href', '/profile/settings')
          .contains('Edit');
        cy.get('[data-cy=profile-logout-link')
          .should('have.attr', 'href', '#')
          .contains('Sign Out');
    });
});
