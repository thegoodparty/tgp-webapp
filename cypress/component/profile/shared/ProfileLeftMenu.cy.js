import TestComponent from '../../TestComponent';
import ProfileLeftMenu from '../../../../components/profile/shared/ProfileLeftMenu';
import { leftMenuItems, leftMenuItemsBottom } from '../../../../components/profile/shared/ProfileLeftMenu'

describe('ProfileLeftMenu.cy.js', () => {
    it('Should render component', () => {
        const params = {
            isTest: true,
        };
        cy.mount(
            <TestComponent Component={ProfileLeftMenu} {...params} />
        );
        cy.get('[data-cy=portal-left-menu-item]')
          .should('have.length', leftMenuItems.length)
          .each(($el, index) => {
                cy.wrap($el)
                  .should('have.attr', 'href', leftMenuItems[index].link)
                  .contains(leftMenuItems[index].label);
          });
        cy.get('[data-cy=portal-left-menu-bottom-item]')
          .should('have.length', leftMenuItemsBottom.length)
          .each(($el, index) => {
                cy.wrap($el)
                  .should('have.attr', 'href', leftMenuItemsBottom[index].link)
                  .contains(leftMenuItemsBottom[index].label);
          });
    });
    
});