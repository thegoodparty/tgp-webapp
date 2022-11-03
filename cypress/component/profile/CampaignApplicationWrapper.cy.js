import TestComponent from '../TestComponent';
import CampaignApplicationsWrapper from '../../../components/profile/CampaignApplicationsWrapper';

describe('CampaignApplicationsWrapper.cy.js', () => {
  it('Should render component', () => {
    const params = {
        isTest: true
    };
    cy.mount(
        <TestComponent Component={CampaignApplicationsWrapper} {...params} />
    );
    cy.get('[data-cy=applications-title]')
      .contains('Applications');
    cy.get('[data-cy=no-applications]')
      .contains('No Applications found');
  });
});