import promisify from 'cypress-promise';
import { numberFormatter } from '../../../helpers/numberHelper';
import { TESTIMONIALS, GOOD_CERTIFIED } from '../../../utils/constants';

let engagements, homepageCandidates;
describe('HomePage', () => {
  it('load Homepage Candidates', async () => {
    cy.visit('/');
    const content = await promisify(
      cy.getHomepageCandidates().then(response => response.body),
    );
    ({engagements, homepageCandidates} = content);
  });
  it('test Site Header', () => {
    cy.testSiteHeader();
  });
  it('test Site Footer', () => {
    cy.testSiteFooter();
  });
  it('test Hero section', () => {
    cy.get('[data-cy=hero-title]')
      .contains('Money has corrupted');
    cy.get('[data-cy=hero-subtitle]')
      .contains('We’re creating a simple, free way for people to help');
    cy.get('[data-cy=hero-bottom]')
      .contains('130M+ of us');
    cy.get('[data-cy=hero-bottom1]')
      .contains('So Good Party is building free tools and a community');
    cy.get('[data-cy=hero-heart]')
      .should('have.attr', 'src', '/images/homepage/thick-heart.svg');
    cy.get('[data-cy=hero-engagement]')
      .contains(numberFormatter(engagements));
    cy.get('[data-cy=hero-register]')
      .should('have.attr', 'href', '/register');
  });
  it('test Together section', () => {
    cy.get('[data-cy=together-section]')
      .contains("Together we can change things for");
  });
  it('test WhosInIt section', () => {
    cy.get('[data-cy=testimonial-subtitle]')
      .contains("into it?");

    cy.get('[data-cy=testimonial-item]')
      .should('have.length', TESTIMONIALS.length)
      .each(($el, index) => {
        cy.wrap($el)
          .find('[data-cy=testimonial-avatar]')
          .should('have.attr', 'src', TESTIMONIALS[index].img);
        cy.wrap($el)
          .find('[data-cy=testimonial-content]')
          .contains(TESTIMONIALS[index].text);
        cy.wrap($el)
          .find('[data-cy=testimonial-position]')
          .contains(TESTIMONIALS[index].position);
      });
  });
  it('test GoodPartyIs section', () => {
    cy.get('[data-cy=gp-title]')
      .contains('Good Party is');
    cy.get('[data-cy=gp-content]')
      .contains('Good Party is for the 130 million people across the political');
  });
  it('test HowWorks section', () => {
    cy.get('[data-cy=howworks-title]')
      .contains('How does it work?');
    cy.get('[data-cy=howworks-description]')
      .contains('It’s kind of like crowd-funding (GoFundMe), but for')
  });
  it('test Pledge section', () => {
    cy.get('[data-cy=gc-title]')
      .contains("Good Certified candidates pledge to be:");

    cy.get('[data-cy=gc-item]')
      .should('have.length', GOOD_CERTIFIED.length)
      .each(($el, index) => {
        cy.wrap($el)
          .find('[data-cy=gc-item-title]')
          .contains(GOOD_CERTIFIED[index].title);
        cy.wrap($el)
          .find('[data-cy=gc-item-content]')
          .contains(GOOD_CERTIFIED[index].content);
      });
  });
  it('test FeaturedCampaigns section', () => {
    cy.testFeaturedCampaignsComponent(homepageCandidates);
  });
});
