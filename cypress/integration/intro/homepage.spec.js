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
    cy.get('[data-cy=post-count-label]')
      .contains('#goodparty posts');
    cy.get('[data-cy=heart-icon]')
      .should('have.attr', 'src', '/images/heart.svg');
    cy.get('[data-cy=people-count-label]')
      .contains('@goodparty people');
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
