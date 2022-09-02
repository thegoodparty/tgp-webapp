describe('Manifesto page', () => {
  it('Page Content', () => {
    cy.visit('/manifesto');
    cy.get('[data-cy=manifesto-title]')
      .contains("The #goodparty Manifesto");
    cy.get('[data-cy=manifesto-subtitle]')
      .contains("for the love of us over");

    cy.get('[data-cy=manifesto-item-01]')
      .contains("is the system that tears away our hopes.");
    cy.get('[data-cy=manifesto-item-02]')
      .contains("is the money that corrupts our government.");
    cy.get('[data-cy=manifesto-item-03]')
      .contains("is the media that degrades our minds.");
    cy.get('[data-cy=manifesto-item-04]')
      .contains("is the doom loop that darkens our souls.");
    cy.get('[data-cy=manifesto-item-05]')
      .contains("the dark force of downward spirals.");
    cy.get('[data-cy=molock-link]')
      .should('have.attr', 'href', 'https://mindlevelup.wordpress.com/2016/10/23/canaanite-gods-explained/');
    cy.get('[data-cy=manifesto-item-06]')
      .contains("is what wants us divided and hopeless.");

    cy.get('[data-cy=manifesto-item-11]')
      .contains("doesn’t live.");
    cy.get('[data-cy=manifesto-item-12]')
      .contains("doesn’t love.");
    cy.get('[data-cy=manifesto-item-13]')
      .contains("has no friends.");
    cy.get('[data-cy=manifesto-item-14]')
      .contains("has no family.");
    cy.get('[data-cy=manifesto-item-15]')
      .contains("has no dreams.");
    cy.get('[data-cy=manifesto-item-16]')
      .contains("has no consciousness.");

    cy.get('[data-cy=manifesto-item-21]')
      .contains("We party to have fun.");
    cy.get('[data-cy=manifesto-item-22]')
      .contains("We party to get together with friends.");
    cy.get('[data-cy=manifesto-item-23]')
      .contains("We party to lighten our minds.");
    cy.get('[data-cy=manifesto-item-24]')
      .contains("We party to brighten our souls.");
    cy.get('[data-cy=manifesto-item-25]')
      .contains("We party to lift each other up.");
    cy.get('[data-cy=manifesto-item-26]')
      .contains("We party to be human.");
  });
  it('test Site Header', () => {
    cy.testSiteHeader();
  });
  it('test Site Footer', () => {
    cy.testSiteFooter();
  });
});
