import { numberFormatter } from '../../../helpers/numberHelper';
Cypress.Commands.add(
'testSupportersProgressBar',
(
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
    cy.get('[data-cy=supporter-progress]')
    .as('supporter');
    if (showSupporters) {
        cy.get('@supporter')
          .find('[data-cy=people-so-far]')
          .should('contain', numberFormatter(peopleSoFar))
          .and('contain', peopleSoFar === 1 ? 'person ' : 'people ')
          .and('contain', prefixText);
        }
    }
);