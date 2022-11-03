import TestComponent from '../TestComponent';
import It from '../../../components/shared/It';


describe('It.cy.js', () => {
  it('Should render component', () => {
    cy.mount(
        <TestComponent Component={It} />
    );
    const points = [
        { title: 'is the system', content: 'that tears away our hopes' },
        { title: 'is the duopoly', content: 'that fights to keep us divided' },
        { title: 'is the rat race', content: 'that consumes our lives' },
    ];
    cy.get('[data-cy=it-title]')
      .should('exist')
      .contains('It')
      .click();
    
    cy.get('[data-cy=it-tooltip-title]')
      .should('exist')
      .contains('It');
 
    cy.get('[data-cy=it-point]')
      .should('have.length', points.length)
      .each(($el, index) => {
        cy.wrap($el)
          .get('[data-cy=it-point-title]')
          .contains(points[index].title);
      });
    cy.get('[data-cy="mainfesto-link"]')
      .should('have.attr', 'href', `/manifesto`)
      .contains('Read our Manifesto');
  });
})