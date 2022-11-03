import TestComponent from '../TestComponent';
import TopQuestions from '../../../components/shared/TopQuestions';
describe('TopQuestions.cy.js', () => {
  it('Should render component without articles', () => {
    cy.mount(
      <TestComponent Component={TopQuestions} articles={[]} />
    );
    cy.get('[data-cy=faqs]')
      .should('exist')
      .contains('Top Questions');
    cy.get('[data-cy=faqs-see-link]')
      .should('exist')
      .should('have.attr', 'href', '/faqs')
      .contains('See FAQ');
    cy.get('[data-cy=faq-title]')
      .should('have.length', 0);
  });
  it('Should render component with articles', () => {
    const articles = [
      {
        id: 1,
        title: "Test 1"
      },
      {
        id: 2,
        title: "Test 2"
      },
      {
        id: 3,
        title: "Test 3"
      },
    ]
    cy.mount(
      <TestComponent Component={TopQuestions} articles={articles} />
    );
    cy.get('[data-cy=faqs]')
      .should('exist')
      .contains('Top Questions');
    cy.get('[data-cy=faqs-see-link]')
      .should('exist')
      .should('have.attr', 'href', '/faqs')
      .contains('See FAQ');
    cy.get('[data-cy=faq-title]')
      .should('have.length', articles.length)
      .each(($el, index) => {
        cy.wrap($el)
          .get('[data-cy=faq-title]')
          .contains(articles[index].title);
      });
  });
})