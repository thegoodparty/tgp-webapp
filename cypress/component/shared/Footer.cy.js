import TestComponent from '../TestComponent';
import Footer from '../../../components/shared/Footer';
import { FOOTER_COLUMNS } from '../../../components/shared/Footer/constants';

describe('Footer.cy.js', () => {
  it('Should render component', () => {
    const params = {
        isTest: true
    }
    cy.mount(
        <TestComponent Component={Footer} {...params}/>
    );
    cy.get('[data-cy=footer-column]')
      .should('have.length', FOOTER_COLUMNS.length)
      .each(($el, index) => {
        cy.wrap($el)
            .find('[data-cy=footer-column-title]')
            .contains(FOOTER_COLUMNS[index].title);
        cy.wrap($el)
            .find('[data-cy=footer-link-wrapper]')
            .should('have.length', FOOTER_COLUMNS[index].links.length)
            .each(($el1, index1) => {
            cy.wrap($el1)
                .find('[data-cy=footer-link]')
                .should('have.attr', 'href', FOOTER_COLUMNS[index].links[index1].link)
                .contains(FOOTER_COLUMNS[index].links[index1].label);
            });
        });
    cy.get('[data-cy=footer-join-us')
      .contains('Not a political party. We’re building free tools to change')
    cy.get('[data-cy=footer-join-us-link')
      .should('have.attr', 'href', "/register");
    const year = new Date().getFullYear();
    cy.get('[data-cy=footer-copyright')
      .contains(`${year} Good Party. All rights reserved.`)
    cy.get('[data-cy=footer-privacy-link')
      .should('have.attr', 'href', "/privacy");
  });
});