describe('Application Flows 2', () => {
    it('test Application Page 2', () => {
        cy.signInWithDefaultUser();
        cy.visit(`/campaign-application/1/2`);
        cy.get('[data-cy=step-title]')
          .should('exist')
          .contains('Step 2: Add Candidate Details');
    });
});
