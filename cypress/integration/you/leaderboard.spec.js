import promisify from 'cypress-promise';
import { parseCookie } from '../../support/utils';

describe('Leaderboard', () => {
  const user = parseCookie(Cypress.env('cookie'));
  const { feedback } = user;
  beforeEach(() => {
    cy.visit('/you/crew/');
    cy.get('[data-cy=page-title]').contains('Crew Page');
    cy.signInWithDefaultUser();
  });
  it(`finds correct text`, () => {
    cy.get('[data-cy=title]').should('contain', 'Good Party Leaders');
    cy.get('[data-cy=description]').should(
      'contain',
      'See where you rank in recruiting people to The Good Party.',
    );
  });
  it(`check crew tab`, async () => {
    cy.get('[data-cy=your-crew]').should('contain', 'Your Crew');
    cy.get('[data-cy=overall-crew]')
      .should('contain', 'See Overall Leaderboard')
      .should('have.attr', 'href')
      .and('contain', '/you/crew/leaderboard');
    const crew = await promisify(
      cy.getUserCrew().then(response => response.body),
    );
    cy.get('[data-cy=you-rank]').should('contain', 1);
    cy.get('[data-cy=crew-member]')
      .should('contain', 'YOU')
      .and('contain', crew.crewCount);
    cy.get('[data-cy=you-crew-name]').should('contain', 'YOU');
    cy.get('[data-cy=you-location]')
      .should('contain', user.shortState ? user.shortState.toUpperCase() : '')
      .and('contain', user.districtNumber && `-${user.districtNumber}`);
    if (feedback) {
      cy.get('[data-cy=you-feedback]').should('contain', feedback);
    }
    if (crew.crew.length > 0) {
      cy.get('[data-cy=crew-row]')
        .should('have.length', crew.crew.length)
        .each(($el, index) => {
          cy.checkCrewRow($el, crew.crew[index], user, index);
        });
    }
  });
  it(`check overall tab`, async () => {
    cy.get('[data-cy=overall-crew]').click();
    cy.url().should('contain', '/you/crew/leaderboard');
    cy.get('[data-cy=overall-crew]').should('contain', 'Overall Leaderboard');
    cy.get('[data-cy=your-crew]')
      .should('contain', 'See your Crew')
      .should('have.attr', 'href')
      .and('contain', '/you/crew');
    const leaders = await promisify(
      cy.getLeaders().then(response => response.body.leaderboard),
    );
    if (leaders.length > 0) {
      cy.get('[data-cy=crew-row]')
        .should('have.length', leaders.length)
        .each(($el, index) => {
          cy.checkCrewRow($el, leaders[index], user, index);
          // cy.wrap($el).contains(textList[index]);
        });
    }
  });
});
