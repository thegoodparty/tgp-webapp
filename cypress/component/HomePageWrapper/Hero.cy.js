import TestComponent from '../TestComponent';
import Hero from '../../../components/HomePageWrapper/Hero';

describe('Hero.cy.js', () => {
    it('Should render component', () => {
        const params = {
            isTest: true,
        };
        cy.mount(
            <TestComponent Component={Hero} {...params} />
        );
        cy.get('[data-cy=hero-title]')
          .contains('Declare');
        cy.get('[data-cy=hero-top]')
          .contains('Independence');
        cy.get('[data-cy=hero-red]')
          .contains('Red');
        cy.get('[data-cy=hero-blue]')
          .contains('Blue');
        cy.get('[data-cy=hero-independence-img]')
          .should('have.attr', 'src');
        cy.get('[data-cy=hero-inner]')
          .contains('platform for voters to find results-driven, independent and third');
        // cy.get('[data-cy=profile-edit-link')
        //   .should('have.attr', 'href', '/profile/settings')
        //   .contains('Edit');
        // cy.get('[data-cy=profile-logout-link')
        //   .should('have.attr', 'href', '#')
        //   .contains('Sign Out');
    });
    
});