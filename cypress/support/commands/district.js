import { partyResolver } from '../../../app/helpers/electionsHelper';


Cypress.Commands.add('testVSCard', (el, title, candidates, suffixText) => {
  const { good, notGood, unknown, topRank, userState, threshold } = candidates;
  const cloneGood = [...good];
  if (cloneGood.length === 0) {
    cloneGood.push({
      id: 'noneyet',
      name: 'NONE YET',
      party: 'VC',
      image: 'http://assets.thegoodparty.org/gray-heart.png',
      isGood: true,
    });
  }
  if (
    (good || notGood || unknown) &&
    !(
      notGood &&
      notGood.length === 0 &&
      unknown &&
      unknown.length === 0 &&
      cloneGood.length === 1 &&
      cloneGood[0].id === 'noneyet'
    )
  ) {
    cy.get(`[data-cy=${el}]`)
      .find('[data-cy=vs-card]')
      .as('vscard')
      .find('[data-cy=title]')
      .should('contain', title);
    cy.get('@vscard')
      .find('[data-cy=potentially-good]')
      .contains('POTENTIALLY GOOD');
    cy.get('@vscard')
      .find('[data-cy=good-candidates]')
      .as('good')
      .find('[data-cy=candidate-avatar]')
      .should('have.length', cloneGood.length >= 3 ? 3 : cloneGood.length);
    if (cloneGood.length > 1) {
      cy.get('@good')
        .find('[data-cy=candidates-count]')
        .contains(`${cloneGood.length} CANDIDATES`);
    } else {
      cy.get('@good')
        .find('[data-cy=candidates-name]')
        .contains(cloneGood[0].name.toUpperCase());
      cy.get('@good')
        .find('[data-cy=candidates-role]')
        .contains(
          cloneGood[0].isIncumbent
            ? 'INCUMBENT'
            : partyResolver(cloneGood[0].party),
        );
    }
    cy.get('@vscard')
      .find('[data-cy=not-good-enough]')
      .contains('NOT GOOD ENOUGH');
    cy.get('@vscard')
      .find('[data-cy=not-good-candidates]')
      .as('not-good')
      .find('[data-cy=candidate-avatar]')
      .should('have.length', notGood.length >= 3 ? 3 : notGood.length);
    if (notGood.length > 1) {
      cy.get('@not-good')
        .find('[data-cy=candidates-count]')
        .contains(`${notGood.length} CANDIDATES`);
    } else {
      cy.get('@not-good')
        .find('[data-cy=candidates-name]')
        .contains(notGood[0].name.toUpperCase());
      cy.get('@not-good')
        .find('[data-cy=candidates-role]')
        .contains(
          notGood[0].isIncumbent
            ? 'INCUMBENT'
            : partyResolver(notGood[0].party),
        );
    }

    // Supports Progress
    let progress = 3;
    if (topRank && threshold) {
      progress = 3 + (topRank * 100) / threshold;
    }
    if (progress > 100) {
      progress = 100;
    }
    cy.testSupportersProgressBar(
      el,
      threshold,
      topRank,
      userState,
      true,
      suffixText,
    );
  }
});
