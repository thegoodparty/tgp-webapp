import TestComponent from '../TestComponent';
import PrivacyWrapper from '../../../components/shared/PrivacyWrapper';

describe('PrivacyWrapper.cy.js', () => {
  it('Should render component', () => {
    const content = {
        title: 'Privacy Test',
    };
    cy.mount(
        <TestComponent Component={PrivacyWrapper} content={content} isTest={true} />
    );
    cy.get('[data-cy=privacy-title]')
      .should('exist')
      .contains(content.title);
    cy.get('[data-cy=last-revisioin-label]')
      .should('exist')
      .contains('Last Revision');
    cy.get('[data-cy=last-revisioin-date]')
      .should('exist');
  });
});