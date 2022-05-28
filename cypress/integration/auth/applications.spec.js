
import promisify from 'cypress-promise';

describe('Campaign Applications Page', () => {
    let user, staff, applications;
    it('load Staff', async () => {
      const content = await promisify(
          cy.getStaff().then(response => response.body),
      );
      ({staff} = content);
      console.log(staff);
    });
    it('load Applications', async () => {
      const content = await promisify(
          cy.getApplications().then(response => response.body),
      );
      ({applications} = content);
      console.log(applications);
    });
    it('test Staff Section', () => {
      if(staff.length > 0) {
        cy.signInWithDefaultUser();
        cy.visit('/profile/campaigns');
        cy.get('[data-cy=campaign-staff-title]')
          .contains('Campaigns');
        cy.get('[data-cy=campaign-staff-wrapper]')
          .should('have.length', staff.length)
          .each(($el, index) => {
            cy.testStaffCard($el, staff[index]);
          });
        }
    });
    it('test Application Section', () => {
      cy.signInWithDefaultUser();
      cy.visit('/profile/campaigns');
      cy.get('[data-cy=applications-title]')
        .contains('Applications');
      if(applications.length === 0) {
        cy.get('[data-cy=no-applications]')
          .contains('No Applications found');
      }
      else {
        cy.get('[data-cy=application-wrapper]')
          .should('have.length', applications.length)
          .each(($el, index) => {
            cy.testApplicationPreview($el, applications[index]);
          });
      }
    });
});
