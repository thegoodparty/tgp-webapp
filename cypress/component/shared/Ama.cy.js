import TestComponent from '../TestComponent';
import Ama from '../../../components/shared/Ama';

describe('Ama.cy.js', () => {
  it('Should render component', () => {
    cy.mount(
        <TestComponent Component={Ama} />
    );
    cy.get('[data-cy=ama]')
      .should('exist')
      .contains('Ask a Question or')
      .contains('Give a Suggestion')
      .click();
    cy.get('[data-cy=ama-dialog-close]')
      .should('exist')
    cy.get('[data-cy=ama-dialog-title]')
      .should('exist')
      .contains('Ask a Question or')
      .contains('Give a Suggestion');

    cy.get('[data-cy=ama-dialog-submit]')
      .should('exist')
      .contains('Send');  
  });
});