import promisify from 'cypress-promise';
import { numberFormatter } from '../../../helpers/numberHelper';

let candidates, positions, states, totalFollowers, totalFromLastWeek;
describe('CandidatesPage', () => {
    beforeEach(() => {
        cy.visit('/candidates');
    });
    it('test Site Header', () => {
        cy.testSiteHeader();
    });
    it('test Site Footer', () => {
        cy.testSiteFooter();
    });
    it('load Candidates', async () => {
        const content = await promisify(
            cy.getCandidateList().then(response => response.body),
        );
        ({candidates, positions, states, totalFollowers, totalFromLastWeek} = content);
        console.log(content);
    });
    it('test Filter Section', () => {
        cy.get('[data-cy=toggle-filter]').click();
        if(positions.length) {
          cy.get('[data-cy=filter-section-title]')
          .contains('Filter by Top Issues');
          cy.get('[data-cy=position-pill]')
            .should('have.length', positions.length)
            .each(($el, index) => {
                  cy.wrap($el)
                    .contains(positions[index].name)
                    .contains(positions[index].candidates?.length);
            });
        }
        
    });
    it('test Top Section', () => {
        cy.get('[data-cy=candidates-top-title]')
          .contains('Claim your')
          .contains('Independents!');
        cy.get('[data-cy=candidates-top-subtitle]')
          .contains('Follow Honest, Independent, People-powered candidates to reclaim our');
        cy.get('[data-cy=candidates-article-link]')
          .contains('Why is this important?');
        cy.get('[data-cy=candidates-run-link]')
          .should('have.attr', 'href', '/run')
          .contains('Want to run for office?');
        cy.get('[data-cy=following-number]')
          .contains(numberFormatter(totalFollowers));
        cy.get('[data-cy=following-label]')
          .contains('Following')
          .contains('indie candidates');
        cy.get('[data-cy=follower-number]')
          .contains(numberFormatter(totalFromLastWeek));
        cy.get('[data-cy=follower-label]')
          .contains('Followers')
          .contains('from last week');
    });
    
    it('test Candidates Section', () => {
        cy.get('[data-cy=candidates-section-title]')
          .contains('Top Trending Candidates');
        cy.get('[data-cy=good-certified-link]')
          .contains('GOOD CERTIFIED?');
        cy.get('[data-cy=candidate-card]')
          .should('have.length', candidates.length)
          .each(($el, index) => {
                cy.testCandidateCard($el, candidates[index]);
          });
    });
});
