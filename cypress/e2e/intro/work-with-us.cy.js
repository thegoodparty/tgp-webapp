describe('Work With Us Page', () => {
  it('test Top Section', () => {
    cy.visit('/work-with-us');
    cy.get('[data-cy=wwu-title]')
      .contains('Join the party!');
    cy.get('[data-cy=waw-content]')
      .contains('Good Party is a fully-funded startup organized as a Public Benefit');
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
    cy.get('[data-cy=opening-content]')
      .contains('Good Party reflects what we want');
  });
});
