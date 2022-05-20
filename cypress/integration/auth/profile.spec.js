
import promisify from 'cypress-promise';
import { USER_COOKIE } from '../../constants';
import { parseCookie } from '../../support/utils';

describe('Profile Page', () => {
    let user, supports;
    // it('login to the test account', () => {
    // });
    it('test Profile', () => {
        cy.signInWithDefaultUser();
        cy.visit('/profile');
        user = parseCookie(USER_COOKIE);
        cy.get('[data-cy=profile-username]')
          .contains(user.name);
        cy.get('[data-cy=profile-edit-link')
          .should('have.attr', 'href', '/profile/settings')
          .contains('Edit');
        cy.get('[data-cy=profile-logout-link')
          .should('have.attr', 'href', '#')
          .contains('Sign Out');
    });
    it('load SupportedCampaigns', async () => {
        const content = await promisify(
            cy.getUserSupports().then(response => response.body),
        );
        ({supports} = content);
        console.log(supports);
    });
    it('test SupportedCampaigns', () => {
        cy.signInWithDefaultUser();
        cy.visit('/profile');
        user = parseCookie(USER_COOKIE);
        cy.get('[data-cy=profile-support-title]')
          .contains('Campaigns you’re supporting');
        cy.get('[data-cy=profile-support-search-link')
          .should('have.attr', 'href', '/candidates')
          .contains('Search Campaigns');
        if(!supports || supports.length === 0) {
            cy.get('[data-cy=profile-support-no-title]')
              .contains('Find a campaign and let');
            cy.get('[data-cy=profile-support-no-link')
              .should('have.attr', 'href', '/candidates')
              .contains('Search Campaigns');
        }
        else {
            const availCandidates = supports.filter(support => support.candidate);
            cy.get('[data-cy=supported-campaign]')
              .should('have.length', availCandidates.length)
              .each(($el, index) => {
                cy.testCandidateCard($el, JSON.parse(availCandidates[index].candidate.data));
              });
        }
    });
});
