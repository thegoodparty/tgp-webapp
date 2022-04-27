import promisify from 'cypress-promise';
import { dateUsHelper } from '../../../helpers/dateHelper';

describe('Privacy page', () => {
  let content;
  it('load Privacy page content', async () => {
    cy.visit('/privacy');
    ({content} = await promisify(
      cy.getPrivacyPageContent().then(response => response.body),
    ));
  });
  it('test Site Header', () => {
    cy.testSiteHeader();
  });
  it('test Site Footer', () => {
    cy.testSiteFooter();
  });
  it('privacy section', () => {
    cy.get('[data-cy=privacy-title]')
      .contains(content.title);
    cy.get('[data-cy=last-revisioin-label]')
      .contains('Last Revision');
    cy.get('[data-cy=last-revisioin-date]')
      .contains(dateUsHelper(content.lastModified));
  });
//   it('finds faq article', () => {
//     cy.get('[data-cy=faq]')
//       .should('have.length', content.faqArticles.length)
//       .each(($el, index) => {
//         cy.testFAQArticle($el, index, content.faqArticles[index]);
//       });
//   });
});
