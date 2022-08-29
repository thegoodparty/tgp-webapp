describe('Application Flows 3', () => {
    it('test Application Page 3', () => {
        cy.signInWithDefaultUser();
        cy.visit(`/campaign-application/1/3`);
        cy.get('[data-cy=step-title]')
          .should('exist')
          .contains('Step 3: Add Campaign Details');
    });
});
