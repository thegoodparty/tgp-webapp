import { candidateName, runningFor } from '../../../helpers/applicationHelper';
import { candidateRoute, partyResolver } from '../../../helpers/electionsHelper';
import { numberFormatter } from '../../../helpers/numberHelper';
import { dateUsHelper } from '../../../helpers/dateHelper';

Cypress.Commands.add('testCandidatePartyRace', (id, candidate) => {
  const { party, otherParty, race } = candidate;
  cy.get(`[data-cy=${id}]`)
    .contains(partyResolver(party, otherParty))
    .contains(race);
});

Cypress.Commands.add('testCandidateMiniCard', ($el, candidate) => {
  const {
    firstName,
    lastName,
  } = candidate;
  cy.wrap($el)
    .find('[data-cy=candidate-name]')
    .contains(firstName)
    .contains(lastName);
  cy.wrap($el)
    .find('[data-cy=candidate-view]')
    .contains("View Campaign");
  cy.wrap($el)
    .find('[data-cy=candidate-link]')
    .should('have.attr', 'href', candidateRoute(candidate));
});

Cypress.Commands.add('testCandidateCard', ($el, candidate) => {
  const {
    firstName,
    lastName,
    party,
    otherParty,
    positions,
  } = candidate;
  cy.wrap($el)
    .find('[data-cy=candidate-name]')
    .contains(firstName)
    .contains(lastName);
  cy.wrap($el)
    .find('[data-cy=candidate-party]')
    .contains(partyResolver(party, otherParty));
  if(positions && positions.length > 0) {
    cy.wrap($el)
      .find('[data-cy=position]')
      .should('have.length', positions.length);
  }
});

Cypress.Commands.add('testFeaturedCampaignsComponent', (homepageCandidates) => {
  cy.get('[data-cy=campaigns-title]')
    .contains("Featured Campaigns");
  cy.get('[data-cy=campaigns-more-link]')
    .should('have.attr', 'href', '/candidates');
  cy.get('[data-cy=campaigns-more-link]')
    .contains("See More");

  cy.get('[data-cy=campaign-card]')
    .should('have.length', homepageCandidates.length)
    .each(($el, index) => {
      cy.testCandidateCard($el, homepageCandidates[index]);
    });
});

Cypress.Commands.add('testStaffCard', ($el, staff) => {
  const { candidate, role } = staff;
  if(candidate) {
    const { id, firstName, lastName, party, otherParty } = candidate;
    cy.wrap($el)
      .find('[data-cy=staff-link]')
      .should('have.attr', 'href', `/candidate-portal/${id}`);
    cy.wrap($el)
      .find('[data-cy=staff-role]')
      .contains('Your Role:')
      .contains(`Campaign ${role}`);
    cy.wrap($el)
      .find('[data-cy=staff-name]')
      .contains(`${firstName} ${lastName}`);
    cy.wrap($el)
      .find('[data-cy=staff-race]')
      .contains(`${partyResolver(party, otherParty)} ${party !== 'I' ? 'Party' : ''}`);
  }
  const {
    firstName,
    lastName,
    race,
    party,
    supporters,
    headline,
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
});

Cypress.Commands.add('testApplicationPreview', ($el, app) => {
  cy.wrap($el)
    .find('[data-cy=application-link]')
    .should('have.attr', 'href', `/campaign-application/${app.id}/1`);
  cy.wrap($el)
    .find('[data-cy=application-name]')
    .contains(candidateName(app));
  cy.wrap($el)
    .find('[data-cy=application-runfor]')
    .contains(runningFor(app));
  cy.wrap($el)
    .find('[data-cy=application-status]')
    .contains(app.status);
  cy.wrap($el)
    .find('[data-cy=application-date]')
    .contains(dateUsHelper(app.createdAt))
    .contains(dateUsHelper(app.updatedAt));
});
