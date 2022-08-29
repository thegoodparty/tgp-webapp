describe('Application Flows 7', () => {
    it('test Application Page 7', () => {
        cy.signInWithDefaultUser();
        cy.visit(`/campaign-application/1/7`);
        cy.get('[data-cy=step-title]')
          .should('exist')
          .contains('Step 7: Review Application Checklist');
    });
});
