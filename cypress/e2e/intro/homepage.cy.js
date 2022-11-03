import promisify from 'cypress-promise';

let homepageCandidates, feed;
describe('HomePage', () => {
  it('load Homepage Candidates', () => {
    cy.visit('/');
  });
  it('test Site Header', () => {
    cy.testSiteHeader();
  });
  it('test Site Footer', () => {
    cy.testSiteFooter();
  });
  it('test Social section', () => {
    // cy.get('[data-cy=post-count-label]')
    //   .contains('#goodparty posts');
    cy.get('[data-cy=heart-icon]')
      .should('have.attr', 'src', '/images/heart.svg');
    cy.get('[data-cy=people-count-label]')
      .contains('@goodparty people');
  });
  it('load Candidates', async () => {
    const content = await promisify(
        cy.getHomepageCandidates().then(response => response.body),
    );
    ({homepageCandidates} = content);
    console.log(content);
  });
  it('load Feed', async () => {
    const content = await promisify(
        cy.getHomepageFeed().then(response => response.body),
    );
    feed = content;
    console.log(content);
  });
  it('test GrayParty section', () => {
    // cy.get('[data-cy=party-on]')
    //   .contains("We tag #goodparty");
    // cy.get('[data-cy=why-tuesday-link]')
    //   .contains("Why Tuesdays?");
    // cy.get('[data-cy=home-feed-title]')
    //   .contains("Posts from")
    //   .contains("#goodparty");
    // let posts = [];
    // if (feed && feed.results) {
    //   posts = feed.results;
    // }
    // cy.get('[data-cy=post-item]')
    //   .should('have.length', posts.length)
    //   .each(($el, index) => {
    //     cy.testSocialPost($el, posts[index]);
    // });
  });
  it('test Candidates section', () => {
    cy.get('[data-cy=home-candidates-title]')
      .contains("Find");
    // cy.get('[data-cy=good-cert-link]')
    //   .should('have.attr', 'href', "/candidates")
    //   .contains("Good Certified candidates");
    cy.get('[data-cy=see-more-link]')
      .should('have.attr', 'href', "/candidates")
      .contains("See More Candidates");
    cy.get('[data-cy=candidate-mini-card]')
      .should('have.length', homepageCandidates.length)
      .each(($el, index) => {
        // cy.testCandidateMiniCard($el, homepageCandidates[index]);
    });
  });
  // it('test Goodparty section', () => {
  //   cy.get('[data-cy=party-on]')
  //     .contains("We party on");
  //   cy.get('[data-cy=accomplish-label]')
  //     .contains("What does partying accomplish?");
  // });
  // it('test WhatIsIt section', () => {
  //   cy.get('[data-cy=wii-title]')
  //     .contains("What is");
  //   cy.get('[data-cy=wii-definition]')
  //     .contains("that tears away our hopes");
  //   cy.get('[data-cy=mainfesto-link]')
  //     .should('have.attr', 'href', '/manifesto')
  //     .contains('Read our Manifesto');
  // });
  // it('test Anatomy section', () => {
  //   cy.get('[data-cy=anatomy-title]')
  //     .contains("Anatomy of a #goodparty");
  //   cy.get('[data-cy=anatomy-part-title-1]')
  //     .contains("GET TOGETHER");
  //   cy.get('[data-cy=anatomy-part-desc-1]')
  //     .contains("A #goodparty is whatever you want it to be: a sewing circle, a");
  //   cy.get('[data-cy=anatomy-part-title-2]')
  //     .contains("WITH FRIENDS AND FAMILY");
  //   cy.get('[data-cy=anatomy-part-desc-2]')
  //     .contains("Come together, share food and music, make memories - be together");
  //   cy.get('[data-cy=anatomy-part-title-3]')
  //     .contains("EVERY TUESDAY");
  //   cy.get('[data-cy=anatomy-part-desc-3]')
  //     .contains("Do it so you can do it again. Pitch in, clean up and help host, so");
  // });
});
