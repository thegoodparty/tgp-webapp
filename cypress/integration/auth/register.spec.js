describe('Register', () => {
  it('finds correct text', () => {
    cy.visit('home?register=true');
    cy.checkRegisterText();
  });
  it('check social register section', () => {
    cy.checkSocialLoginSection();
  });
  it('check email register section', () => {
    cy.checkEmailRegisterSection();
  });
  it('check login button and privacy section', () => {
    cy.visit('home?register=true');
    cy.checkLoginPartAndPrivacySection();
  });
});
