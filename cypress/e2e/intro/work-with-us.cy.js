describe('Work With Us Page', () => {
  it('test Hero Section', () => {
    cy.visit('/work-with-us');
    cy.get('[data-cy=hero-content]')
      .contains('Good Party is')
      .contains('Our team is 100% remote');
  });
  it('test Site Header', () => {
    cy.testSiteHeader();
  });
  it('test Site Footer', () => {
    cy.testSiteFooter();
  });
  it('test LeverCareers Section', () => {
    cy.get('[data-cy=opening-title]')
      .contains('Openings');
  });
});
