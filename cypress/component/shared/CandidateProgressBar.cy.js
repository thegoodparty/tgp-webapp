import TestComponent from '../TestComponent';
import CandidateProgressBar from '../../../components/shared/CandidateProgressBar';
import { numberFormatter } from '../../../helpers/numberHelper';

describe('CandidateProgressBar.cy.js', () => {
  it('Should render component', () => {
    const params = {
        peopleSoFar: 5,
        votesNeeded: 3045,
        peopleThisPeriod: 0,
        days: 0,
        color: "#000",
        withAchievement:true,
        withAnimation: true
    };
    const weeksToElection = Math.ceil(params.days / 7);
    let neededToWin = params.votesNeeded - params.peopleSoFar;
    if (neededToWin < 0) {
        neededToWin = 0;
    }
    let neededPerWeek;
    let neededThisWeek;
    let peopleThisPeriod;
    let progress = 0;
    if (params.days && params.days > 0) {
        if (weeksToElection && weeksToElection !== 0) {
            neededPerWeek = Math.floor(neededToWin / weeksToElection);
        }
        neededThisWeek = neededPerWeek - params.peopleThisPeriod;
    } else {
        neededPerWeek = params.votesNeeded;
        neededThisWeek = params.votesNeeded;
        peopleThisPeriod = params.peopleSoFar;
    }

    if (neededThisWeek <= 0) {
        progress = 100;
    } else {
        progress = (peopleThisPeriod * 100) / neededPerWeek;
    }
    if (params.days < 0) {
        neededPerWeek = params.votesNeeded;
        progress = (params.peopleSoFar * 100) / params.votesNeeded;
    }

    if (progress > 100) {
        progress = 100;
    }

    progress = progress / 2 + 50;
    if (!progress) {
        progress = 50;
    }
    if (progress < 0) {
        progress = 0;
    }
    cy.mount(
        <TestComponent Component={CandidateProgressBar} {...params} />
    );
    cy.get('[data-cy=peoplesofar-label]')
      .should('exist')
      .contains(numberFormatter(params.peopleSoFar));
    cy.get('[data-cy=peoplethisweek-label]')
      .should('exist')
      .contains(numberFormatter(params.peopleThisWeek));
    if(weeksToElection > 0) {
        cy.get('[data-cy=weekstoelection-label]')
          .should('exist')
          .contains(numberFormatter(params.weeksToElection));
    }
    else {
        cy.get('[data-cy=weekstoelection-label]')
          .should('exist')
          .contains('election ended');
    }
    if(neededPerWeek !== 0) {
        cy.get('[data-cy=neededperweek-label]')
          .should('exist')
          .contains(numberFormatter(neededPerWeek));
    }
    else {
        cy.get('[data-cy=neededperweek-label]')
          .should('not.exist');
    }
    if(params.withAchievement && params.days > 0) {
        cy.get('[data-cy=achivement-icon]')
          .should('exist');
        if(progress < 100) {
            cy.get('[data-cy=neededperweek-label1]')
              .should('exist')
              .contains(numberFormatter(neededPerWeek));
        }
        else {
            cy.get('[data-cy=neededperweek-label1]')
              .should('exist')
              .contains('This candidate has a good chance of');
        }
    }
    else {
        cy.get('[data-cy=achivement-icon]')
          .should('not.exist');
        cy.get('[data-cy=neededperweek-label1]')
          .should('not.exist');
    }
  });
})