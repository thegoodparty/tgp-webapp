import { dateUsHelper } from '../../../app/helpers/dateHelper';

Cypress.Commands.add('checkRegisterText', (blocName = false) => {
  if (blocName) {
    cy.get('[data-cy=title]').contains(`Join ${blocName}`);
    cy.get('[data-cy=description]')
      .should('contain', 'Sign-up to be counted')
      .and('contain', 'notify you if we can win!');
  } else {
    cy.get('[data-cy=title]').contains('Join The Good Party');
    cy.get('[data-cy=description]')
      .should('contain', 'Have your choices count and')
      .and('contain', 'fix politics for Good!');
  }
});
Cypress.Commands.add('checkSocialLoginSection', () => {
  cy.get('[data-cy=facebook-login]')
    .contains('Continue with Facebook')
    .click();
  cy.get('alert').should('not.exist');
  cy.get('[data-cy=google-login]')
    .find('div.google')
    .contains('Continue with GOOGLE')
    .click();
  cy.get('alert').should('not.exist');
});

Cypress.Commands.add('checkEmailRegisterSection', () => {
  cy.get('[data-cy=email-register]')
    .should('contain', 'CONTINUE WITH EMAIL')
    .should('have.attr', 'href')
    .and('contain', '/you/register-email');
  cy.get('[data-cy=email-register]').click();
  cy.checkEmailRegisterPage();
});
Cypress.Commands.add('checkLoginConfirmPage', email => {
  cy.wait(2000);
  cy.url().should('include', '/login/confirm');
  cy.get('[data-cy=page-title]').contains('Login Code Confirmation');
  cy.get('[data-cy=title]').should('contain', `A code was sent to ${email}`);
  cy.get('[data-cy=return-link]')
    .should('contain', `Didn’t receive the code?`)
    .should('have.attr', 'href')
    .and('contain', '/login');
  cy.get('[data-cy=submit]')
    .find('button')
    .should('contain', 'Confirm');
});

Cypress.Commands.add('checkLoginPartAndPrivacySection', () => {
  cy.get('[data-cy=login-wrapper]')
    .should('contain', 'Have an account?')
    .find('[data-cy=login]')
    .should('contain', 'Sign In')
    .should('have.attr', 'href')
    .and('contain', '/login');
  cy.get('[data-cy=policy-wrapper]')
    .should('contain', 'By signing up, you agree to the')
    .find('[data-cy=policy]')
    .should('contain', 'Privacy Policy')
    .should('contain', 'Terms of Service.')
    .should('have.attr', 'href')
    .and('contain', '/privacy');
  cy.get('[data-cy=policy-wrapper]')
    .find('[data-cy=policy]')
    .click();
  cy.checkPrivacyPage();
});
Cypress.Commands.add('checkPrivacyPage', () => {
  cy.url().should('include', '/privacy');
  cy.get('[data-cy=page-title]').contains('Privacy Policy | The Good Party');
  cy.getCMSContent();
  cy.fixture('content').should(content => {
    cy.get('[data-cy=title]').contains(content.privacyPage.title);
    cy.get('[data-cy=last-revisioin-label]').contains('Last Revision');
    cy.get('[data-cy=last-revisioin-date]').contains(
      dateUsHelper(content.privacyPage.lastModified),
    );
  });
});
Cypress.Commands.add('checkEmailRegisterPage', () => {
  const email = Cypress.env('email');
  const fullName = Cypress.env('fullName');

  cy.url().should('include', '/you/register-email');
  cy.get('[data-cy=page-title]').contains('Register to the Good Party');
  cy.get('[data-cy=title]').contains('Join The Good Party');
  cy.get('[data-cy=description]').contains(
    'Please enter your info, so we can count your support and notify you as we make progress.',
  );
  cy.get('[data-cy=full-name]')
    .find('label')
    .should('contain', 'Full Name');
  cy.get('[data-cy=full-name]')
    .type(fullName)
    .find('p')
    .should('contain', 'We will never show your full name on our site.');
  cy.get('[data-cy=email]')
    .find('label')
    .should('contain', 'Email');
  cy.get('[data-cy=email]')
    .type(email)
    .find('p')
    .should(
      'contain',
      'We will never share or sell your information for any reason',
    );
  cy.get('[data-cy=submit]')
    .find('button')
    .should('contain', 'Submit')
    .click();
  // check login confirm page
  cy.checkLoginConfirmPage(email);
});
