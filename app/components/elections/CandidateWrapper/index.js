import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import PageWrapper from 'components/shared/PageWrapper';
import LoadingAnimation from 'components/shared/LoadingAnimation';


import TopRow from './TopRow';
import MoneyAndCharacter from './MoneyAndCharacter';
import FollowTheMoney from './FollowTheMoney';
import FincanicalText from './FincanicalText';
import PolicyPositions from './PolicyPositions';
import CampaignWebsite from './CampaignWebsite';
import CandidateProfile from './CandidateProfile';

const CandidateWrapper = ({
  candidate,
  chamberRank,
  chamberName,
  incumbent,
  user,
  deleteCandidateRankingCallback,
}) => {
  let isGood;
  if (candidate) {
    ({ isGood } = candidate);
  }

  const mobileHeaderProps = {
    showGood: true,
    isGood,
    showShare: true,
    user,
  };

  return (
    <PageWrapper mobileHeaderProps={mobileHeaderProps}>
      {candidate?.name ? (
        <>
          <TopRow
            candidate={candidate}
            chamberRank={chamberRank}
            chamberName={chamberName}
            user={user}
            deleteCandidateRankingCallback={deleteCandidateRankingCallback}
          />
          <MoneyAndCharacter candidate={candidate} incumbent={incumbent} />
          <FollowTheMoney candidate={candidate} incumbent={incumbent} />
          <FincanicalText
            candidate={candidate}
            incumbent={incumbent}
            chamberName={chamberName}
          />
          <CandidateProfile candidate={candidate} />
          <PolicyPositions candidate={candidate} />
          <CampaignWebsite candidate={candidate} />
        </>
      ) : (
        <LoadingAnimation />
      )}
    </PageWrapper>
  );
};

CandidateWrapper.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  chamberRank: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  chamberName: PropTypes.string,
  incumbent: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  deleteCandidateRankingCallback: PropTypes.func,
};

export default CandidateWrapper;
