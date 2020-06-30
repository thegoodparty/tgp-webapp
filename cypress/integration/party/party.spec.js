import { articlesHelper } from '../../support/utils';

describe('PartyPage', () => {
  beforeEach(() => {
    cy.visit('/party');
    cy.get('[data-cy=page-title]').contains('Party | The Good Party');
  });
  it('finds events section', () => {
    cy.get('[data-cy=events]').contains('Upcoming Online Events');
    cy.getCMSContent();
    cy.fixture('content').should(content => {
      cy.get('[data-cy=event]')
        .should('have.length', content.events.length)
        .each(($el, index) => {
          cy.testEventSnippet($el, content.events[index]);
        });
    });
    cy.get('[data-cy=events-link]')
      .contains('See All')
      .click();
    cy.url().should('include', '/party/events');
    cy.get('[data-cy=page-title]').contains('EventsPage');
  });
  it('finds FAQs section', () => {
    cy.get('[data-cy=faqs').contains('Top Questions');
    cy.fixture('content').should(content => {
      const partyFAQs = articlesHelper(content.faqArticles, 'party');
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
  it('finds ama link', () => {
    cy.get('[data-cy=ama')
      .contains('Ask a Question')
      .contains('Give a Suggestion')
      .click();
    cy.get('[data-cy=ama-dialog-title')
      .contains('Ask a Question')
      .contains('Give a Suggestion');
    cy.get('[data-cy=ama-dialog-submit').contains('Send');
    cy.get('[data-cy=ama-dialog-submit')
      .should('have.attr', 'href')
      .and(
        'include',
        'mailto:ask@thegoodparty.org?subject=Good%20Party%20Question&body=',
      );
    cy.get('[data-cy=ama-dialog-close').click();
    cy.get('[data-cy=ama-dialog-title').should('not.exist');
  });
});
