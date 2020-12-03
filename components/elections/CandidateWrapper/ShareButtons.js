import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Body13 } from 'components/shared/typogrophy';
import { candidateRanking } from 'helpers/electionsHelper';
import { BlueButton, OutlinedButton } from 'components/shared/buttons';

const ShareIconWhite = '/images/icons/share-icon-white.svg';
const ShareIcon = '/images/icons/share-icon.svg';

const InnerButton = styled.div`
  position: relative;
  width: 100%;
`;

const Img = styled.img`
  position: absolute;
  top: 0;
  left: 24px;
  width: 16px;
  height: auto;

  &.heart {
    top: 4px;
    width: 24px;
  }
`;

const Ended = styled(Body13)`
  margin-top: 36px;
  color: ${({ theme }) => theme.colors.orange};
  font-weight: 600;
  text-align: center;
`;

const ShareButtons = ({ candidate, chamberRank, openShareCallback }) => {
  const rank = candidateRanking(chamberRank, candidate);

  return (
    <>
      <div className="share-button">
        {rank ? (
          <BlueButton fullWidth onClick={openShareCallback}>
            <InnerButton>
              <Img src={ShareIconWhite} alt="share" />
              SHARE
            </InnerButton>
          </BlueButton>
        ) : (
          <OutlinedButton active fullWidth onClick={openShareCallback}>
            <InnerButton>
              <Img src={ShareIcon} alt="share" />
              SHARE
            </InnerButton>
          </OutlinedButton>
        )}
      </div>
      <Ended className="ended">Crowd-Voting Campaign has Ended</Ended>
    </>
  );
};

ShareButtons.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  chamberRank: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  openShareCallback: PropTypes.func,
};

export default ShareButtons;
