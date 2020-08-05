import promisify from 'cypress-promise';

describe('Events', () => {
  let content;
  beforeEach(() => {
    cy.visit('/party/events');
    cy.get('[data-cy=page-title]').contains('EventsPage');
  });
  it('finds upcoming events', async () => {
    cy.get('[data-cy=upcoming-events-title]').contains(
      'Upcoming Online Events',
    );
    content = await promisify(
      cy.getCMSContent().then(response => response.body),
    );
    cy.get('[data-cy=upcoming-events] > [data-cy=event]')
      .should('have.length', content.events.length)
      .each(($el, index) => {
        cy.testEventSnippet($el, content.events[index]);
      });
  });
  it('finds past events', () => {
    cy.get('[data-cy=past-events-title]').contains('Past Events');
    cy.get('[data-cy=past-events] > [data-cy=event]')
      .should('have.length', content.pastEvents.length)
      .each(($el, index) => {
        cy.testEventSnippet($el, content.pastEvents[index], true);
      });
  });
});
