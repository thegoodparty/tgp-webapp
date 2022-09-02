import promisify from 'cypress-promise';
import { faqArticleRoute } from '../../../helpers/faqHelper';

describe('FAQs page', () => {
  let content;
  it('load faqs', async () => {
    cy.visit('/faqs');
    ({content} = await promisify(
      cy.getFaqArticles().then(response => response.body),
    ));
  });
  it('test Site Header', () => {
    cy.testSiteHeader();
  });
  it('test Site Footer', () => {
    cy.testSiteFooter();
  });
  it('FAQS article section', () => {
    cy.get('[data-cy=faqs-page-title]').contains('Frequently Asked Questions');
    cy.get('[data-cy=faq-category]')
      .should('have.length', content.length)
      .each(($el, index) => {
        cy.wrap($el)
          .find('[data-cy=faq-category-title]')
          .contains(content[index].fields.name);
        cy.wrap($el)
          .find('[data-cy=faq-article]')
          .should('have.length', content[index].articles.length)
          .each(($el1, index1) => {
            cy.wrap($el1)
              .find('[data-cy=faq-article-link]')
              .should('have.attr', 'href', faqArticleRoute(content[index].articles[index1]))
              .contains(content[index].articles[index1].title);
          });
      });
  });
});
