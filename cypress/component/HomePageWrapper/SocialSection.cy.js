import TestComponent from '../TestComponent';
import SocialSection from '../../../components/HomePageWrapper/SocialSection';

describe('SocialSection.cy.js', () => {
    it('Should render component', () => {
        const params = {
            isTest: true,
        };
        cy.mount(
            <TestComponent Component={SocialSection} {...params} />
        );
        cy.get('[data-cy=heart-icon]')
          .should('have.attr', 'src', '/images/heart.svg');
        cy.get('[data-cy=people-count-label]')
          .contains('@goodparty people');
    });
});