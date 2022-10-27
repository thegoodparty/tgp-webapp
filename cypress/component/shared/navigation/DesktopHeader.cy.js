import TestComponent from '../../TestComponent';
import DesktopHeader from '../../../../components/shared/navigation/DesktopHeader';
import { HEADER_LINKS } from '../../../../components/shared/navigation/constants';

describe('navigation/DesktopHeader.cy.js', () => {
  it('Should render component', () => {
    cy.mount(
        <TestComponent Component={DesktopHeader}/>
    );
    cy.get('[data-cy=logo]')
      .should('exist');
    cy.get('[data-cy=header-link]')
      .should('have.length', HEADER_LINKS.length)
      .each(($el, index) => {
        cy.wrap($el)
          .find('[data-cy=header-link-label]')
          .should('have.attr', 'href', HEADER_LINKS[index].href)
          .contains(HEADER_LINKS[index].label);
      });
    cy.get('[data-cy=header-register]')
      .contains('Join Us');
  });
});