import promisify from 'cypress-promise';
import { leftMenuItems, leftMenuItemsBottom } from '../../../components/candidate-portal/shared/PortalLeftMenu'
import { numberFormatter } from '../../../helpers/numberHelper';
import { dateUsHelper } from '../../../helpers/dateHelper';

const id = 37;
let stats, candidate;
describe('Candidate Portal - Analytics Dashboard', () => {
    it('test Site Footer', () => {
        cy.signInWithDefaultUser();
        cy.visit(`/candidate-portal/${id}`);
        cy.testSiteFooter();
    });
    it('test PortalLayout', () => {
        cy.get('[data-cy=portal-left-menu-item]')
          .should('have.length', leftMenuItems.length)
          .each(($el, index) => {
                cy.wrap($el)
                  .should('have.attr', 'href', `${leftMenuItems[index].link}/${id}`)
                  .contains(leftMenuItems[index].label);
          });
        cy.get('[data-cy=portal-left-bottom-item]')
          .should('have.length', leftMenuItemsBottom.length)
          .each(($el, index) => {
                cy.wrap($el)
                  .should('have.attr', 'href', leftMenuItemsBottom[index].link)
                  .contains(leftMenuItemsBottom[index].label);
          });
    });
    it('load CampaignStats', async () => {
        const content = await promisify(
            cy.getCampaignStats(7, id).then(response => response.body),
        );
        stats = content;
    });
    it('load CampaignCandidate', async () => {
        const content = await promisify(
            cy.getCampaignCandidate(id).then(response => response.body),
        );
        ({ candidate } = content);
    });
    it('test CampaignPanel', () => {
        const visitors = stats?.stats?.visitors;
        const shares = stats?.stats?.shares;
        const followers = stats?.stats?.followers;
      
        const fields = [
            { label: 'VIEWS', data: visitors || {} },
            { label: 'SHARES', data: shares || {} },
            { label: 'FOLLOWERS', data: followers || {} },
        ];
        cy.get('[data-cy=campaign-panel-title]')
          .contains('Campaign Page');
        cy.get('[data-cy=week-range]')
          .contains('WEEK');
        cy.get('[data-cy=month-range]')
          .contains('LAST 30 DAYS');
        cy.get('[data-cy=campaign-stat-field]')
          .should('have.length', fields.length)
          .each(($el, index) => {
            cy.wrap($el)
              .find('[data-cy=stat-label]')
              .contains(fields[index].label);
            cy.wrap($el)
              .find('[data-cy=stat-total]')
              .contains(numberFormatter(fields[index].data.total));
        });
        // cy.get('[data-cy=candidate-name]')
        //         .contains(firstName)
        //         .contains(lastName);
        //       cy.testCandidatePartyRace('candidate-race', candidate.candidate);
        //       cy.get('[data-cy=candidate-follow-btn]')
        //         .contains('FOLLOW')
        //         .should('exist');
    });
    it('test GoalsPanel', () => {
        const { votesNeeded, likelyVoters, unrepVoters } = candidate;
      
        const votersX =
          unrepVoters && votesNeeded && votesNeeded !== 0
            ? Math.round((unrepVoters * 100) / votesNeeded) / 100 // to add decimal if needed
            : 1;
      
        const today = new Date();
        cy.get('[data-cy=goals-title]')
          .contains('Voter Projections')
          .contains(`(as of ${dateUsHelper(today)}`)
          .contains(today.toLocaleTimeString().replace(/(.*)\D\d+/, '$1'));
        cy.get('[data-cy=votes-need-win]')
          .contains('VOTES NEEDED TO WIN');
        cy.get('[data-cy=votes-need-win-val]')
          .contains(numberFormatter(votesNeeded || 0));
        cy.get('[data-cy=votes-so-far]')
          .contains('LIKELY VOTES SO FAR');
        cy.get('[data-cy=votes-so-far-val]')
          .contains(numberFormatter(likelyVoters || 0));
        cy.get('[data-cy=goals-description]')
          .contains('voters are not going to vote Red or Blue in this race. That means')
          .contains(numberFormatter(unrepVoters));
        cy.get('[data-cy=methodology-link]')
          .contains('Methodology');
        cy.get('[data-cy=have-question]')
          .contains('Have a question?');
    });
});
