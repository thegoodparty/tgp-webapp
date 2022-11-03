import TestComponent from '../../TestComponent';
import PasswordSection from '../../../../components/profile/ProfileSettingsWrapper/PasswordSection';
import { TEST_USER } from '../../../constants';

describe('PasswordSection.cy.js', () => {
    it('Should render component', () => {
        const params = {
            isTest: true,
            testUser: TEST_USER
        };
        cy.mount(
            <TestComponent Component={PasswordSection} {...params} />
        );
        cy.get('[data-cy=setting-password-title]')
          .contains(`${TEST_USER.hasPassword ? 'Change' : 'Create'} your password`);
        cy.get('[data-cy=setting-password-description]')
          .contains('For security, passwords must have at least 1 capital letter');
        cy.get('[data-cy=setting-password-save]')
          .contains('Save');
        cy.get('[data-cy=setting-password-cancel]')
          .contains('cancel');
    });
    
});