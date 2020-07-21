import { parseCookie } from '../../support/utils';

describe('Edit Profile', () => {
  let user = parseCookie(Cypress.env('cookie'));
  beforeEach(() => {
    cy.visit('/you/edit');
    cy.get('[data-cy=page-title]').contains('Edit Profile | The Good Party');
    cy.signInWithDefaultUser();
  });
  it(`finds correct text`, () => {
    cy.get('[data-cy=back-link]')
      .should('have.attr', 'href')
      .and('contain', '/you');
    cy.get('[data-cy=title]').should('contain', 'Edit Profile');
  });
  it(`check edit initial info section`, () => {
    cy.checkInitialInfoEditSection();
  });
  it(`check congressional district section`, () => {
    cy.checkCongressionalDistrictEditSection(user);
  });
  it(`check private info section`, () => {
    cy.checkPrivateInfoEditSection(user);
  });
  // it('loads user data', () => {
  //   cy.getUserRanking().then(response => {
  //     ranking = response.body.ranking;
  //   });
  //   cy.getUserCrew().then(response => {
  //     crew = response.body.ranking;
  //   });
  // });
  // it('check election section without zipcode', () => {
  //   cy.checkElectionSectionInYou(
  //     user,
  //     senateCandidatesCount,
  //     houseCandidatesCount,
  //     getRankingObj(ranking),
  //   );
  // });
});
