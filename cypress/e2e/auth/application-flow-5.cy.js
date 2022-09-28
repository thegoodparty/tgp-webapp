describe('Application Flows 5', () => {
    it('test Application Page 5', () => {
        cy.signInWithDefaultUser();
        cy.visit(`/campaign-application/1/5`);
        cy.get('[data-cy=step-title]')
          .should('exist')
          .contains('Step 5: Select Top Issues');
        cy.get('[data-cy=step-subtitle]')
          .should('exist')
          .contains('Please select up to top five (5) issue you are aligned with to help');
    });
});
