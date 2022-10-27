import TestComponent from '../TestComponent';
import WhatsNext from '../../../components/HomePageWrapper/WhatsNext';

describe('WhatsNext.cy.js', () => {
    it('Should render component', () => {
        const params = {
            isTest: true,
        };
        cy.mount(
            <TestComponent Component={WhatsNext} {...params} />
        );
        cy.get('[data-cy=whatsnext-title]')
          .contains('So what’s next?');
        cy.get('[data-cy=whatsnext-button]')
          .contains('Get Involved');
    });
});