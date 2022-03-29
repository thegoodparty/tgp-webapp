describe('Footer', () => {
  beforeEach(() => {
    cy.visit('/party');
  });
  it('check common footer', () => {
    cy.checkCommonFooter();
  });
});
