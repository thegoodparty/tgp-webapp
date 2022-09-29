import promisify from 'cypress-promise';
import { candidateRoute } from '../../../helpers/electionsHelper';
import { daysTill } from '../../../helpers/dateHelper';

const sampleCandidateList = [36, 30, 43];
context('Candidate', async () => {
    let candidate;
    sampleCandidateList.forEach(candidateId => {
        describe(`check candidate page - ${candidateId}`, () => {
            it(`loads candidate data`, async () => {
                cy.visit(candidateRoute({id: candidateId, firstName: 'test', lastName: 'test'}));
                candidate = await promisify(
                    cy.getCandidate(candidateId).then(response => response.body),
                );
            });
            it('test Site Header', () => {
              cy.testSiteHeader();
            });
            it('test Site Footer', () => {
              cy.testSiteFooter();
            });
            
            it(`test CandidateProfile`, () => {
              const { firstName, lastName } = candidate.candidate;
              cy.get('[data-cy=candidate-name]')
                .contains(firstName)
                .contains(lastName);
              cy.testCandidatePartyRace('candidate-race', candidate.candidate);
              cy.get('[data-cy=candidate-follow-btn]')
                .contains('FOLLOW')
                .should('exist');
            });
            it(`test SocialStats`, () => {
              let thisWeek = 0;
              let lastWeek = 0;
              if (candidate.followers) {
                thisWeek = candidate.followers.thisWeek;
                lastWeek = candidate.followers.lastWeek;
              }
              const { raceDate, votesNeeded } = candidate.candidate;
              const days = daysTill(raceDate);

              const diff = thisWeek - lastWeek || 0;
              cy.testSupportersProgressBar(
                votesNeeded,
                thisWeek || 0,
                diff,
                days
              );
              cy.get('[data-cy=candidate-follow-btn]')
                .contains('FOLLOW')
                .should('exist');
            });
            it(`test SocialPost Section`, () => {
              cy.get('[data-cy=feed-title]')
                .contains('Get ‘em trending');
              cy.get('[data-cy=feed-subtitle]')
                .contains('Indie candidates need help growing their movements! Like, follow,');

              const { feed } = candidate;
              let posts = [];
              if (feed && feed.results) {
                posts = feed.results;
              }
              cy.get('[data-cy=post-item]')
                  .should('have.length', posts.length)
                  .each(($el, index) => {
                    cy.testSocialPost($el, posts[index]);
                });
            });
            it(`test TopIssues`, () => {
              const { candidatePositions } = candidate.candidate;
              
              if(candidatePositions && candidatePositions.length > 0) {
                cy.get('[data-cy=top-issues-title]')
                  .contains('Top Issues');
                cy.get('[data-cy=top-issue-share]')
                  .contains('Share');
                cy.get('[data-cy=top-issue]')
                  .should('have.length', candidatePositions.length)
                  .each(($el, index) => {
                    cy.wrap($el)
                      .find('[data-cy=top-issue-position]')
                      .contains(candidatePositions[index].position?.name);
                    cy.wrap($el)
                      .find('[data-cy=top-issue-name]')
                      .contains(candidatePositions[index].topIssue?.name)
                      .contains(candidatePositions[index].description);
                });
              }
            });
            it(`loads Campaign Tab`, () => {
              cy.get('[data-cy=tab-link-Campaign]')
                .should('exist')
                .click(); 
              cy.wait(2000);
              cy.get('[data-cy=campaign-progrsss-title]')
                .contains('Victory Meter');
              cy.get('[data-cy=campaign-progress-ref]')
                .contains('What`s this?');
            });
            it(`loads Bio Tab`, () => {
              cy.get('[data-cy=tab-link-Bio]')
                .should('exist')
                .click(); 
              cy.wait(2000);
              const { headline, website } = candidate.candidate;
              cy.get('[data-cy=bio-title]')
                .contains(headline);
              cy.get('[data-cy=bio-about]')
                .contains('About the candidate');
              if(website) {
                cy.get('[data-cy=bio-website]')
                  .should('have.attr', 'href', website)
                  .contains('Visit Candidate Website');
              }
            });
        });
    });
});
