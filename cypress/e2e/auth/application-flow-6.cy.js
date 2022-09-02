describe('Application Flows 6', () => {
    it('test Application Page 6', () => {
        cy.signInWithDefaultUser();
        cy.visit(`/campaign-application/1/6`);
        cy.get('[data-cy=step-title]')
          .should('exist')
          .contains('Step 6: Highlight Key Endorsements');
        cy.get('[data-cy=step-description]')
          .should('exist')
          .contains(`Use this page to add any institutional endorsements you may have`);
    });
});
