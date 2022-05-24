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
  it('test Social section', () => {
    cy.get('[data-cy=post-count]')
      .contains('85,174');
    cy.get('[data-cy=post-count-label]')
      .contains('#goodparty posts');
    cy.get('[data-cy=heart-icon]')
      .should('have.attr', 'src', '/images/heart.svg');
    cy.get('[data-cy=people-count]')
      .contains('8,668');
    cy.get('[data-cy=people-count-label]')
      .contains('@goodparty people');
  });
  it('test Goodparty section', () => {
    cy.get('[data-cy=party-on]')
      .contains("We party on");
    cy.get('[data-cy=accomplish-label]')
      .contains("What does partying accomplish?");
  });
  it('test WhatIsIt section', () => {
    cy.get('[data-cy=wii-title]')
      .contains("What is");
    cy.get('[data-cy=wii-definition]')
      .contains("that tears away our hopes");
    cy.get('[data-cy=mainfesto-link]')
      .should('have.attr', 'href', '/manifesto')
      .contains('Read our Manifesto');
  });
  it('test Anatomy section', () => {
    cy.get('[data-cy=anatomy-title]')
      .contains("Anatomy of a #goodparty");
    cy.get('[data-cy=anatomy-part-title-1]')
      .contains("GET TOGETHER");
    cy.get('[data-cy=anatomy-part-desc-1]')
      .contains("A #goodparty is whatever you want it to be: a sewing circle, a");
    cy.get('[data-cy=anatomy-part-title-2]')
      .contains("WITH FRIENDS AND FAMILY");
    cy.get('[data-cy=anatomy-part-desc-2]')
      .contains("Come together, share food and music, make memories - be together");
    cy.get('[data-cy=anatomy-part-title-3]')
      .contains("EVERY TUESDAY");
    cy.get('[data-cy=anatomy-part-desc-3]')
      .contains("Do it so you can do it again. Pitch in, clean up and help host, so");
  });
  // it('test Together section', () => {
  //   cy.get('[data-cy=together-section]')
  //     .contains("Together we can change things for");
  // });
  // it('test WhosInIt section', () => {
  //   cy.get('[data-cy=testimonial-subtitle]')
  //     .contains("into it?");

  //   cy.get('[data-cy=testimonial-item]')
  //     .should('have.length', TESTIMONIALS.length)
  //     .each(($el, index) => {
  //       cy.wrap($el)
  //         .find('[data-cy=testimonial-avatar]')
  //         .should('have.attr', 'src', TESTIMONIALS[index].img);
  //       cy.wrap($el)
  //         .find('[data-cy=testimonial-content]')
  //         .contains(TESTIMONIALS[index].text);
  //       cy.wrap($el)
  //         .find('[data-cy=testimonial-position]')
  //         .contains(TESTIMONIALS[index].position);
  //     });
  // });
  // it('test GoodPartyIs section', () => {
  //   cy.get('[data-cy=gp-title]')
  //     .contains('Good Party is');
  //   cy.get('[data-cy=gp-content]')
  //     .contains('Good Party is for the 130 million people across the political');
  // });
  // it('test HowWorks section', () => {
  //   cy.get('[data-cy=howworks-title]')
  //     .contains('How does it work?');
  //   cy.get('[data-cy=howworks-description]')
  //     .contains('It’s kind of like crowd-funding (GoFundMe), but for')
  // });
  // it('test Pledge section', () => {
  //   cy.get('[data-cy=gc-title]')
  //     .contains("Good Certified candidates pledge to be:");

  //   cy.get('[data-cy=gc-item]')
  //     .should('have.length', GOOD_CERTIFIED.length)
  //     .each(($el, index) => {
  //       cy.wrap($el)
  //         .find('[data-cy=gc-item-title]')
  //         .contains(GOOD_CERTIFIED[index].title);
  //       cy.wrap($el)
  //         .find('[data-cy=gc-item-content]')
  //         .contains(GOOD_CERTIFIED[index].content);
  //     });
  // });
  // it('test FeaturedCampaigns section', () => {
  //   cy.testFeaturedCampaignsComponent(homepageCandidates);
  // });
});
