describe('HomePage', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('finds correct text', () => {
    cy.get('[data-cy=login]').contains('Login');
    cy.get('[data-cy=register]').contains('Sign-Up');
    cy.get('[data-cy=title]').contains('Power and Money have corrupted');
    cy.get('[data-cy=subtitle]').contains('Imagine a simple new way');
    cy.get('[data-cy=enter-link]').should('have.attr', 'href','/intro/splash');
  });
});
