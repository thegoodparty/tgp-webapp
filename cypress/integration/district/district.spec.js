import articlesHelper from '../../../app/helpers/articlesHelper';
import {
  houseElectionLink,
  isEmptyCandidates,
  presidentialElectionLink,
  senateElectionLink,
} from '../../../app/helpers/electionsHelper';
import { getElectionCount, getCdsWithPerc } from '../../support/utils';

context('District', () => {
  let district;
  let presidential;
  let house;
  let senate;
  let electionCount;
  let shortState;

  const zipcodes = {
    '40047': '(with Senate)',
    '90058': '(without Senate)',
    '50321': '(with Senate)',
    '84322': '(without Senate)',
  };
  Object.keys(zipcodes).forEach(zipcode => {
    describe(`check district page for ${zipcode} ${zipcodes[zipcode]}`, () => {
      it(`loads district data and finds Select District section`, () => {
        cy.visit(`/elections/district/${zipcode}`);
        cy.get('[data-cy=page-title]').contains('Elections | District Page');
        cy.getDistrictData(zipcode).then(response => {
          district = response.body;
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
      });

      it(`loads presidential data and finds Presidential section`, () => {
        cy.visit(`/elections/district/${zipcode}`);
        cy.get('[data-cy=page-title]').contains('Elections | District Page');

        cy.getPresidentialCandidateData(zipcode).then(response => {
          presidential = response.body.presidential;
          cy.get('[data-cy=presidential]')
            .should('have.attr', 'href')
            .and('include', presidentialElectionLink());
          cy.testVSCard(
            'presidential',
            'Presidential Election',
            presidential,
            ` IN ${shortState} (${presidential.electors} ELECTORS)`,
          );
        });
      });

      it(`loads senate candidate data and finds Senate Candidate section`, () => {
        cy.getSenateCandidateData(shortState).then(response => {
          senate = response.body.senateCandidates;
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
      });

      it(`loads house candidate data and checks header/house candidate section for all districts`, () => {
        district.cds.forEach((cd, index) => {
          cy.getHouseCandidateData(shortState, cd.code).then(response => {
            cy.visit(`/elections/district/${zipcode}/${index}`);
            house = response.body.houseCandidates;
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
              cy.get('[data-cy=election-count]').should(
                'contain',
                electionCount,
              );
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
      });

      it('finds ama link', () => {
        cy.get('[data-cy=ama]')
          .contains('Ask a Question')
          .contains('Give a Suggestion')
          .click();
        cy.get('[data-cy=ama-dialog-title')
          .contains('Ask a Question')
          .contains('Give a Suggestion');
        cy.get('[data-cy=ama-dialog-submit').contains('Send');
        cy.get('[data-cy=ama-dialog-submit')
          .should('have.attr', 'href')
          .and(
            'include',
            'mailto:ask@thegoodparty.org?subject=Good%20Party%20Question&body=',
          );
        cy.get('[data-cy=ama-dialog-close').click();
        cy.get('[data-cy=ama-dialog-title').should('not.exist');
      });
      it('finds top questions section', () => {
        cy.get('[data-cy=faqs]').contains('Top Questions');
        cy.fixture('content').should(content => {
          const partyFAQs = articlesHelper(content.faqArticles, 'district');
          cy.get('[data-cy=faq]')
            .should('have.length', partyFAQs.length)
            .each(($el, index) => {
              cy.testFAQ($el, index, partyFAQs[index]);
            });
        });
        cy.get('[data-cy=faqs-link]')
          .contains('See FAQ')
          .click();
        cy.url().should('include', '/party/faqs');
        cy.get('[data-cy=page-title]').contains('FAQs | The Good Party');
      });
    });
  });
});
