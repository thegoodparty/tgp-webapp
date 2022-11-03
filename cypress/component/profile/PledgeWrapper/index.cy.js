import TestComponent from '../../TestComponent';
import PledgeWrapper from '../../../../components/PledgeWrapper';

describe('ProfileLeftMenu.cy.js', () => {
    it('Should render component', () => {
        const params = {
            isTest: true,
        };
        cy.mount(
            <TestComponent Component={PledgeWrapper} {...params} />
        );

        cy.get('[data-cy=pledge-link]')
          .contains('Take the Pledge');
    });
    
});