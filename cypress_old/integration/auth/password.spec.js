import promisify from 'cypress-promise';
import { parseCookie } from '../../support/utils';

describe('Password Modal', () => {
  let user;
  it('check password modal with signed user', async () => {
    // Email Signed User
    cy.signInWithEmail();
    user = await promisify(
      cy.getCookie('user').then(cookie => parseCookie(cookie.value)),
    );
    cy.checkChangePasswordModal(user.hasPassword);

    // Social Signed User
    cy.signInWithDefaultUser();
    user = await promisify(
      cy.getCookie('user').then(cookie => parseCookie(cookie.value)),
    );
    cy.checkChangePasswordModal(user.hasPassword);
  });
});
