describe('Events', () => {
  beforeEach(() => {
    cy.visit('/party/faqs');
    cy.get('[data-cy=page-title]').contains('FAQs | The Good Party');
  });
  it('finds faqs', () => {
    cy.get('[data-cy=faqs-page-title]').contains('Frequently Asked Q’s');
    cy.getCMSContent()
    cy.fixture('content').should(content => {
      cy.get('[data-cy=faq]')
        .should('have.length', content.faqArticles.length)
        .each(($el, index) => {
          cy.testFAQ($el, index, content.faqArticles[index]);
        });
    });
  });
  it('finds faq article', () => {
    cy.fixture('content').should(content => {
      cy.get('[data-cy=faq]')
        .should('have.length', content.faqArticles.length)
        .each(($el, index) => {
          cy.testFAQArticle($el, index, content.faqArticles[index]);
        });
    });
  });
});
