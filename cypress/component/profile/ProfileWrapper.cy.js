import TestComponent from '../TestComponent';
import ProfileWrapper from '../../../components/profile/ProfileWrapper';

import { TEST_USER } from '../../constants';
describe('ProfileWrapper.cy.js', () => {
    it('Should render component', () => {
        const params = {
            isTest: true,
            testUser: TEST_USER
        };
        cy.mount(
            <TestComponent Component={ProfileWrapper} {...params} />
        );
        cy.get('[data-cy=profile-username]')
          .contains(TEST_USER.name);
        cy.get('[data-cy=profile-edit-link')
          .should('have.attr', 'href', '/profile/settings')
          .contains('Edit');
        cy.get('[data-cy=profile-logout-link')
          .should('have.attr', 'href', '#')
          .contains('Sign Out');
    });
    
});