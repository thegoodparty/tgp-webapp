import promisify from 'cypress-promise';
import articlesHelper from '../../../old-app/helpers/articlesHelper';
import {
  blocNameSuffix,
  candidateBlocLink,
  candidateBlocName,
  electionRoute,
} from '../../../old-app/helpers/electionsHelper';
import { getCandidateTitle } from '../../../old-app/helpers/candidatesHelper';
import { uuidUrl } from '../../../old-app/helpers/userHelper';

Cypress.Commands.add('checkCommonFooter', (user = {}) => {
  cy.get('[data-cy=footer-logo]')
    .should('have.attr', 'alt')
    .and('contain', 'The Good Party Logo');

  cy.get('[data-cy=footer-link-about]')
    .contains('About')
    .should('have.attr', 'href')
    .and('contain', '/party');

  cy.get('[data-cy=footer-link-you]')
    .contains('You')
    .should('have.attr', 'href')
    .and('contain', '/you');

  cy.get('[data-cy=footer-link-elections]')
    .contains('Elections')
    .should('have.attr', 'href')
    .and('contain', electionRoute(user));

  cy.get('[data-cy=footer-link-creators]')
    .contains('Creators')
    .should('have.attr', 'href')
    .and('contain', '/creators');

  cy.get('[data-cy=footer-community-title]').contains('Community');

  cy.get('[data-cy=footer-link-nominate]')
    .contains('Nominate a Candidate')
    .should('have.attr', 'href')
    .and('contain', 'https://forms.gle/kydnhUp6xqF6RUpb9');

  cy.get('[data-cy=footer-link-share]')
    .should('contain', 'Share with Friends')
    .click();
  cy.checkYouShareModal(user);

  cy.get('[data-cy=footer-link-email]')
    .contains('Send Us An Email')
    .should('have.attr', 'href')
    .and('contain', 'mailto:ask@goodparty.org');

  cy.get('[data-cy=footer-team-title]').contains('Team');
  cy.get('[data-cy=footer-team]').contains(
    'Want to join the volunteer team? We are always looking for',
  );

  cy.get('[data-cy=footer-link-join]')
    .should('contain', 'APPLY TO JOIN')
    .should('have.attr', 'href')
    .and(
      'contain',
      "mailto:ask@goodparty.org?subject=I'm interested!&body=[Include Bio and area of interest]",
    );

  cy.get('[data-cy=footer-link-policy]')
    .contains('Privacy Policy')
    .should('have.attr', 'href')
    .and('contain', '/privacy');

  cy.get('[data-cy=footer-link-directory]')
    .contains('Directory')
    .should('have.attr', 'href')
    .and('contain', '/directory');

  cy.get('[data-cy=footer-link-facebook]')
    .should('have.attr', 'href')
    .and('contain', 'https://www.facebook.com/thegoodpartyorg');

  cy.get('[data-cy=footer-link-twitter]')
    .should('have.attr', 'href')
    .and('contain', 'https://twitter.com/thegoodpartyorg');

  cy.get('[data-cy=footer-link-youtube]')
    .should('have.attr', 'href')
    .and('contain', 'https://www.youtube.com/channel/UCPNp46yxggs8NPeXFuMTpGQ');

  cy.get('[data-cy=footer-description]')
    .should('contain', 'PAID FOR BY THE GOOD PARTY | GOODPARTY.ORG')
    .and('contain', 'NOT AUTHORIZED BY ANY CANDIDATE OR CANDIDATE COMMITTEE.');
});

Cypress.Commands.add(
  'checkGrowShareModal',
  (candidate, chamber, isExternalLink = false, user = {}) => {
    let { isGood } = candidate;
    if (candidate.unknown) {
      isGood = null;
    }
    const blocName = candidateBlocName(candidate);
    const blocLink = candidateBlocLink(candidate, chamber);
    let url = uuidUrl(user);
    let queryOperator = '&';
    if (url === 'https://thegoodparty.org') {
      queryOperator = '?';
    }
    url = `${url + queryOperator}b=${blocLink}`;

    const chamberTitle = getCandidateTitle(chamber);
    const messageBody = `Check out ${blocName} for ${chamberTitle} in The Good Party. See what’s possible, before we vote: ${url}`;

    if (isExternalLink) {
      cy.get('[data-cy=share-modal-subtitle]')
        .contains('Congrats!')
        .contains('You’ve joined');
    } else {
      cy.get('[data-cy=share-modal-subtitle]').contains('Please help grow');
    }
    cy.get('[data-cy=share-modal-title]').should(
      'contain',
      `${blocName} ${blocNameSuffix(blocName)}`,
    );
    cy.get('[data-cy=share-modal-description]').should(
      'contain',
      'Tell some friends...',
    );
    cy.get('[data-cy=social-share]').should('exist');

    cy.get('[data-cy=sms-share-title]').should('contain', 'SMS / TEXT');
    cy.get('[data-cy=clipboard-share-title]').should('contain', 'COPY LINK');

    cy.get('[data-cy=sms-share]')
      .should('have.attr', 'href')
      .and('contain', `sms:?&body=${messageBody.replace('&', '%26')}`);
    // cy.get('[data-cy=share-modal-close]').click();
  },
);
Cypress.Commands.add('testAmaContainer', () => {
  cy.get('[data-cy=ama]')
    .contains('Ask a Question')
    .contains('Give a Suggestion')
    .click();
  cy.get('[data-cy=ama-dialog-submit]').contains('Send');
  cy.get('[data-cy=ama-dialog-close]').click();
  cy.get('[data-cy=ama-dialog-submit]').should('not.exist');
});

Cypress.Commands.add('testTopQueSection', async filter => {
  cy.get('[data-cy=faqs]').contains('Top Questions');
  const content = await promisify(
    cy.getCMSContent().then(response => response.body),
  );

  const partyFAQs = articlesHelper(content.faqArticles, filter);
  cy.get('[data-cy=faq]')
    .should('have.length', partyFAQs.length)
    .each(($el, index) => {
      cy.testFAQ($el, index, partyFAQs[index]);
    });
  cy.get('[data-cy=faqs-link]')
    .contains('See FAQ')
    .click();
  cy.url().should('include', '/faqs');
  cy.get('[data-cy=page-title]').contains('FAQs | The Good Party');
});

Cypress.Commands.add('signInWithDefaultUser', () => {
  const cookie = Cypress.env('cookie');
  const token = Cypress.env('token');
  cy.setCookie('user', cookie);
  cy.setCookie('token', token);
  cy.reload();
});

Cypress.Commands.add('chooseCorrectZipcode', zipcode => {
  cy.visit('/intro/zip-finder');
  cy.get('[data-cy=zipcode]').type(zipcode);
  cy.get('[data-cy=submit]').click();
  cy.url().should('include', `/elections/district/${zipcode}`);
  cy.getCookie('zip').should('exist');
});
