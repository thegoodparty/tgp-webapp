import { shortToLongState } from '../../../app/helpers/electionsHelper';
import { numberNth } from '../../../app/helpers/numberHelper';
import { getElectionCount, getCdsWithPerc } from '../../support/utils';

context('Election', () => {
  const elections = [
    { chamber: 'presidential' },
    { chamber: 'senate', state: 'ca' },
    { chamber: 'senate', state: 'mi' },
    { chamber: 'house', state: 'ca', districtNumber: 40 },
    { chamber: 'house', state: 'mi', districtNumber: 30 },
  ];
  elections.forEach(election => {
    let location = '';
    const { chamber, state, districtNumber } = election;
    const displayChamber = chamber.replace(/^\w/, c => c.toUpperCase());
    let url = `/elections/${chamber}`;
    if (districtNumber) {
      location = `for ${state.toUpperCase()}, ${districtNumber}`;
      url += `/${state}/${districtNumber}`;
    } else if (state) {
      location = `for ${state.toUpperCase()}`;
      url += `/${state}`;
    }

    describe(`check ${displayChamber} Election page ${location}`, () => {
      let candidates;
      const stateLong = state && shortToLongState[state.toUpperCase()];
      beforeEach(() => {
        cy.visit(url);
        cy.get('[data-cy=page-title]').contains(
          `${displayChamber} Election | The Good Party`,
        );
      });
      it(`loads candidates data and finds header part`, () => {
        let title = `${displayChamber} Elections`;
        if (chamber === 'senate' && state) {
          title = `${stateLong} ${displayChamber} Election`;
        } else if (chamber === 'house' && state && districtNumber) {
          title = `${stateLong}'s ${numberNth(
            districtNumber,
          )} District ${displayChamber} Election`;
        }
        let loadCandidates;
        if (districtNumber) {
          loadCandidates = {
            func: cy.getHouseCandidateData(state, districtNumber),
            key: 'houseCandidates',
          };
        } else if (state) {
          loadCandidates = {
            func: cy.getSenateCandidateData(state),
            key: 'senateCandidates',
          };
        } else {
          loadCandidates = {
            func: cy.getPresidentialCandidateData(),
            key: 'presidential',
          };
        }
        loadCandidates.func.then(response => {
          candidates = response.body[loadCandidates.key];
          cy.testElectionHeaderSection(candidates, election, title);
        });
      });
      it(`finds VSList`, () => {
        cy.testVSList(candidates, election);
      });
      it('finds ama link', () => {
        cy.testAmaContainer();
      });
      it('finds top questions section', () => {
        cy.testTopQueSection('election');
      });
    });
  });
});
