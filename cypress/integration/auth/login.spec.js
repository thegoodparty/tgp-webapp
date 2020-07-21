// import 'cypress-localstorage-commands';

// describe('Login', () => {
//   it('Login through Google', () => {
//     const username = Cypress.env('googleSocialLoginUsername');
//     const password = Cypress.env('googleSocialLoginPassword');
//     const loginUrl = Cypress.env('loginUrl');
//     const cookieName = Cypress.env('cookieName');
//     const socialLoginOptions = {
//       username,
//       password,
//       loginUrl,
//       // headless: true,
//       logs: true,
//       isPopup: true,
//       loginSelector: '[data-cy=google-social-login]',
//       postLoginSelector: '.account-panel',
//       popupDelay: 5000,
//       loginSelectorDelay: 5000,
//       cookieDelay: 5000,
//       // getAllBrowserCookies: true,
//     };
//     return cy
//       .task('GoogleSocialLogin', socialLoginOptions)
//       .then(({ cookies }) => {
//         cy.clearCookies();
//         console.log('socialLogin', cookies);

//         const cookie = cookies
//           .filter(cookie => cookie.name === cookieName)
//           .pop();
//         if (cookie) {
//           cy.setCookie(cookie.name, cookie.value, {
//             domain: cookie.domain,
//             expiry: cookie.expires,
//             httpOnly: cookie.httpOnly,
//             path: cookie.path,
//             secure: cookie.secure,
//           });

//           Cypress.Cookies.defaults({
//             whitelist: cookieName,
//           });
//         }
//       });
//   });
// });
export { userDistrict } from '../../../app/helpers/userHelper';

describe('Login', () => {
  it('finds correct text', () => {
    cy.visit('/login');
    cy.get('[data-cy=page-title]').contains('Sign into your account');
    cy.get('[data-cy=title]').contains('Sign into your account');
    cy.get('[data-cy=register-label]').contains('t have an account?');
  });
  it('finds social login part', () => {
    cy.checkSocialLoginSection();
    cy.get('[data-cy=register]')
      .should('contain', `Create one`)
      .should('have.attr', 'href')
      .and('contain', '?register=true');
  });
  it('find email login part and check login confirm page', () => {
    // find email login part
    const email = Cypress.env('email');
    cy.get('[data-cy=email-input]')
      .should('exist')
      .type(email);
    cy.get('[data-cy=email-form]')
      .find('button')
      .should('contain', 'Submit')
      .click();

    // check login confirm page
    cy.checkLoginConfirmPage(email);
  });
});
