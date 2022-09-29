import promisify from 'cypress-promise';
import CandidateAvatar from '../../../components/shared/CandidateCard/CandidateAvatar';
import { candidateColor, getPartyImage } from '../../../helpers/candidatesHelper';
import TestComponent from '../TestComponent';

const sampleCandidateList = [36, 30, 43];

context('CandidateAvatar.cy.js', () => {
  let candidate, partyImg, brightColor, hideBadge, partyBadge, size, party, image;
  sampleCandidateList.forEach(candidateId => {
    describe(`check candidate avatar - ${candidateId}`, () => {
      it(`loads candidate data`, async () => {
          candidate = await promisify(
              cy.getCandidate(candidateId).then(response => response.body),
          );
          candidate = candidate.candidate;
          ({party, image} = candidate);
      });
      it(`should render img avatar without party badge`, () => {
        hideBadge = true;
        partyBadge = false;
        size = "small";
        cy.mount(
          <TestComponent 
            Component={CandidateAvatar} 
            avatar={image}
            party={party}
            size={size}
            style={{ margin: '0 5px' }}
            hideBadge={hideBadge}
            partyBadge={partyBadge}
            candidate={candidate}
          />
        );
        partyImg = getPartyImage(partyBadge, party, hideBadge);
        brightColor = candidateColor(candidate);
        // cy.get('[data-cy="candidate-avatar-wrapper"]')
        //   .should('have.css', 'border-color', brightColor);
        cy.get('[data-cy="candidate-avatar-img"]')
          .should('have.attr', 'src', image);
      });
      it(`should render bg avatar with party badge`, () => {
        hideBadge = false;
        partyBadge = true;
        size = "large";
        cy.mount(
          <TestComponent 
            Component={CandidateAvatar} 
            avatar={image}
            party={party}
            size={size}
            style={{ margin: '0 5px' }}
            hideBadge={hideBadge}
            partyBadge={partyBadge}
            candidate={candidate}
          />
        );
        partyImg = getPartyImage(partyBadge, party, hideBadge);
        brightColor = candidateColor(candidate);
        cy.get('[data-cy="candidate-avatar-img"]')
          .should('have.css', 'background-image', `url("${
            image || 'https://assets.goodparty.org/gray-heart.png'
          }")`);
        cy.get('[data-cy="party-icon"]')
          .should('have.attr', 'src', partyImg);
      });
    });
  });
})