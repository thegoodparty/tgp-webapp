import { testZipcodes, feedbackLink } from '../../constants';
import { parseCookie, getRankingObj, userDistrict } from '../../support/utils';
import { countCandidates } from '../../../app/helpers/candidatesHelper';

context('You', () => {
  describe(`check You Page for guest user`, () => {
    beforeEach(() => {
      cy.visit('/you');
      cy.get('[data-cy=page-title]').contains('You | The Good Party');
    });
    it('check register section', () => {
      cy.checkGuestRegisterSectionInYou();
    });
    it('finds ama link', () => {
      cy.testAmaContainer();
    });
    it('finds top questions section', () => {
      cy.testTopQueSection('party');
    });
  });
  describe(`check You Page for signed user`, () => {
    let ranking = null;
    let crew = null;
    let user = parseCookie(Cypress.env('cookie'));
    let districtNumber = null;
    let houseCandidates = null;
    let senateCandidates = null;
    let senateCandidatesCount = 0;
    let houseCandidatesCount = 0;

    beforeEach(() => {
      cy.visit('/you');
      cy.get('[data-cy=page-title]').contains('You | The Good Party');
      cy.signInWithDefaultUser();
    });
    it('loads user data', () => {
      cy.getUserRanking().then(response => {
        ranking = response.body.ranking;
      });
      cy.getUserCrew().then(response => {
        crew = response.body.ranking;
      });
    });
    it('check election section without zipcode', () => {
      cy.checkElectionSectionInYou(
        user,
        senateCandidatesCount,
        houseCandidatesCount,
        getRankingObj(ranking),
      );
    });
    Object.keys(testZipcodes).forEach(zipcode => {
      it(`check election section - ${zipcode} ${testZipcodes[zipcode]}`, () => {
        cy.chooseCorrectZipcode(zipcode);
        cy.visit('/you');
        cy.getCookie('user').then(cookie => {
          user = parseCookie(cookie.value);
          districtNumber = userDistrict(user);
          const { shortState } = user;
          cy.getHouseCandidateData(shortState, districtNumber).then(
            response => {
              houseCandidates = response.body.houseCandidates;
              cy.getSenateCandidateData(shortState).then(senate_response => {
                senateCandidates = senate_response.body.senateCandidates;
                senateCandidatesCount = countCandidates(senateCandidates);
                houseCandidatesCount = countCandidates(houseCandidates);
                cy.checkElectionSectionInYou(
                  user,
                  senateCandidatesCount,
                  houseCandidatesCount,
                  getRankingObj(ranking),
                );
              });
            },
          );
        });
      });
    });
    it('check crew section', () => {
      cy.checkCrewSectionInYou(user, crew);
    });
    it('check help section', () => {
      cy.get('[data-cy=help-title]').should(
        'contain',
        'What can you do to help?',
      );
      cy.get('[data-cy=friend-invite]').should('contain', 'Invite Friends');
      cy.get('[data-cy=feedback-link]')
        .should('contain', 'Give Feedback or Suggestions')
        .should('have.attr', 'href')
        .and('contain', feedbackLink);
      cy.get('[data-cy=creators-link]')
        .should('contain', 'Creators of the World, Unite! help create')
        .should('have.attr', 'href')
        .and('contain', '/creators');
    });
    it('check sign out', () => {
      cy.checkSignOutInYou();
    });
    it('finds ama link', () => {
      cy.testAmaContainer();
    });
    it('finds top questions section', () => {
      cy.testTopQueSection('party');
    });
  });
});
