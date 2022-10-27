import TestComponent from '../../TestComponent';
import DeleteSection from '../../../../components/profile/ProfileSettingsWrapper/DeleteSection';
import { TEST_USER } from '../../../constants';

describe('DeleteSection.cy.js', () => {
    it('Should render component', () => {
        const params = {
            isTest: true,
            testUser: TEST_USER
        };
        cy.mount(
            <TestComponent Component={DeleteSection} {...params} />
        );
        cy.get('[data-cy=delete-account-title]')
          .contains('Danger Zone - Delete your account');
        cy.get('[data-cy=delete-account-action]')
          .contains('Delete Account');
    });
    
});