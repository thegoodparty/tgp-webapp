import TestComponent from '../TestComponent';
import AlertDialog from '../../../components/shared/AlertDialog';

describe('AlertDialog.cy.js', () => {
  it('Should render component', () => {
    const params = {
        open: true,
        title: 'Test',
        description: 'Test Alert Dialog'
    }
    cy.mount(
        <TestComponent Component={AlertDialog} {...params}/>
    );
    cy.get('[data-cy=alert-dialog-title]')
      .should('exist')
      .contains(params.title);
    cy.get('[data-cy=alert-dialog-description]')
      .should('exist')
      .contains(params.description);
    cy.get('[data-cy=alert-dialog-cancel]')
      .should('exist')
      .contains('Cancel');
    cy.get('[data-cy=alert-dialog-proceed]')
      .should('exist')
      .contains('Proceed');
  });
});