import promisify from 'cypress-promise';
import { CROWD_VOTING_POINTS } from '../../../components/AboutWrapper'

let homepageCandidates;
describe('About Page', () => {
  it('load Featured Candidates', async () => {
    cy.visit('/about');
    const content = await promisify(
      cy.getHomepageCandidates().then(response => response.body),
    );
    ({homepageCandidates} = content);
  });
  it('test Site Header', () => {
    cy.testSiteHeader();
  });
  it('test Site Footer', () => {
    cy.testSiteFooter();
  });
  it('test Top Section', () => {
    cy.get('[data-cy=about-title]')
      .contains('What does Good Party do?');
    cy.get('[data-cy=about-description]')
      .contains('Our democracy has been')
      .contains('Whether you’re concerned about the climate, privacy, inequality,')
      .contains('hampered by the dark doom-loop of dysfunctional partisan politics.');
    cy.get('[data-cy=crowd-voting-point]')
      .should('have.length', CROWD_VOTING_POINTS.length)
      .each(($el, index) => {
        cy.wrap($el)
          .find('[data-cy=crowd-voting-point-content]')
          .contains(CROWD_VOTING_POINTS[index].title);
      });
  });

  it('test FeaturedCampaigns section', () => {
    cy.testFeaturedCampaignsComponent(homepageCandidates);
  });
});
