import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Cancel';
import { Link } from 'react-router-dom';

import heartImg from 'images/heart.svg';
import { Body, H1, Body13, H3 } from 'components/shared/typogrophy';
import CandidateAvatar from 'components/shared/CandidateAvatar';
import { candidateBlocName } from 'helpers/electionsHelper';
import { numberFormatter } from 'helpers/numberHelper';
import SupportersProgressBar from '../SupportersProgressBar';
import ShareButton from '../../shared/ShareButton';
import { uuidUrl } from '../../../helpers/userHelper';
import { setCookie } from '../../../helpers/cookieHelper';
import { BlueButton } from '../../shared/buttons';

const Wrapper = styled.div`
  background-color: #fff;
  padding: 48px 18px 32px;
  border-radius: 8px;
  position: relative;
  width: 85vw;
  margin: 0 auto;
  max-width: 500px;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 48px 24px 32px;
  }
`;

const Close = styled.div`
  position: absolute;
  padding: 16px;
  top: 0;
  right: 0;
  color: ${({ theme }) => theme.colors.gray4};
  cursor: pointer;
`;

const CenterBar = styled(Body)`
  margin-bottom: 32px;
  width: 100%;
`;

const AvatarWrapper = styled(Body)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SupportersRow = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  position: relative;
  width: 100%;
  min-height: 40px;
`;

const SupportersCount = styled(H1)`
  color: ${({ theme }) => theme.colors.gray7};
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  top: -5px;
  animation-fill-mode: forwards;

  @keyframes animate-in {
    0% {
      opacity: 0;
      top: -25px;
    }
    100% {
      opacity: 1;
      top: -5px;
    }
  }

  @keyframes animate-out {
    0% {
      opacity: 1;
      top: -5px;
    }
    100% {
      opacity: 0;
      top: 15px;
    }
  }
`;

const HeartImg = styled.img`
  height: auto;
  width: 36px;
  margin-right: 8px;
`;

const SuppoetersBody13 = styled(Body13)`
  color: ${({ theme }) => theme.colors.gray6};
  margin-top: 5px;
`;

const Footer = styled(Body13)`
  color: ${({ theme }) => theme.colors.gray6};
  margin-top: 24px;
  text-align: center;
`;

const ChoiceModal = ({
  candidate,
  open,
  votesNeeded,
  user,
  chamberCount,
  animateCount,
  userState,
  suffixText,
  closeCallback,
  shareCallback,
  chamber,
}) => {
  if (!candidate) {
    return <> </>;
  }

  let { isGood } = candidate;
  if (candidate.unknown) {
    isGood = null;
  }

  const url = uuidUrl(user);

  const countWithUser = user ? chamberCount : chamberCount - 1;

  return (
    <Dialog
      onClose={closeCallback}
      aria-labelledby="Ranking not Allowed"
      open={open}
    >
      <Wrapper>
        <Close onClick={closeCallback}>
          <CloseIcon />
        </Close>

        <AvatarWrapper>
          <CandidateAvatar
            good={isGood}
            size="xl"
            src={candidate.image}
            name={candidate.name}
          />
          <H1 style={{ marginTop: '18px', marginBottom: '36px' }}>
            {candidateBlocName(candidate, chamber)} Joined!{' '}
            <span role="img" aria-label="flex">
              💪
            </span>
          </H1>

          <SupportersRow>
            {animateCount ? (
              <>
                <SupportersCount
                  style={{
                    animation: `animate-out 1s ease-in-out forwards`,
                  }}
                >
                  <HeartImg src={heartImg} alt="tgp" />
                  {numberFormatter(countWithUser)}{' '}
                  {countWithUser === 0 ? 'person' : 'people'}
                </SupportersCount>
                <SupportersCount
                  style={{
                    animation: `animate-in 1s ease-in-out forwards`,
                  }}
                >
                  <HeartImg src={heartImg} alt="tgp" />
                  {numberFormatter(countWithUser + 1)}{' '}
                  {countWithUser === 1 ? 'person' : 'people'}
                </SupportersCount>
              </>
            ) : (
              <SupportersCount>
                <HeartImg src={heartImg} alt="tgp" />
                {numberFormatter(chamberCount)}{' '}
                {chamberCount === 1 ? 'person' : 'people'}
              </SupportersCount>
            )}
          </SupportersRow>
          <SuppoetersBody13>
            have joined the {candidateBlocName(candidate, chamber)} so far
          </SuppoetersBody13>
        </AvatarWrapper>
        <CenterBar>
          <SupportersProgressBar
            votesNeeded={votesNeeded}
            peopleSoFar={chamberCount}
            showSupporters={false}
            userState={userState}
            suffixText={suffixText}
          />
        </CenterBar>

        <BlueButton fullWidth onClick={shareCallback}>
          <H3 style={{color: '#FFF'}}>TELL SOME FRIENDS</H3>
        </BlueButton>
        <Footer>
          Don&apos;t worry, we will{' '}
          <Link to="/party/faq/we-never-waste-your-vote/prGq4SAFpfT7qzBFM1HDy">
            never waste your vote
          </Link>
          .
        </Footer>
      </Wrapper>
    </Dialog>
  );
};

ChoiceModal.propTypes = {
  open: PropTypes.bool,
  closeCallback: PropTypes.func,
  shareCallback: PropTypes.func,
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  votesNeeded: PropTypes.number,
  chamberCount: PropTypes.number,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  animateCount: PropTypes.bool,
  userState: PropTypes.string,
  suffixText: PropTypes.string,
  chamber: PropTypes.string,
};

export default ChoiceModal;
