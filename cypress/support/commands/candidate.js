import promisify from 'cypress-promise';
import { candidateRoute, partyResolver } from '../../../helpers/electionsHelper';
import { numberFormatter } from '../../../helpers/numberHelper';

Cypress.Commands.add('testCandidateMiniCard', ($el, candidate) => {
  const {
    firstName,
    lastName,
    image,
    race,
    party,
    supporters,
    headline,
    isDraft,
  } = candidate;
  cy.wrap($el)
    .find('[data-cy=mini-name]')
    .contains(firstName)
    .contains(lastName);
  cy.wrap($el)
    .find('[data-cy=mini-race]')
    .contains(race);
  cy.wrap($el)
    .find('[data-cy=mini-party-icon]')
    .should('have.attr', 'src', '/images/homepage/party-icon.svg');
  cy.wrap($el)
    .find('[data-cy=mini-party]')
    .contains(partyResolver(party));
  cy.wrap($el)
    .find('[data-cy=mini-bubble-icon]')
    .should('have.attr', 'src', '/images/homepage/talk-bubble-icon.svg');
  cy.wrap($el)
    .find('[data-cy=mini-headline]')
    .contains(headline);
  cy.wrap($el)
    .find('[data-cy=mini-endorsements]')
    .contains(`${numberFormatter(supporters)} endorsements`);
  cy.wrap($el)
    .find('[data-cy=mini-more]')
    .should('have.attr', 'href', candidateRoute(candidate));
  cy.wrap($el)
    .find('[data-cy=mini-more]')
    .contains(`See Campaign`);
  // cy.wrap($el)
  //   .find('[data-cy=candidate-role]')
  //   .should('contain', partyResolver(candidate.party))
  //   .and('contain', candidate.isIncumbent ? 'INCUMBENT' : '');
});
  