
import { USER_COOKIE } from '../../constants';
import { parseCookie } from '../../support/utils';

describe('Settings Page', () => {
    let user;
    it('test Settings', () => {
        cy.signInWithDefaultUser();
        cy.visit('/profile/settings');
        user = parseCookie(USER_COOKIE);
        cy.get('[data-cy=settings-title]')
          .contains('Settings');
        cy.get('[data-cy=setting-password-title]')
          .contains(`${user.hasPassword ? 'Change' : 'Create'} your password`);
        cy.get('[data-cy=delete-account-title]')
          .contains('Danger Zone - Delete your account');
    });
});
