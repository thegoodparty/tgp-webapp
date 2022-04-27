import { HEADER_LINKS } from "../../../utils/constants";

Cypress.Commands.add('testSiteHeader', () => {
    cy.get('[data-cy=header-link]')
      .should('have.length', HEADER_LINKS.length)
      .each(($el, index) => {
        cy.wrap($el)
          .find('[data-cy=header-link-label]')
          .should('have.attr', 'href', HEADER_LINKS[index].href)
          .contains(HEADER_LINKS[index].label);
      });
    cy.get('[data-cy=header-login')
      .should('have.attr', 'href', "/login")
      .contains('Login');
    cy.get('[data-cy=header-register')
      .should('have.attr', 'href', "/register")
      .contains('Join Us');
});
Cypress.Commands.add('testSiteFooter', () => {
});