import promisify from 'cypress-promise';
import {
  houseElectionLink,
  isEmptyCandidates,
  presidentialElectionLink,
  senateElectionLink,
} from '../../../app/helpers/electionsHelper';
import { getElectionCount, getCdsWithPerc } from '../../support/utils';
import { testZipcodes } from '../../constants';

context('District', () => {
  let district;
  let presidential;
  let house;
  let senate;
  let electionCount;
  let shortState;

  Object.keys(testZipcodes).forEach(zipcode => {
    describe(`check district page for ${zipcode} ${
      testZipcodes[zipcode]
    }`, () => {
      it(`loads district data and finds Select District section`, async () => {
        cy.visit(`/elections/district/${zipcode}`);
        cy.get('[data-cy=page-title]').contains('Elections | District Page');
        district = await promisify(
          cy.getDistrictData(zipcode).then(res => res.body),
        );
        const { stateShort, approxPctArr, cds } = district;
        shortState = stateShort ? stateShort.toUpperCase() : '';
        cy.get('[data-cy=select-district]')
          .should('contain', 'Not Your District?')
          .click()
          .should('contain', 'Select Your District');
        const cdWithPerc = getCdsWithPerc(approxPctArr, cds);
        if (cdWithPerc.length > 1) {
          cy.get('[data-cy=active-district]')
            .should('have.length', cdWithPerc.length)
            .each(($el, index) => {
              // check district name
              cy.wrap($el)
                .find('[data-cy=district-name]')
                .should('contain', cdWithPerc[index].name);
              // check district data
              cy.wrap($el)
                .find('[data-cy=district-data]')
                .should(
                  'contain',
                  `${
                    cdWithPerc[index].pct
                  }% of ${zipcode} zip code population live in ${
                    cdWithPerc[index].name
                  }`,
                );
              // check if it goes to the correct district page when we click one district
              cy.wrap($el).click();
              cy.url().should('include', `/${zipcode}/${index}`);
            });
        }

        // check if it goes to zip finder page when we click Change your Zip Code
        cy.get('[data-cy=change-zip]')
          .should('contain', 'Change your Zip Code')
          .click();
        cy.url().should('include', '/zip-finder');
      });

      it(`loads presidential data and finds Presidential section`, async () => {
        cy.visit(`/elections/district/${zipcode}`);
        cy.get('[data-cy=page-title]').contains('Elections | District Page');

        presidential = await promisify(
          cy
            .getPresidentialCandidateData(zipcode)
            .then(res => res.body.presidential),
        );
        const { stateShort } = district;
        const upperState = stateShort ? stateShort.toUpperCase() : stateShort;
        cy.get('[data-cy=presidential]')
          .should('have.attr', 'href')
          .and('include', presidentialElectionLink());
        cy.testVSCard(
          'presidential',
          'Presidential Election',
          presidential,
          ` IN ${upperState} (${presidential.electors} ELECTORS)`,
        );
      });

      it(`loads senate candidate data and finds Senate Candidate section`, async () => {
        senate = await promisify(
          cy
            .getSenateCandidateData(shortState)
            .then(res => res.body.senateCandidates),
        );
        if (!isEmptyCandidates(senate)) {
          const { stateLong } = district;
          cy.get('[data-cy=senate]')
            .should('have.attr', 'href')
            .and('include', senateElectionLink(shortState));
          cy.testVSCard(
            'senate',
            `Senator - ${stateLong}`,
            senate,
            ` ${shortState}`,
          );
        }
      });

      it(`loads house candidate data and checks header/house candidate section for all districts`, () => {
        district.cds.forEach(async (cd, index) => {
          house = await promisify(
            cy
              .getHouseCandidateData(shortState, cd.code)
              .then(res => res.body.houseCandidates),
          );
          cy.visit(`/elections/district/${zipcode}/${index}`);
          const { primaryCity, zip } = district;
          if (district && presidential) {
            cy.get('[data-cy=district]')
              .should('have.attr', 'href')
              .and('include', houseElectionLink(shortState, cd.code));
            cy.get('[data-cy=location]')
              .should('contain', primaryCity)
              .and('contain', zip)
              .and('contain', shortState);
            cy.get('[data-cy=congressional-district]')
              .should('contain', 'Congressional District:')
              .and('contain', shortState)
              .and('contain', cd.code);
            electionCount = getElectionCount(senate, house);
            cy.get('[data-cy=election-count]').should('contain', electionCount);
            cy.get('[data-cy=federal-election]')
              .should('contain', 'relevant Federal Elections')
              .and('contain', 'to see if your vote can elect someone');
            cy.get('[data-cy=candidate-article]')
              .should('contain', 'candidate voting blocs')
              .should('have.attr', 'href')
              .and('include', '?article=1ic6T6fhH0jZLNvX5aZkDe');
            cy.get('[data-cy=potentially-good-article]')
              .should('contain', 'Potentially Good')
              .should('have.attr', 'href')
              .and('include', '?article=5KnBx42FOEVDJNUFpoU1PX');
          }
        });
      });

      it('finds ama link', () => {
        cy.testAmaContainer();
      });
      it('finds top questions section', () => {
        cy.testTopQueSection('district');
      });
    });
  });
});
