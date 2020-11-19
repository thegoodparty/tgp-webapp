import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Cancel';
import Link from 'next/link';
import VotesNeeded from 'components/home/ChallengersSection/VotesNeeded';
import Image from 'next/image';

import { Body, Body13, H3, Body11 } from 'components/shared/typogrophy';
import CandidateAvatar from 'components/shared/CandidateAvatar';
import { getCandidateChamberDistrict } from 'helpers/candidatesHelper';
import { numberFormatter } from 'helpers/numberHelper';
import { BlueButton } from 'components/shared/buttons';
import SupportersProgressBar from '../SupportersProgressBar';

const Wrapper = styled.div`
  background-color: #fff;
  padding: 24px 0 32px;
  border-radius: 8px;
  position: relative;
  width: 85%;
  margin: 0 auto;
  max-width: 500px;
  min-width: 300px;
  padding-top: 24px;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 24px 24px 32px;
    width: 85vw;
  }
`;

const Close = styled.div`
  position: absolute;
  padding: 4px 0 4px 4px;
  top: 0;
  right: 0;
  color: ${({ theme }) => theme.colors.gray4};
  cursor: pointer;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 16px;
  }
`;

const CenterBar = styled(Body)`
  margin-bottom: 32px;
  width: 100%;
`;

const TitleH3 = styled(H3)`
  text-align: center;
`;

const AvatarWrapper = styled(Body)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Spread = styled(Body13)`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.colors.gray7};
`;

const StyledBody = styled(Body)`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.colors.gray7};

  span.big {
    font-size: 16px;
    font-weight: bold;

    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 28px;
    }
  }
`;

const VotesNeededWrapper = styled(Body11)`
  margin-top: 35px;
  text-align: center;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gray7};
`;

const Footer = styled(Body13)`
  color: ${({ theme }) => theme.colors.gray6};
  margin-top: 24px;
  text-align: center;
`;

const AddVoteModal = ({
  candidate,
  userState,
  closeCallback,
  goToShareCallback,
}) => {
  if (!candidate) {
    return <> </>;
  }
  const {
    name,
    rankingCount,
    likelyVoters,
    chamber,
    district,
    state,
  } = candidate;
  let { isGood } = candidate;
  if (candidate.unknown) {
    isGood = null;
  }
  const chamberCount = likelyVoters + rankingCount;
  const stateUpper = state ? state.toUpperCase() : '';
  const suffixText =
    chamber === 'presidential'
      ? ' (270 ELECTORS)'
      : ` IN ${stateUpper}${district ? `-${district}` : ''}`;

  return (
    <Dialog onClose={closeCallback} aria-labelledby="Ranking not Allowed" open>
      <Wrapper>
        <Close onClick={closeCallback}>
          <CloseIcon />
        </Close>
        <AvatarWrapper>
          <CandidateAvatar
            good={isGood}
            size="responsive"
            src={candidate.image}
            name={candidate.name}
          />
          <Spread>Tell others about this campaign!</Spread>
          <TitleH3>
            {name}
            <br />
            for {getCandidateChamberDistrict(candidate)}
          </TitleH3>
        </AvatarWrapper>
        <StyledBody className="mb-20">
          <span className="big">{numberFormatter(chamberCount)}</span>&nbsp;
          people and growing!
        </StyledBody>
        <VotesNeededWrapper>
          <VotesNeeded candidate={candidate} />
        </VotesNeededWrapper>
        <CenterBar>
          <SupportersProgressBar
            votesNeeded={candidate.votesNeeded}
            peopleSoFar={chamberCount}
            showSupporters={false}
            showSuffix={false}
            userState={userState}
            suffixText={suffixText}
          />
        </CenterBar>

        <BlueButton fullWidth onClick={goToShareCallback}>
          <H3 style={{ color: '#FFF' }}>SHARE THIS...</H3>
        </BlueButton>
        <Footer>
          Don&apos;t worry, we will{' '}
          <Link href="?article=prGq4SAFpfT7qzBFM1HDy">never waste your vote</Link>
          <br />
          <Image
            src="images/logo-caps.svg'"
            alt="logo"
            style={{ marginTop: '16px' }}
          />
        </Footer>
      </Wrapper>
    </Dialog>
  );
};

AddVoteModal.propTypes = {
  closeCallback: PropTypes.func,
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  votesNeeded: PropTypes.number,
  userState: PropTypes.string,
  goToShareCallback: PropTypes.func,
};

export default AddVoteModal;
