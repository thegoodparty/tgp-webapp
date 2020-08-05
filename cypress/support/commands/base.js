import articlesHelper from '../../../app/helpers/articlesHelper';

Cypress.Commands.add('testAmaContainer', () => {
  cy.get('[data-cy=ama]')
    .contains('Ask a Question')
    .contains('Give a Suggestion')
    .click()
  cy.get('[data-cy=ama-dialog-submit]').contains('Send');
  cy.get('[data-cy=ama-dialog-close]').click();
  cy.get('[data-cy=ama-dialog-submit]').should('not.exist');

});

Cypress.Commands.add('testTopQueSection', filter => {
  cy.get('[data-cy=faqs]').contains('Top Questions');
  cy.getCMSContent();
  cy.fixture('content').should(content => {
    const partyFAQs = articlesHelper(content.faqArticles, filter);
    cy.get('[data-cy=faq]')
      .should('have.length', partyFAQs.length)
      .each(($el, index) => {
        cy.testFAQ($el, index, partyFAQs[index]);
      });
  });
  cy.get('[data-cy=faqs-link]')
    .contains('See FAQ')
    .click();
  cy.url().should('include', '/party/faqs');
  cy.get('[data-cy=page-title]').contains('FAQs | The Good Party');
});

Cypress.Commands.add('signInWithDefaultUser', () => {
  const cookie = Cypress.env('cookie');
  const token = Cypress.env('token');
  cy.setCookie('user', cookie);
  cy.setCookie('token', token);
  cy.reload();
});

Cypress.Commands.add('chooseCorrectZipcode', zipcode => {
  cy.visit('/intro/zip-finder');
  cy.get('[data-cy=zipcode]').type(zipcode);
  cy.get('[data-cy=submit]').click();
  cy.url().should('include', `/elections/district/${zipcode}`);
  cy.getCookie('zip').should('exist');
});