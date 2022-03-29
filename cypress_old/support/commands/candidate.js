import {
  partyResolver,
  candidateBlocName,
  candidateCalculatedFields,
  shortToLongState,
  rankPageLink,
  rankPageJoinLink,
  rankPageGrowLink
} from '../../../old-app/helpers/electionsHelper';
import { percHelper } from '../../../old-app/helpers/numberHelper';
import {
  getVotesNeededState,
  convertURI,
  getComparedIncumbent,
  getFakeIncumbentOrIncumbentLabel,
  getCombinedReportDate,
  getOpenSecretLink,
} from '../../../old-app/helpers/candidatesHelper';

import moneyHelper from '../../../old-app/helpers/moneyHelper';


Cypress.Commands.add(
  'testCandidateTopRow',
  (candidate, candidateData, incumbent) => {
    const calculatedCandidateData = candidateCalculatedFields(candidateData);
    const {
      name,
      party,
      totalRaised,
      smallDonorPerc,
      largeDonorPerc,
      smallDonorPerHour,
      largeDonorPerHour,
      isIncumbent,
      outsideReportDate,
      reportDate,
      isAligned,
      state,
      district,
      isBigMoney,
      rankingCount,
      isGood,
      facebook,
      twitter,
      website,
      source,
      info,
      campaignWebsite,
      votesNeeded,
    } = calculatedCandidateData;
    const { chamber } = candidate;
    const votesNeededState =
      getVotesNeededState(chamber, district, state) || '';
    const campWebsite = convertURI(campaignWebsite) || '';

    const ballotpediaLink = source || 'https://ballotpedia.org/';
    const candidateInfo = convertURI(info);
    const isUnkown = isGood === null;
    const isGoodOrUnkwown = isGood || isUnkown;
    const bigMoneyFunds = candidate ? totalRaised * largeDonorPerc : 0;
    const smallMoneyFunds = totalRaised - bigMoneyFunds;
    const perc = isGoodOrUnkwown
      ? percHelper(smallDonorPerc, true)
      : percHelper(largeDonorPerc, true);
    const perHour = isGoodOrUnkwown
      ? moneyHelper(smallDonorPerHour)
      : moneyHelper(largeDonorPerHour);
    const nameArr = name ? name.split(' ') : [];
    const lastName = name ? nameArr[nameArr.length - 1] : '';
    const blocName = candidateBlocName(candidateData, chamber);
    const socialAccounts = [
      { name: 'website', url: website },
      { name: 'facebook', url: facebook },
      { name: 'twitter', url: twitter },
    ].filter(social => social.url && social.url !== '');
    const comparedIncumbent = getComparedIncumbent(totalRaised, incumbent);
    const { isFakeIncumbent, bigFundsPerc, relativePerc } = comparedIncumbent;
    const combinedReportDate = getCombinedReportDate(
      { reportDate, outsideReportDate },
      incumbent,
    );
    const isSameAsComparedIncumbent = comparedIncumbent.name === candidate.name;
    const fakeIncumbentOrIncumbentLabel = getFakeIncumbentOrIncumbentLabel(
      isFakeIncumbent,
    );
    const openSecretLink = getOpenSecretLink(chamber, calculatedCandidateData);
    cy.get('[data-cy=top-row]').as('top-row');


    cy.get('@top-row')
      .find('[data-cy=top-name]')
      .contains(name);
    cy.get('@top-row')
      .find('[data-cy=top-position]')
      .should('contain', partyResolver(party))
      .and('contain', isIncumbent ? 'INCUMBENT' : 'CANDIDATE');
    const rankLink = rankPageLink(chamber, state, district);
    if (chamber === 'presidential') {
      cy.get('@top-row')
        .find('[data-cy=chamber-link]')
        .contains('U.S. President')
        .should('have.attr', 'href')
        .and('include', rankLink);
    } else if (chamber === 'senate') {
      if (state) {
        cy.get('@top-row')
          .find('[data-cy=chamber-link]')
          .contains(`U.S. Senate for ${shortToLongState[state.toUpperCase()]}`)
          .should('have.attr', 'href')
          .and('include', rankLink);
      }
    } else if (chamber === 'house') {
      if (state && district) {
        cy.get('@top-row')
          .find('[data-cy=chamber-link]')
          .contains(
            `U.S. House for District ${state.toUpperCase()}-${district}`,
          )
          .should('have.attr', 'href')
          .and('include', rankLink);
      }
    }
    if (socialAccounts.length > 0) {
      cy.get('@top-row')
        .get('[data-cy=social-link]')
        .should('have.length', socialAccounts.length)
        .each(($el, index) => {
          cy.wrap($el)
            .should('contain', socialAccounts[index].name)
            .and('have.attr', 'href')
            .and('include', socialAccounts[index].url);
        });
    }
    if (isGoodOrUnkwown) {
      cy.testSupportersProgressBar(
        'top-row',
        votesNeeded,
        rankingCount,
        votesNeededState,
        true,
        '',
        blocName,
      );
      cy.get('@top-row')
        .get('[data-cy=rank-button]')
        .should('contain', `JOIN ${blocName}`)
        .and('have.attr', 'href')
        .and('include', rankPageJoinLink(null, calculatedCandidateData, chamber, state, district));
    }
    cy.get('@top-row')
      .get('[data-cy=why]')
      .should('contain', `Why ${lastName} is`)
      .find('[data-cy=colored-good]')
      .contains(
        isGood
          ? 'Potentially Good'
          : isUnkown
            ? 'Not Yet Rated'
            : 'Not Good Enough',
      );

    // Reason
    if (!isGoodOrUnkwown) {
      if (isBigMoney) {
        cy.get('@top-row')
          .get('[data-cy=is-big-money]')
          .should('contain', 'Follow the Money:')
          .and('contain', 'Candidate has raised most of funding')
          .and('contain', '50%')
          .and('contain', 'from Big Money sources.');
      } else {
        cy.get('@top-row')
          .get('[data-cy=is-big-money]')
          .should('contain', 'Follow the Money:')
          .and(
            'contain',
            'Candidate has raised most of funding (&gt;50%) from Small Indiv. Donors',
          )
          .and('contain', '$200')
          .and(
            'contain',
            'This is good, but not enough because of failing the character check.',
          );
      }
      if (isAligned === 'yes') {
        cy.get('@top-row')
          .get('[data-cy=character-check]')
          .should('contain', 'Character Check:')
          .and('contain', 'Candidate passes')
          .find('[data-cy=link]')
          .should('contain', 'our minimum standard of civility')
          .and('have.attr', 'href')
          .and('include', '?article=66i4vRRLkX1yf8MnCQvYSb');
      } else if (isAligned === 'no') {
        cy.get('@top-row')
          .get('[data-cy=character-check]')
          .should('contain', 'Character Check:')
          .should('contain', 'Candidate fails to meet')
          .and(
            'contain',
            '. Candidate has engaged in a pattern of activities or',
          )
          .and(
            'contain',
            'encouraging intolerance, discrimination or hostility towards a constitutionally or state-protected group or class.',
          )
          .find('[data-cy=link1]')
          .should('contain', 'our minimum standard of civility')
          .and('have.attr', 'href')
          .and('include', '?article=66i4vRRLkX1yf8MnCQvYSb');
        cy.get('@top-row')
          .get('[data-cy=character-check]')
          .find('[data-cy=link2]')
          .should('contain', 'hate-speech')
          .and('have.attr', 'href')
          .and('include', '?article=5bwvf0PwsbpFEe8IJ9sHhX');
      } else {
        cy.get('@top-row')
          .get('[data-cy=character-check]')
          .should('contain', 'Character Check:')
          .and(
            'contain',
            'Candidate has not yet been vetted. Do you have factual info about this candidate we should consider?',
          )
          .find('[data-cy=link]')
          .should('contain', 'Please let us know')
          .and('have.attr', 'href')
          .and(
            'include',
            'mailto:info@goodparty.org?subject=Character%20Check:%20Candidate%20Page&body=',
          );
      }
    }
    if (isGood) {
      if (isBigMoney || isIncumbent || perc > 50) {
        cy.get('@top-row')
          .get('[data-cy=is-big-money]')
          .should('contain', 'Follow the Money:')
          .and('contain', 'Candidate has raised most of funding')
          .and('contain', '50%')
          .and('contain', '$200');
      } else {
        cy.get('@top-row')
          .get('[data-cy=is-big-money]')
          .should('contain', 'Follow the Money:')
          .and(
            'contain',
            'Candidate has raised less than 50% of the total funding of the incumbent in this race.',
          );
      }
      if (isAligned === 'yes') {
        cy.get('@top-row')
          .get('[data-cy=character-check]')
          .should('contain', 'Character Check:')
          .and('contain', 'Candidate passes')
          .find('[data-cy=link]')
          .should('contain', 'minimum standard of civility')
          .and('have.attr', 'href')
          .and('include', '?article=66i4vRRLkX1yf8MnCQvYSb');
      } else {
        cy.get('@top-row')
          .get('[data-cy=character-check]')
          .should('contain', 'Candidate Policy Positions:')
          .and('contain', 'Candidate positions are not aligned with')
          .find('[data-cy=link]')
          .should('contain', 'The Good Party Platform.')
          .and('have.attr', 'href')
          .and('include', '?article=2Pv9KNb6rng0sMfqwu1xKm');
      }
    }
    if (isUnkown) {
      if (relativePerc < 50) {
        cy.get('@top-row')
          .get('[data-cy=is-big-money]')
          .should(
            'contain',
            'Candidate has raised less than 50% of the total funding of the incumbent in this race.',
          );
      } else {
        cy.get('@top-row')
          .get('[data-cy=is-big-money]')
          .should('contain', 'Follow the Money:')
          .and('contain', 'Candidate has raised most of funding')
          .and('contain', '50%')
          .and('contain', '$200')
          .and('contain', 'from Small Indiv. Donors');
      }
      cy.get('@top-row')
        .get('[data-cy=character-check]')
        .and(
          'contain',
          'Candidate has not yet been vetted. Do you have factual info about this candidate we should consider?',
        )
        .find('[data-cy=link]')
        .should('contain', 'Please let us know')
        .and('have.attr', 'href')
        .and(
          'include',
          'mailto:info@goodparty.org?subject=Character%20Check:%20Candidate%20Page&body=',
        );
    }

    // Follow Wrapper
    cy.get('@top-row')
      .get('[data-cy=follow-wrapper]')
      .should('contain', 'Follow the Money')
      .and('contain', `(FEC DATA as of ${combinedReportDate})`);

    // Funds Wrapper
    cy.get('@top-row')
      .get('[data-cy=total-fund]')
      .should('contain', moneyHelper(totalRaised))
      .and('contain', 'TOTAL FUNDS RAISED');

    if (isGoodOrUnkwown) {
      if (isIncumbent || isBigMoney || perc > 50) {
        cy.get('@top-row')
          .get('[data-cy=fund]')
          .should('contain', `${perc}%`)
          .and('contain', 'FROM SMALL INDIV DONORS')
          .and('contain', '$200');
      } else {
        cy.get('@top-row')
          .get('[data-cy=fund]')
          .should('contain', `${relativePerc}%`)
          .and('contain', 'FUNDING RELATIVE TO')
          .and(
            'contain',
            isFakeIncumbent ? 'BIG MONEY CANDIDATE' : 'INCUMBENT',
          );
      }
      if (isIncumbent || isSameAsComparedIncumbent) {
        cy.get('@top-row')
          .get('[data-cy=fund-disadvantage]')
          .should('contain', 'N/A')
          .and('contain', 'FUNDING DISADVANTAGE');
      } else {
        cy.get('@top-row')
          .get('[data-cy=fund-disadvantage]')
          .should('contain', `${comparedIncumbent.xTimes}x`)
          .and('contain', 'FUNDING DISADVANTAGE');
      }
    } else {
      cy.get('@top-row')
        .get('[data-cy=fund]')
        .should('contain', `${perc}%`)
        .and('contain', 'FROM BIG MONEY SOURCES');
      cy.get('@top-row')
        .get('[data-cy=fund-disadvantage]')
        .should('contain', `${perHour}/hr`)
        .and('contain', 'FUNDING RATE')
        .and('contain', 'BIG MONEY');
    }
    cy.get('@top-row')
      .get('[data-cy=fec]')
      .should(
        'contain',
        `According to Federal Election Commission (FEC) filings for the this election cycle, as of ${combinedReportDate}`,
      );
    if (!isGoodOrUnkwown) {
      cy.get('@top-row')
        .get('[data-cy=fec]')
        .should(
          'contain',
          `${name} has raised ${moneyHelper(totalRaised)} in Total Funds ,`,
        )
        .and('contain', `${moneyHelper(bigMoneyFunds)}`)
        .and(
          'contain',
          `(${perc}%) of the their funds coming from Big Money Sources`,
        )
        .and(
          'contain',
          `like Political Action Committees (PACs), Corporate Lobbyists`,
        )
        .and('contain', `Big Money backers are bankrolling ${lastName}`)
        .and('contain', `${isIncumbent ? 're-' : ''}election at a rate of`)
        .and('contain', `${perHour}/hr`)
        .and(
          'contain',
          `their investments, which means, if ${isIncumbent ? 're-' : ''}`,
        )
        .and(
          'contain',
          `elected, ${name} will have to work very hard to deliver a good`,
        )
        .and(
          'contain',
          `every hour ${isIncumbent ? lastName : 'the incumbent'} has been`,
        );
    } else {
      if (isBigMoney || isIncumbent || isSameAsComparedIncumbent) {
        cy.get('@top-row')
          .get('[data-cy=fec]')
          .should(
            'contain',
            `${name} has raised ${moneyHelper(totalRaised)} with`,
          )
          .and('contain', `${moneyHelper(smallMoneyFunds)}`)
          .and(
            'contain',
            `This means that ${lastName} is mostly being supported by`,
          )
          .and(
            'contain',
            `each giving a little, to help ${name} compete with the Big`,
          )
          .and('contain', `${perc}%`);
        if (!isIncumbent && !isSameAsComparedIncumbent) {
          cy.get('@top-row')
            .get('[data-cy=fec]')
            .should(
              'contain',
              `In contrast to ${name}, the incumbent in this race,`,
            )
            .and('contain', `${comparedIncumbent.name}, has raised`)
            .and('contain', `${moneyHelper(comparedIncumbent.raised)}, or`)
            .and(
              'contain',
              `${comparedIncumbent.xTimes}x times more money, with`,
            )
            .and('contain', `${moneyHelper(comparedIncumbent.bigMoneyFunds)}`)
            .and('contain', `(${percHelper(bigFundsPerc, true)}% )`)
            .and('contain', `${comparedIncumbent.name}, has raised`);
        }
      } else {
        cy.get('@top-row')
          .get('[data-cy=fec]')
          .should(
            'contain',
            `${name} has raised just ${moneyHelper(totalRaised)} in Total`,
          )
          .and('contain', `${relativePerc}%`)
          .and(
            'contain',
            `of the funding of the ${fakeIncumbentOrIncumbentLabel} in`,
          );
      }

      if (!isIncumbent && !isBigMoney && !isSameAsComparedIncumbent) {
        cy.get('@top-row')
          .get('[data-cy=fec]')
          .should('contain', `The ${fakeIncumbentOrIncumbentLabel}`)
          .and('contain', `${comparedIncumbent.name}, has raised`)
          .and('contain', `${moneyHelper(comparedIncumbent.raised)}, or`)
          .and(
            'contain',
            `${comparedIncumbent.xTimes}x times more money, with`,
          )
          .and('contain', `${moneyHelper(comparedIncumbent.bigMoneyFunds)}`)
          .and('contain', `(${percHelper(bigFundsPerc, true)}% )`)
          .and(
            'contain',
            `${isFakeIncumbent ? 'Big Money Candidate' : 'Incumbent'}`,
          )
          .and(
            'contain',
            `candidates like ${name} must overcome against a major party`,
          );
      }
    }

    cy.get('@top-row')
      .get('[data-cy=secret-link]')
      .should('contain', 'FEC DATA COURTESY OF OPENSECRETS.ORG')
      .should('have.attr', 'href')
      .and('include', openSecretLink);
    cy.get('@top-row')
      .get('[data-cy=error-link]')
      .should('contain', 'Report an error')
      .should('have.attr', 'href')
      .and(
        'include',
        `mailto:info@goodparty.org?subject=Data%20Error:%20Candidate%20Page&body`,
      );

    cy.get('@top-row')
      .get('[data-cy=info-wrapper]')
      .should('contain', 'Other Candidate Info:');
    if (candidateInfo && candidateInfo !== 'null') {
      cy.get('@top-row')
        .get('[data-cy=info-wrapper]')
        .should(
          'contain',
          `The following policy positions for ${name} were compiled by`,
        );
      cy.get('@top-row')
        .get('[data-cy=ballot-link-1]')
        .should('contain', 'Ballotpedia')
        .should('have.attr', 'href')
        .and('include', ballotpediaLink);
      cy.get('@top-row')
        .get('[data-cy=ballot-link-2]')
        .should('contain', 'CANDIDATE DATA COURTESY OF BALLOTPEDIA')
        .should('have.attr', 'href')
        .and('include', ballotpediaLink);
    } else {
      cy.get('@top-row')
        .get('[data-cy=ballot-link]')
        .should('contain', 'Ballotpedia')
        .should('have.attr', 'href')
        .and('include', ballotpediaLink);
    }

    if (campWebsite && campWebsite !== 'null') {
      cy.get('@top-row')
        .get('[data-cy=campaign-website]')
        .should('contain', 'Candidate Policy Positions');
      cy.get('@top-row')
        .get('[data-cy=volunteer-article]')
        .should('contain', 'COMPILED BY THE GOOD PARTY VOLUNTEERS')
        .should('have.attr', 'href')
        .and('include', '?article=579kihjyIPloNaEw02rniq');
    }
    if(isGoodOrUnkwown) {
      cy.get('@top-row')
      .find('[data-cy=grow-share]')
      .contains('Share')
      .should('have.attr', 'href')
      .and('contains', rankPageGrowLink(calculatedCandidateData, chamber, state, district));
    }
  },
);
