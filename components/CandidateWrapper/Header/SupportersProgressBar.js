import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Body9, Body11 } from '/components/shared/typogrophy';
import { numberFormatter } from '/helpers/numberHelper';
import { achievementsHelper } from '/helpers/achievementsHelper';

const ProgressBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  &.left {
    align-items: flex-start;
  }
`;

const BarBg = styled.div`
  margin: 10px 0;
  position: relative;
  height: 22px;
  background-color: #f0f0f0;
  border-radius: 22px;
  width: 100%;
`;

const Bar = styled.div`
  position: absolute;
  height: 22px;
  border-radius: 22px;

  background-color: #000;
  left: 0;
  width: 3%;
  transition: width 0.5s;
`;

const BarBody9 = styled(Body9)`
  color: ${({ theme }) => theme.colors.gray7};
  align-self: flex-start;
`;

const AchievementWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  width: 100%;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray4};
  padding-left: 8px;
  margin-top: 12px;
`;

const Icon = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 8px;
`;

const Total = styled.div`
  position: absolute;
  width: 100%;
  height: 22px;
  text-align: right;
  font-size: 14px;
  font-weight: 700;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const SupportersProgressBar = ({
  peopleSoFar,
  votesNeeded,
  peopleThisPeriod,
  days,
  color = '#000',
  withAchievement = true,
}) => {
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
    progress = (peopleThisPeriod * 100) / neededThisWeek;
  }
  if (progress > 100) {
    progress = 100;
  }
  return (
    <ProgressBarWrapper data-cy="supporter-progress">
      <BarBg>
        <Bar style={{ width: `${progress}%`, backgroundColor: color }} />
        {neededPerWeek !== 0 && <Total>{numberFormatter(neededPerWeek)}</Total>}
      </BarBg>
      {withAchievement && (
        <AchievementWrapper>
          <Icon src="/images/icons/achievement.svg" alt="achievement" />
          <div>
            If we can get to{' '}
            <strong>
              {numberFormatter(neededPerWeek)} followers this week
            </strong>
            , we’ll be on track to win on election day!
          </div>
        </AchievementWrapper>
      )}
    </ProgressBarWrapper>
  );
};

SupportersProgressBar.propTypes = {
  peopleSoFar: PropTypes.number,
  votesNeeded: PropTypes.number,
  showSupporters: PropTypes.bool,
  alignLeft: PropTypes.bool,
  showSuffix: PropTypes.bool,
  userState: PropTypes.string,
  prefixText: PropTypes.string,
  suffixText: PropTypes.string,
  withAchievement: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

export default SupportersProgressBar;

const p = {
  application: {
    createdAt: 1643906587251,
    updatedAt: 1643906587251,
    id: 4,
    status: 'approved',
    user: 2733,
    pledge: {
      disAffiliate: true,
      notJoin: true,
      noPay: true,
      noNominee: true,
      peoplePowered: true,
      antiCorruption: true,
      honest: true,
      transparent: true,
      choices: true,
      isCompleted: true,
    },
    candidate: {
      firstName: 'Tania',
      lastName: 'Solé',
      pronouns: 'She/Her',
      ethnicity: '',
      race: '',
      zip: '94063',
      citizen: 'Yes',
      ranBefore: 'Yes',
      electedBefore: 'No',
      memberPolitical: 'Yes',
      party: 'Green Party',
      twitter: 'tsole11',
      facebook: 'tsole11',
      youtube: '',
      linkedin: 'in/taniasole',
      snap: '',
      tiktok: '',
      reddit: '',
      website: 'www.taniasole.com',
      offices: [
        { year: '2015', state: 'CA', office: 'Redwood City City Council' },
      ],
    },
    campaign: {
      'running for': 'CA State Assembly D21',
      electionDate: '2021-06-07',
      state: 'CA',
      district: '21',
      disclosure: 'No',
      campaignSummary:
        'I have called District 21 home for over 30 years.  I am an environmental entrepreneur. We need experience, perspective and leadership to make the changes our community needs.  www.taniasole.com',
      campaignVideo: 'https://www.youtube.com/watch?',
      photos: [
        { key: 'headshotPhoto', label: 'Candidate headshot', value: '' },
        { key: 'trailPhoto', label: 'Campaign trail photo', value: '' },
        {
          key: 'bannerPhoto',
          label: 'Campaign page banner (16:9 aspect)',
          value: '',
        },
      ],
      committeeName: 'Elect Tania Sole Assembly 2022',
      fecStatement: 'No',
      candidacyStatement: 'Yes',
      moneyRaisedAmount: '$10,000-$50,000',
      fromWhom: 'Yes',
      signatures: '40',
      likelySupport: '80000',
      votesToWin: '80000',
      twitter: 'tsole11',
      facebook: 'tsole11',
      youtube: 'channel/UC4D9OPgwwYUgwgOG8rkbTOQ',
      linkedin: 'in/taniasole',
      snap: '',
      tiktok: '',
      reddit: '',
      website: 'www.taniasole.com',
      headshotPhoto:
        'https://assets.goodparty.org/candidate-info/afde8da2-6b38-4c2c-b34a-88be445e5a93.jpg',
      trailPhoto:
        'https://assets.goodparty.org/candidate-info/abc238ea-9c8a-4644-b986-734b8e0f4100.jpg',
      bannerPhoto:
        'https://assets.goodparty.org/candidate-info/6160c9ee-fecf-4aab-8596-cac0f5e05583.png',
    },
    contacts: {
      candidateEmail: 'tania@taniasole.com',
      candidatePhone: '6502886708',
      contactName: 'Hannah Duchesne',
      contactRole: 'Campaign Manager',
      contactEmail: 'hannah@taniasole.com',
      contactPhone: '6502886708',
      contactAddress: '1548 Maple St., Redwood City, ',
    },
    endorsements: [
      {
        body: "Peace & Freedom Party - Tania Sole is running as a Green candidate in California’s 21st Assembly District, located in San Mateo County. Born in New York to a Guatemalan father & a mother who was a daughter of German Jewish refugees, Ms Sole's  main campaign issues are housing, water & healthcare.",
        link: 'https://peaceandfreedom.us/new',
      },
      {
        body: ' Laura Wells, Candidate for State Controller; Mohammad Arif, Candidate for Lieutenant Governor; Kevin Akin, California State Chair, Peace and Freedom Party and more....',
        link: 'https://taniasole.com/?page_id',
      },
    ],
    issues: {
      positions: [
        { id: '390sfldxwr', name: 'Affordable Housing' },
        { id: '94xudpj9q', name: '#M4A' },
        { id: 'wbfrx4nagy', name: '#GreenNewDeal' },
        { id: 'nxszrgi6fd', name: 'Public Option' },
        { id: 'p7u5ozcs0e', name: 'Affordable Healthcare' },
        { id: 'yq5ee1nb1k', name: '#SupportRenewables' },
      ],
    },
    feedback: 'Welcome Tania!',
  },
  reviewMode: true,
};
