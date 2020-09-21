import { numberFormatter } from '../../../app/helpers/numberHelper';
import {
  partyResolver,
  candidateRoute,
  candidateBlocName,
  generateEmptyBlocCandidate,
} from '../../../app/helpers/electionsHelper';

Cypress.Commands.add(
  'testElectionHeaderSection',
  (candidates, election, title) => {
    const { chamber, state, districtNumber } = election;
    const stateUpper = state ? state.toUpperCase() : '';
    const { topRank, threshold, userState, electors, good } = candidates;
    const suffixText =
      chamber === 'presidential'
        ? ' (270 ELECTORS)'
        : ` IN ${stateUpper}${districtNumber ? `-${districtNumber}` : ''}`;
    cy.get('[data-cy=title]').contains(title);
    cy.get('[data-cy=supporters-count]').should(
      'contain',
      numberFormatter(topRank),
    );
    cy.get('[data-cy=supporters-body]').contains(
      'likely voters for top candidate',
    );
    cy.testSupportersProgressBar(
      'supporters',
      threshold,
      topRank,
      userState,
      false,
      suffixText,
    );
    if (good.length > 0) {
      cy.get('[data-cy=description]')
        .should('contain', 'Join any')
        .and('contain', 'let you know if they grow big enough to win!');
      cy.get('[data-cy=description]')
        .find('[data-cy=article]')
        .contains('candidate voting blocs')
        .should('have.attr', 'href')
        .and('include', '?article=1ic6T6fhH0jZLNvX5aZkDe');
    } else {
      cy.get('[data-cy=description]')
        .should('contain', 'looking for')
        .and(
          'contain',
          'in this race. Join #GoodBloc to be notified as soon as we find any good candidates.',
        );
      cy.get('[data-cy=description]')
        .find('[data-cy=good-candidate-option]')
        .contains('good candidate options')
        .click();
      cy.testFiltersPopup();
    }
  },
);

Cypress.Commands.add('testFiltersPopup', () => {
  cy.get('[data-cy=filters-popup]').as('popup');
  cy.get('@popup')
    .find('[data-cy=title]')
    .contains('Good Criteria');

  cy.get('@popup')
    .find('[data-cy=follow-money-title]')
    .contains('Follow the Money');
  cy.get('@popup')
    .find('[data-cy=follow-money-1-label]')
    .should('contain', 'Mostly Funded by Small Donors')
    .and('contain', '$200');
  cy.get('@popup')
    .find('[data-cy=follow-money-1-body]')
    .should(
      'contain',
      'Major candidates who have raised lots of funding, but have ensured that most of their funding',
    )
    .and('contain', '$200')
    .and('contain', '50%');
  cy.get('@popup')
    .find('[data-cy=follow-money-2-label]')
    .should('contain', 'Relatively Small Amount of Funding');
  cy.get('@popup')
    .find('[data-cy=follow-money-2-body]')
    .should(
      'contain',
      'Relatively lessor known candidates who have raised less than half',
    )
    .and('contain', 'of the funding of the incumbent in race.')
    .and('contain', '50%');

  cy.get('@popup')
    .find('[data-cy=character-check-title]')
    .contains('Character Check');
  cy.get('@popup')
    .find('[data-cy=character-check-label]')
    .should('contain', 'Vetted for Hate-Speech');
  cy.get('@popup')
    .find('[data-cy=character-check-body]')
    .should(
      'contain',
      'Candidate has not engaged in a pattern of activities or',
    )
    .and(
      'contain',
      'that encourages intolerance, discrimination or hostility towards a constitutionally or state-protected group or class.',
    );
  cy.get('@popup')
    .find('[data-cy=character-check-body]')
    .find('[data-cy=character-check-link]')
    .contains('hate-speech')
    .should('have.attr', 'href')
    .and('include', '?article=5bwvf0PwsbpFEe8IJ9sHhX');
  cy.get('[data-cy=popup-close]').click();
});
Cypress.Commands.add(
  'testSupportersProgressBar',
  (
    el,
    votesNeeded,
    peopleSoFar,
    userState,
    showSupporters = true,
    suffixText,
    prefixText = 'likely voters for top candidate',
  ) => {
    let progress = 3;
    if (peopleSoFar && votesNeeded) {
      progress = 3 + (peopleSoFar * 100) / votesNeeded;
    }
    if (progress > 100) {
      progress = 100;
    }
    cy.get(`[data-cy=${el}]`)
      .find('[data-cy=supporter-progress]')
      .as('supporter');
    if (showSupporters) {
      cy.get('@supporter')
        .find('[data-cy=people-so-far]')
        .should('contain', numberFormatter(peopleSoFar))
        .and('contain', peopleSoFar === 1 ? 'person ' : 'people ')
        .and('contain', prefixText);
    }
    cy.get('@supporter')
      .find('[data-cy=votes-needed]')
      .should('contain', numberFormatter(votesNeeded))
      .and('contain', userState ? `IN ${userState.toUpperCase()}` : '')
      .and('contain', suffixText);
  },
);

