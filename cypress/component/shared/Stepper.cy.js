import TestComponent from '../TestComponent';
import Stepper from '../../../components/shared/Stepper';
describe('Stepper.cy.js', () => {
  it('Should render component', () => {
    const steps = ['Step 1'];
    cy.mount(
      <TestComponent Component={Stepper} steps={steps} />
    );
    cy.get('[data-cy=horiz-step-item]')
      .should('have.length', steps.length);
  });
})