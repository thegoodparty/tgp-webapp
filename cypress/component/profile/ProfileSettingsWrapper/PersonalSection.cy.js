import TestComponent from '../../TestComponent';
import PersonalSection from '../../../../components/profile/ProfileSettingsWrapper/PersonalSection';

import { TEST_USER } from '../../../constants';
describe('PersonalSection.cy.js', () => {
    it('Should render component', () => {
        const params = {
            isTest: true,
            testUser: TEST_USER
        };
        cy.mount(
            <TestComponent Component={PersonalSection} {...params} />
        );
        cy.get('[data-cy=settings-title]')
          .contains('Settings');
        cy.get('[data-cy=settings-save]')
          .contains('Save');
        cy.get('[data-cy=settings-cancel]')
          .contains('cancel');
    });
    
});