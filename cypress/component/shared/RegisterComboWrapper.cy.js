import TestComponent from '../TestComponent';
import RegisterComboWrapper from '../../../components/shared/RegisterComboWrapper';

describe('RegisterComboWrapper.cy.js', () => {
  it('Should render component', () => {
    const fields = [
        {
            name: 'email',
            type: 'email',
            placeholder: 'Email',
        },
        {
            name: 'name',
            type: 'text',
            placeholder: 'Name',
        },
        {
            name: 'zip',
            type: 'text',
            placeholder: 'Zip',
        },
    ];
    cy.mount(
        <TestComponent Component={RegisterComboWrapper} />
    );
    cy.get('[data-cy=register-combo-field]')
      .should('have.length', fields.length)
      .each(($el, index) => {
        // cy.wrap($el)
        //   .get('[data-cy=register-combo-field-form]')
        //   .should('have.attr', 'name', fields[index].name);
      });
    cy.get('[data-cy=register-combo-join]')
      .should('exist')
      .contains('JOIN US');
  });
});