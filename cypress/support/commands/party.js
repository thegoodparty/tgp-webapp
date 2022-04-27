Cypress.Commands.add('testFAQArticle', ($el, index, article) => {
    cy.wrap($el)
      .find('[data-cy=faq-article-link]')
      .click();
    cy.url().should('include', `?article=${article.id}`);
    cy.get('[data-cy=article-title]').contains(article.title);
  
    cy.get('[data-cy=was-helpful]').contains('Was this helpful?');
  
    cy.get('[data-cy=helpful-no]')
      .contains('No')
      .click();
    cy.get('[data-cy=feedback]').should('exist');
    cy.get('[data-cy=feedback-submit]').contains('SUBMIT');
    cy.get('[data-cy=article-bottom-close]').should('exist');
    cy.get('[data-cy=article-top-close]').click();
  });
  