Cypress.Commands.add('testCommonCandidateWrapper', ($el, candidate) => {
  cy.wrap($el)
    .find('[data-cy=candidate-name]')
    .contains(candidate.name);
  cy.wrap($el)
    .find('[data-cy=candidate-role]')
    .should('contain', partyResolver(candidate.party))
    .and('contain', candidate.isIncumbent ? 'INCUMBENT' : '');
});
Cypress.Commands.add('testBlockCountSection', ($el, candidate, chamber) => {
  cy.wrap($el)
    .find('[data-cy=block-count]')
    .should('contain', numberFormatter(candidate.ranking))
    .and('contain', candidateBlocName(candidate, chamber));
});

Cypress.Commands.add(
  'testChoiceButton',
  ($el, candidate, chamber, noneYetCandidate) => {
    cy.wrap($el)
      .find('[data-cy=join-button]')
      .should(
        'contain',
        candidate.id === noneYetCandidate.id
          ? '#GoodBloc'
          : candidateBlocName(candidate, chamber),
      )
      .and('contain', 'JOIN');
  },
);
Cypress.Commands.add('testVSList', (candidates, election) => {
  const { ranking, good, notGood, unknown, goodEmptyBloc } = candidates;
  const { chamber, state, districtNumber } = election;
  const goodBloc = `${state && state.toUpperCase()}${districtNumber || ''}`;
  if (candidates && (good || notGood || unknown)) {
    const noneYetCandidate = generateEmptyBlocCandidate(
      districtNumber,
      chamber,
      state,
    );
    const nextChoice = 1;
    // good candidates
    cy.get('[data-cy=vs-list]').as('vs-list');
    cy.get('@vs-list')
      .find('[data-cy=good-side]')
      .as('good-side');
    cy.get('@good-side')
      .find('[data-cy=side-title]')
      .contains('POTENTIALLY GOOD');
    if (good.length > 0) {
      cy.get('@good-side')
        .find('[data-cy=candidate]')
        .should('have.length', good.length)
        .each(($el, index) => {
          cy.wrap($el)
            .should('have.attr', 'href')
            .should('include', candidateRoute(good[index]));
          cy.testCommonCandidateWrapper($el, good[index]);
          cy.testBlockCountSection($el, good[index], chamber);
          cy.testChoiceButton($el, good[index], chamber, noneYetCandidate);
        });
    } else {
      cy.get('@good-side')
        .find('[data-cy=candidate]')
        .find('[data-cy=candidate-name]')
        .contains('NONE YET');
      cy.get('@good-side')
        .find('[data-cy=candidate]')
        .find('[data-cy=candidate-role]')
        .should('contain', 'GOOD PARTY APPROVED');
      cy.get('@good-side')
        .find('[data-cy=candidate]')
        .find('[data-cy=block-count]')
        .should('contain', numberFormatter(goodEmptyBloc))
        .and('contain', goodEmptyBloc === 1 ? 'is' : 'are')
        .and('contain', 'in #GoodBloc of');
      cy.get('@good-side')
        .find('[data-cy=candidate]')
        .should('have.length', 1)
        .each($el => {
          cy.testChoiceButton($el, noneYetCandidate, chamber, noneYetCandidate);
        });
    }
    // not good candidates
    cy.get('@vs-list')
      .find('[data-cy=not-good-side]')
      .as('not-good-side');
    cy.get('@not-good-side')
      .find('[data-cy=side-title]')
      .contains('NOT GOOD ENOUGH');
    cy.get('@not-good-side')
      .find('[data-cy=candidate]')
      .should('have.length', notGood.length)
      .each(($el, index) => {
        cy.wrap($el)
          .should('have.attr', 'href')
          .should('include', candidateRoute(notGood[index]));
        cy.testCommonCandidateWrapper($el, notGood[index]);
        cy.wrap($el)
          .find('[data-cy=why-not]')
          .should('contain', 'Why not good enough?');
      });

    if (unknown && unknown.length > 0) {
      cy.get('@vs-list')
        .find('[data-cy=unknown-side]')
        .as('unknown-side');
      cy.get('@unknown-side')
        .find('[data-cy=side-title]')
        .contains('NOT YET RATED');
      cy.get('@unknown-side')
        .find('[data-cy=candidate]')
        .should('have.length', unknown.length)
        .each(($el, index) => {
          cy.wrap($el)
            .should('have.attr', 'href')
            .should('include', candidateRoute(unknown[index]));
          cy.testCommonCandidateWrapper($el, unknown[index]);
          cy.testChoiceButton($el, unknown[index], chamber, noneYetCandidate);
        });
    }

    cy.get('@vs-list')
      .find('[data-cy=open-filter]')
      .contains('GOOD CRITERIA')
      .click();
    cy.testFiltersPopup();

    cy.get('@vs-list')
      .find('[data-cy=vs]')
      .contains('VS');

    cy.get('@vs-list')
      .find('[data-cy=nominate-candidate]')
      .should('contain', 'Nominate a candidate')
      .and('have.attr', 'href')
      .and('include', 'https://forms.gle/kydnhUp6xqF6RUpb9');
  }
});
