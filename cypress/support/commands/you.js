import promisify from 'cypress-promise';
import {
  getElectionLink,
  houseElectionLink,
  presidentialElectionLink,
  senateElectionLink,
} from '../../../app/helpers/electionsHelper';
import { numberNth } from '../../../app/helpers/numberHelper';
import {
  getUserDistrict,
  getDisplayCrew,
  getCrewFillers,
  uuidUrl,
  fullFirstLastInitials,
  getUserDistrictName,
} from '../../../app/helpers/userHelper';

import { formatToPhone } from '../../../app/helpers/phoneHelper';
import { parseCookie } from '../utils';

Cypress.Commands.add(
  'checkElectionSectionInYou',
  (user, senateCandidatesCount, houseCandidatesCount, rankingObj) => {
    const presidentialRank = rankingObj.presidential;
    const senateRank = rankingObj.presidential;
    const houseRank = rankingObj.house;
    const { name, feedback, zipCode, congDistrict } = user;
    const { zip, stateLong, stateShort, primaryCity, cds } = zipCode || {};
    const shortState = stateShort ? stateShort.toUpperCase() : '';
    const userDistrict = getUserDistrict(congDistrict, cds);
    const electionLink = getElectionLink(zip);
    const showHouse = houseCandidatesCount > 0;
    const showSenate = senateCandidatesCount > 0;

    const presidentialRankCount = Object.keys(presidentialRank).length;
    const senateRankCount = Object.keys(senateRank).length;
    const houseRankCount = Object.keys(houseRank).length;

    cy.get('[data-cy=edit-profile-link]')
      .should('contain', 'Edit Profile')
      .should('have.attr', 'href')
      .and('contain', '/you/edit');

    cy.get('[data-cy=profile-name]').should(
      'contain',
      fullFirstLastInitials(name),
    );

    if (shortState) {
      cy.get('[data-cy=city]').should(
        'contain',
        `${primaryCity}, ${shortState}-${userDistrict.code}`,
      );
    }

    cy.get('[data-cy=feedback]').should('contain', feedback);
    cy.get('[data-cy=location]').should(
      'contain',
      `Your Elections for ${shortState ? (shortState + ', ') : ''}${zip || ''}`,
    );

    // Presidential Election
    cy.get('[data-cy=presidential-election]').should(
      'contain',
      'Presidential:',
    );
    cy.get('[data-cy=presidential-election-link]')
      .should(
        'contain',
        presidentialRankCount === 0
          ? 'Rank Choices'
          : `${presidentialRankCount} Choice${
          presidentialRankCount === 1 ? '' : 's'
          } Ranked`,
      )
      .should('have.attr', 'href')
      .and('contain', presidentialElectionLink());

    // Senate Election
    if (stateLong) {
      cy.get('[data-cy=senate-election]').should(
        'contain',
        `Senate ${stateLong}:`,
      );
      if (showSenate) {
        cy.get('[data-cy=senate-election-link]')
          .should(
            'contain',
            senateRank
              ? `${senateRankCount} Choice${
              senateRankCount > 1 ? 's' : ''
              } Ranked`
              : 'Rank Choices',
          )
          .should('have.attr', 'href')
          .and('contain', senateElectionLink(shortState));
      } else {
        cy.get('[data-cy=no-senate-race]').should('contain', 'No Race in 2020');
      }
    }

    // House Election
    if (userDistrict.code) {
      cy.get('[data-cy=house-election]').should(
        'contain',
        `House: ${numberNth(userDistrict.code)} District (${shortState}-`,
      );
      if (showHouse) {
        cy.get('[data-cy=house-election-link]')
          .should(
            'contain',
            houseRank && houseRankCount > 0
              ? `${houseRankCount} Choice${
              houseRankCount > 1 ? 's' : ''
              } Ranked`
              : 'Rank Choices',
          )
          .should('have.attr', 'href')
          .and('contain', houseElectionLink(shortState, userDistrict.code));
      } else {
        cy.get('[data-cy=no-house-race]').should('contain', 'No Race in 2020');
      }
    }

    cy.get('[data-cy=all-election-link]')
      .should('contain', 'See All Elections')
      .should('have.attr', 'href')
      .and('contain', electionLink);
  },
);

Cypress.Commands.add('checkCrewSectionInYou', (user, crew) => {
  const displayCrew = getDisplayCrew(crew);
  const crewFillers = getCrewFillers(crew);
  const url = uuidUrl(user);
  cy.get('[data-cy=crew-title]')
    .should('contain', 'Your Crew')
    .and('contain', 'people recruited');
  cy.get('[data-cy=invite-crew-label]').should(
    'contain',
    'invite people to grow your crew',
  );

  cy.get('[data-cy=you-name]').should('contain', 'You');
  if (displayCrew.length > 0) {
    cy.get('[data-cy=crew-member]')
      .should('have.length', displayCrew.length)
      .each(($el, index) => {
        cy.wrap($el).contains(displayCrew[index].name);
      });
  }
  if (crewFillers.length > 0) {
    cy.get('[data-cy=crew-filler]')
      .should('have.length', crewFillers.length)
      .each(($el, index) => {
        cy.wrap($el).contains(crewFillers[index]);
      });
  }
  cy.get('[data-cy=leaderboards-link]')
    .should('contain', 'View Leaderboards')
    .should('have.attr', 'href')
    .and('contain', 'you/crew');
  cy.get('[data-cy=under-crew]')
    .should('contain', 'Invite 3 or more friends to join,')
    .and('contain', 'and watch how quickly The Good Party').click();
  cy.checkYouShareModal(user);
  cy.get('[data-cy=invite-link-label]').should(
    'contain',
    'Your Unique Invite Link',
  );
  cy.get('[data-cy=invite-url]').should('contain', url);
});

