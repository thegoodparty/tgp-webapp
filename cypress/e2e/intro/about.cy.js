import promisify from 'cypress-promise';

let homepageCandidates;
describe('About Page', () => {
  it('load Featured Candidates', async () => {
    cy.visit('/about');
    const content = await promisify(
      cy.getHomepageCandidates().then((response) => response.body),
    );
    ({ homepageCandidates } = content);
  });
  it('test Site Header', () => {
    cy.testSiteHeader();
  });
  it('test Site Footer', () => {
    cy.testSiteFooter();
  });
  it('test Top Section', () => {
    cy.get('[data-cy=about-title]').contains('What is Good Party?');
    cy.get('[data-cy=about-description]').contains(
      'tools to change the rules and a mo',
    );
  });

  // it('test FeaturedCampaigns section', () => {
  //   cy.testFeaturedCampaignsComponent(homepageCandidates);
  // });
});
