describe('Events', () => {
  beforeEach(() => {
    cy.visit('/party/events');
    cy.get('[data-cy=page-title]').contains('EventsPage');
  });
  it('finds upcoming events', () => {
    cy.get('[data-cy=upcoming-events-title]').contains(
      'Upcoming Online Events',
    );
    cy.getCMSContent().should(response => {
      cy.writeFile('cypress/fixtures/content.json', response.body);
    });
    cy.fixture('content').should(content => {
      cy.get('[data-cy=upcoming-events] > [data-cy=event]')
        .should('have.length', content.events.length)
        .each(($el, index) => {
          cy.testEventSnippet($el, content.events[index]);
        });
    });
  });
  it('finds past events', () => {
    cy.get('[data-cy=past-events-title]').contains('Past Events');
    cy.getCMSContent().should(response => {
      cy.writeFile('cypress/fixtures/content.json', response.body);
    });
    cy.fixture('content').should(content => {
      cy.get('[data-cy=past-events] > [data-cy=event]')
        .should('have.length', content.pastEvents.length)
        .each(($el, index) => {
          console.log('pastEvents1', content.pastEvents[index]);
          cy.testEventSnippet($el, content.pastEvents[index], true);
        });
    });
  });
});