Cypress.Commands.add('checkSignOutInYou', () => {
  cy.get('[data-cy=signout-link')
    .should('contain', 'Sign Out')
    .click();
  cy.url().should('not.contain', '/you');
  cy.getCookie('user').should('not.exist');
  cy.getCookie('token').should('not.exist');
});

Cypress.Commands.add('checkProfileEditPage', () => {
  cy.get('[data-cy=edit-profile-link]').click();
});

Cypress.Commands.add('checkGuestRegisterSectionInYou', () => {
  cy.get('[data-cy=sign-up]')
    .should('contain', 'Sign-Up')
    .should('have.attr', 'href')
    .and('contain', '?register=true');
  cy.get('[data-cy=log-in]')
    .should('contain', 'Login')
    .should('have.attr', 'href')
    .and('contain', 'login');
  cy.get('[data-cy=title]').should(
    'contain',
    'Create a profile and get counted!',
  );
  cy.get('[data-cy=description]').should(
    'contain',
    'First we count the people needed for a good indy candidate to win,',
  );
  cy.get('[data-cy=count-in]')
    .should('contain', 'COUNT ME IN!')
    .should('have.attr', 'href')
    .and('contain', '?register=true');
});
Cypress.Commands.add('checkInitialInfoEditSection', async () => {
  cy.get('[data-cy=new-name]').type('blueshark0811');
  cy.get('[data-cy=new-feedback]').type('The Good Party');
  cy.get('[data-cy=profile-form]')
    .find('button')
    .click();
  const user = await promisify(
    cy.getCookie('user').then(cookie => parseCookie(cookie.value)),
  );
  cy.wrap(user.name).should('contain', 'blueshark0811');
  cy.wrap(user.feedback).should('contain', 'The Good Party');
});

Cypress.Commands.add('checkCongressionalDistrictEditSection', () => {
  cy.chooseCorrectZipcode('95001');
  cy.visit('/you/edit');

  cy.getCookie('user').then(cookie => {
    const user = parseCookie(cookie.value);
    const { zipCode, congDistrict } = user;
    const { stateLong, cds, primaryCity } = zipCode || {};
    const districtName = getUserDistrictName(congDistrict, cds);
    cy.get('[data-cy=congress-district-title]').should(
      'contain',
      'Congressional District',
    );
    cy.get('[data-cy=address1]')
      .should('contain', primaryCity)
      .and('contain', districtName && `, ${districtName}`);
    cy.get('[data-cy=address2]').should(
      'contain',
      `${stateLong} ${zipCode ? zipCode.zip : ''}`,
    );

    cy.get('[data-cy=edit-district]')
      .should('contain', 'Edit')
      .click();
  });

  cy.get('[data-cy=alert-dialog-title]').should(
    'contain',
    'District Change',
  );
  cy.get('[data-cy=alert-dialog-description]').should(
    'contain',
    'If you proceed, your previous district',
  );
  cy.get('[data-cy=alert-dialog-cancel]').should('contain', 'Cancel');
  cy.get('[data-cy=alert-dialog-proceed]').should('contain', 'Proceed');
});

Cypress.Commands.add('checkPrivateInfoEditSection', user => {
  const initialPhone = user.phone ? formatToPhone(user.phone) : false;
  if (!initialPhone) {
    cy.get('[data-cy=phone-label]').should('contain', 'Phone Number');
    cy.get('[data-cy=add-phone]')
      .should('contain', 'Add Phone')
      .click();
  }
  cy.get('[data-cy=new-phone]').should('exist');
  cy.get('[data-cy=new-email]').should('exist');
  cy.get('[data-cy=private-info-form]')
    .find('button')
    .should('contain', 'Save');
});

Cypress.Commands.add('checkCrewRow', ($el, crewMember, user, index) => {
  cy.wrap($el)
    .find('[data-cy=crew-rank]')
    .contains(index + 1);
  cy.wrap($el)
    .find('[data-cy=crew-member]')
    .and('contain', crewMember.crewCount || 1);
  cy.wrap($el)
    .find('[data-cy=crew-member-name]')
    .should('contain', crewMember.name);
  cy.wrap($el)
    .find('[data-cy=crew-location]')
    .should(
      'contain',
      crewMember.shortState ? crewMember.shortState.toUpperCase() : '',
    )
    .and(
      'contain',
      crewMember.districtNumber ? `-${crewMember.districtNumber}` : '',
    );
  if (crewMember.feedback) {
    cy.wrap($el)
      .find('[data-cy=crew-feedback]')
      .should('contain', crewMember.feedback);
  }
});

Cypress.Commands.add('checkYouShareModal', user => {
  const url = uuidUrl(user);
  const messageBody = `Check out The Good Party. See what’s possible, before you vote: ${url}`;
  cy.get('[data-cy=share-modal-title]').contains('Tell some friends...');
  cy.get('[data-cy=social-share]').should('exist');
  cy.get('[data-cy=sms-share-title]').contains('SMS / TEXT');

  cy.get('[data-cy=sms-share]')
    .should('have.attr', 'href')
    .and('contain', `sms:?&body=${messageBody.replace('&', '%26')}`);
  cy.get('[data-cy=clipboard-share-title]').contains('COPY LINK');
  cy.get('[data-cy=share-modal-close]').click();
});