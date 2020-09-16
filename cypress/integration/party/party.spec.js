import promisify from 'cypress-promise';

describe('PartyPage', () => {
  beforeEach(() => {
    cy.visit('/party');
    cy.get('[data-cy=page-title]').contains('Party | The Good Party');
  });
  it('finds events section', async () => {
    const content = await promisify(
      cy.getCMSContent().then(response => response.body),
    );
    if (content.events.length > 0) {
      cy.get('[data-cy=events]').contains('Upcoming Online Events');
      cy.get('[data-cy=event]')
        .should('have.length', content.events.length)
        .each(($el, index) => {
          cy.testEventSnippet($el, content.events[index]);
        });
      cy.get('[data-cy=events-link]')
        .contains('See All')
        .click();
      cy.url().should('include', '/party/events');
      cy.get('[data-cy=page-title]').contains('EventsPage');
    }
  });
  it('finds ama link', () => {
    cy.testAmaContainer();
  });
  it('finds top questions section', () => {
    cy.testTopQueSection('party');
  });
});
