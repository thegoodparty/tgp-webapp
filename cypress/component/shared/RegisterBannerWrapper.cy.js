import TestComponent from '../TestComponent';
import RegisterBannerWrapper from '../../../components/shared/RegisterBannerWrapper';

describe('RegisterBannerWrapper.cy.js', () => {
  it('Should render component', () => {
    cy.mount(
        <TestComponent Component={RegisterBannerWrapper} user={{}} />
    );
    cy.get('[data-cy=register-banner-link]')
      .should('exist')
      .should('have.attr', 'href')
      .should('contains', '/register/confirm?returnUrl=');
    cy.get('[data-cy=register-banner-link]')
      .should('exist')
      .contains('Verify your');
  });
});