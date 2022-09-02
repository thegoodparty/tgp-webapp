import promisify from 'cypress-promise';

const id = 37;

let state = {}, candidate, staff, staffInvitations;
describe('Candidate Portal - Staff Management', () => {
    it('test Site Footer', () => {
        cy.signInWithDefaultUser();
        cy.visit(`/candidate-portal/staff-management/${id}`);
        cy.testSiteFooter();
    });
    
    it('load CampaignCandidate', async () => {
        const content = await promisify(
            cy.getCampaignCandidate(id).then(response => response.body),
        );
        ({ candidate } = content);
    });

    it('load Staff', async () => {
        const content = await promisify(
            cy.getCampaignStaff(id).then(response => response.body),
        );
        ({ staff, staffInvitations } = content);
    });
    it('test Invite User Section', () => {
        cy.get('[data-cy=invite-section-title]')
          .contains('Invite Team Member');
        cy.get('[data-cy=invite-btn]')
          .contains('Invite');
    });
    it('test Staff Section', () => {
        cy.get('[data-cy=staff-section-title]')
          .contains('Team Members');
        cy.get('[data-cy=invite-btn]')
          .contains('Invite');
        cy.get('[data-cy=member-col-name]')
          .contains('Name');
        cy.get('[data-cy=member-col-email]')
          .contains('Email');
        cy.get('[data-cy=member-col-role]')
          .contains('Role');
        cy.get('[data-cy=member-col-status]')
          .contains('Status');
        cy.get('[data-cy=member-col-action]')
          .contains('Action');
        cy.get('[data-cy=member-col-name]')
          .contains('Name');
        cy.get('[data-cy=member-info-name]')
          .should('have.length', staff?.length)
          .each(($el, index) => {
            cy.wrap($el)
              .contains(staff[index].user?.name);
        });
        cy.get('[data-cy=member-info-email]')
          .should('have.length', staff?.length)
          .each(($el, index) => {
            cy.wrap($el)
              .contains(staff[index].user?.email);
        });
        cy.get('[data-cy=member-info-status]')
          .should('have.length', staff?.length)
          .each(($el, index) => {
            cy.wrap($el)
              .contains('Accepted');
        });
    });
    it('test Staff Invitations Section', () => {
        cy.get('[data-cy=invitation-row-name]')
          .should('have.length', staffInvitations?.length)
          .each(($el, index) => {
            cy.wrap($el)
              .contains(staffInvitations[index].name);
        });
        cy.get('[data-cy=invitation-row-email]')
          .should('have.length', staffInvitations?.length)
          .each(($el, index) => {
            cy.wrap($el)
              .contains(staffInvitations[index].email);
        });
        cy.get('[data-cy=invitation-row-role]')
          .should('have.length', staffInvitations?.length)
          .each(($el, index) => {
            cy.wrap($el)
              .contains(staffInvitations[index].role);
        });
        cy.get('[data-cy=invitation-row-status]')
          .should('have.length', staffInvitations?.length)
          .each(($el, index) => {
            cy.wrap($el)
              .contains('Pending');
        });
        
    });
});
