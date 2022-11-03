import TestComponent from '../TestComponent';
import LeaderboardWrapper from '../../../components/profile/LeaderboardWrapper';

describe('LeaderboardWrapper.cy.js', () => {
    beforeEach(() => {
        const params = {
            isTest: true
        };
        cy.mount(
            <TestComponent Component={LeaderboardWrapper} {...params} />
        );
    });
    it('test LeaderboardWrapper', () => {
        cy.get('[data-cy=leaderboard-title]')
          .contains('Good Party Leaderboard');
        cy.get('[data-cy=leaderboard-description]')
          .contains('Invite Good Party people and move up the leaderboard when they join.');
        cy.get('[data-cy=leaderboard-people]')
          .contains('Your People');
        cy.get('[data-cy=leaderboard-people-link]')
          .should('have.attr', 'href', '/#everyone')
          .contains('Everyone');
        cy.get('[data-cy=leaderboard-friend]')
          .contains('Good Parties are better with friends!');
        cy.get('[data-cy=leaderboard-invite-link]')
          .should('have.attr', 'href', '/?share=true')
          .contains('INVITE PEOPLE');
        cy.get('[data-cy=leaderboard-everyone]')
          .contains('Everyone');
    });
    it('test SpreadSection', () => {
        cy.get('[data-cy=spread-title]')
          .contains('Spread the word');
    });
});