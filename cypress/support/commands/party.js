Cypress.Commands.add('testEventSnippet', ($el, event, isPastEvent = false) => {
  let isLocationLink;
  let locationLink;
  const {
    title,
    displayDate,
    description,
    presenter,
    presenterTitle,
    location,
  } = event;
  if (location) {
    isLocationLink =
      location.indexOf('http') === 0 || location.indexOf('ama') === 0;
    locationLink =
      location.indexOf('ama') === 0 ? `http://${location}` : location;
  }
  cy.wrap($el)
    .find('[data-cy=event-title]')
    .contains(title);
  if (displayDate) {
    cy.wrap($el)
      .find('[data-cy=event-date]')
      .contains(displayDate);
  }
  if (description) {
    cy.wrap($el)
      .find('[data-cy=event-description]')
      .contains(description);
  }
  if (location) {
    cy.wrap($el)
      .find('[data-cy=event-location]')
      .contains('Location:');
    if (isLocationLink) {
      cy.wrap($el)
        .find('[data-cy=event-location-link]')
        .contains(location)
        .should('have.attr', 'href', locationLink);
    } else {
      cy.wrap($el)
        .find('[data-cy=event-location]')
        .contains(location);
    }
  }
  if (presenter) {
    cy.wrap($el)
      .find('[data-cy=event-presenter-name]')
      .contains(presenter);
    cy.wrap($el)
      .find('[data-cy=event-presenter]')
      .contains(presenterTitle);
  }
  if (!isPastEvent) {
    cy.wrap($el)
      .find('[data-cy=event-interested]')
      .should('have.attr', 'href', locationLink);
    cy.wrap($el)
      .find('[data-cy=event-interested]')
      .contains('M INTERESTED');
  }
});

Cypress.Commands.add('testFAQ', ($el, index, article) => {
  cy.wrap($el)
    .should('have.attr', 'href')
    .and('include', `?article=${article.id}`);
  cy.wrap($el)
    .find('[data-cy=faq-title]')
    .contains(article.title);
});

Cypress.Commands.add('testFAQArticle', ($el, index, article) => {
  cy.wrap($el)
    .find('[data-cy=faq-title]')
    .click();
  cy.url().should('include', `?article=${article.id}`);
  cy.get('[data-cy=page-title]').contains(
    article ? article.title : 'FAQ Article',
  );

  cy.get('[data-cy=article-title]').contains(article.title);

  cy.get('[data-cy=was-helpful]').contains('Was this helpful?');

  cy.get('[data-cy=helpful-no]')
    .contains('No')
    .click();
  cy.get('[data-cy=feedback]').should('exist');
  cy.get('[data-cy=feedback-submit]').contains('SUBMIT');
  cy.get('[data-cy=article-bottom-close]').should('exist');
  cy.get('[data-cy=article-back]').should('exist');
  cy.get('[data-cy=article-top-close]').click();
});
