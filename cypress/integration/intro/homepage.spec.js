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
  it('test Hero section', async () => {
    console.log(content);
    cy.get('[data-cy=hero-title]')
      .contains('Money has corrupted');
    cy.get('[data-cy=hero-subtitle]')
      .contains('We’re creating a simple, free way for people to help');
    cy.get('[data-cy=hero-heart]')
      .should('have.attr', 'src', '/images/homepage/thick-heart.svg');
    cy.get('[data-cy=hero-engagement]')
      .contains(numberFormatter(engagements));
    cy.get('[data-cy=hero-register]')
      .should('have.attr', 'href', '/register');
    cy.get('[data-cy=hero-white-heart]')
      .should('have.attr', 'src', '/images/white-heart.svg');
  });
  it('test NotRepresented section', () => {
    cy.get('[data-cy=nrepresented-title]')
      .contains("don’t feel");
    cy.get('[data-cy=nrepresented-subtitle]')
      .contains("(and aren’t organized,");

    cy.get('[data-cy=nrepresented-description]')
      .contains("to mobilize and vote differently");
    cy.get('[data-cy=nrepresented-social]')
      .should('have.attr', 'src', '/images/homepage/walk-social.png');
  });
  it('test Testimonial section', () => {
    cy.get('[data-cy=testimonial-section-title]')
      .contains("Together we can change things for");
    cy.get('[data-cy=testimonial-heart]')
      .should('have.attr', 'src', '/images/heart.svg');
    cy.get('[data-cy=testimonial-subtitle]')
      .contains("Who’s into it?");

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
          .find('[data-cy=testimonial-name]')
          .contains(TESTIMONIALS[index].name);
        cy.wrap($el)
          .find('[data-cy=testimonial-position]')
          .contains(TESTIMONIALS[index].position);
      });
  });
  it('test GoodPartyIs section', () => {
    cy.get('[data-cy=gp-title]')
      .contains('Good Party is for 130 million people across the political spectrum who');
  });
  it('test HowWorks section', () => {
    cy.get('[data-cy=howworks-title]')
      .contains('How does it work?');
    cy.get('[data-cy=howworks-description]')
      .contains('It’s kind of like crowd-funding (GoFundMe), but for')
    cy.get('[data-cy=howworks-image]')
      .should('have.attr', 'src', '/images/homepage/how-works-bg-small.svg');
    
  });
  it('test GoodCertified section', () => {
    cy.get('[data-cy=gc-title]')
      .contains("Good Certified candidates pledge to be:");
    cy.get('[data-cy=gc-image]')
      .should('have.attr', 'src', '/images/homepage/certified.png');

    cy.get('[data-cy=gc-item]')
      .should('have.length', GOOD_CERTIFIED.length)
      .each(($el, index) => {
        cy.wrap($el)
          .find('[data-cy=gc-item-img]')
          .should('have.attr', 'src', GOOD_CERTIFIED[index].img);
        cy.wrap($el)
          .find('[data-cy=gc-item-title]')
          .contains(GOOD_CERTIFIED[index].title);
      });
  });
  it('test FeaturedCampaigns section', () => {
    cy.get('[data-cy=campaigns-title]')
      .contains("Featured Campaigns");
    cy.get('[data-cy=gc-image]')
      .should('have.attr', 'src', '/images/homepage/certified.png');
    cy.get('[data-cy=campaigns-more-link]')
      .should('have.attr', 'href', '/candidates');
    cy.get('[data-cy=campaigns-more-link]')
      .contains("See More");

    cy.get('[data-cy=campaign-card]')
      .should('have.length', homepageCandidates.length)
      .each(($el, index) => {
          cy.testCandidateMiniCard($el, homepageCandidates[index]);
      });
  });
  it('test StayTuned section', () => {
    cy.get('[data-cy=stay-img]')
      .should('have.attr', 'src', '/images/homepage/homepage-footer.png');
    cy.get('[data-cy=stay-title]')
      .contains("You made it this far!");
    cy.get('[data-cy=stay-subtitle]')
      .contains("Want to stay tuned?");    
    cy.get('[data-cy=stay-link]')
      .should('have.attr', 'href', '/register');
    cy.get('[data-cy=stay-link]')
      .contains("Stay in the loop");  
  });
});
