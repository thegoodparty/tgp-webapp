import { numberFormatter } from '../../../helpers/numberHelper';
Cypress.Commands.add(
'testSupportersProgressBar',
(
    peopleSoFar,
    votesNeeded,
    peopleThisPeriod,
    days,
    withAchievement = true,
) => {
    const weeksToElection = Math.floor(days / 7);
    let neededToWin = votesNeeded - peopleSoFar;
    if (neededToWin < 0) {
        neededToWin = 0;
    }
    let neededPerWeek;
    let neededThisWeek;
    let progress;
    if (days) {
        if (weeksToElection && weeksToElection !== 0) {
        neededPerWeek = Math.floor(neededToWin / weeksToElection);
        }
        neededThisWeek = neededPerWeek - peopleThisPeriod;
    } else {
        neededPerWeek = votesNeeded;
        neededThisWeek = votesNeeded;
        peopleThisPeriod = peopleSoFar;
    }

    if (neededThisWeek <= 0) {
        progress = 100;
    } else {
        progress = (peopleThisPeriod * 100) / neededPerWeek;
    }
    if (days < 0) {
        neededPerWeek = votesNeeded;
        progress = (peopleSoFar * 100) / votesNeeded;
    }

    if (progress > 100) {
        progress = 100;
    }
    cy.get('[data-cy=supporter-progress]')
    .as('supporter');
    if(neededPerWeek && neededPerWeek !== 0) {
        cy.get('@supporter')
          .find('[data-cy=supporter-total]')
          .should('contain', numberFormatter(neededPerWeek));
    }
    // if(withAchievement && days > 0) {
    //     if(progress < 100) {
    //         cy.get('@supporter')
    //           .find('[data-cy=supporter-description]')
    //           .should('contain', numberFormatter(neededPerWeek))
    //           .should('contain', ', we’ll be on track to win on election day!')
    //           .should('contain', 'followers this week');
    //     }
    //     else {
    //         cy.get('@supporter')
    //           .find('[data-cy=supporter-description]')
    //           .should('contain', 'This candidate has a good chance of')
    //           .should('contain', 'the momentum going!');
    //     }
    // }
});
