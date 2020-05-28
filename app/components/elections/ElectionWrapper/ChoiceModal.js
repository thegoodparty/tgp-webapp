import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Cancel';
import { Link } from 'react-router-dom';

import heartImg from 'images/heart.svg';
import LogoCapsImg from 'images/logo-caps.svg';
import { Body, H1, Body13, H3 } from 'components/shared/typogrophy';
import CandidateAvatar from 'components/shared/CandidateAvatar';
import { candidateBlocName, partyResolver } from 'helpers/electionsHelper';
import { numberFormatter } from 'helpers/numberHelper';
import SupportersProgressBar from '../SupportersProgressBar';
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

  &.with-logo {
    padding-top: 24px;
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

const Logo = styled.img`
  margin-bottom: 20px;
`;

const CenterBar = styled(Body)`
  margin-bottom: 32px;
  width: 100%;
`;

const TitleH1 = styled(H1)`
  text-align: center;
  margin-top: 18px;
  margin-bottom: 36px;
`;

const SubTitle = styled(Body13)`
  color: ${({ theme }) => theme.colors.gray9};
  text-transform: uppercase;
  margin-bottom: 32px;
  text-align: center;
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
  width: 100%;
  text-align: center;
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
  joinCallback,
  chamber,
  state,
  district,
  isExternalLink,
}) => {
  if (!candidate) {
    return <> </>;
  }

  let { isGood } = candidate;
  if (candidate.unknown) {
    isGood = null;
  }
  let displayChamber;
  if (candidate.chamber === 'Presidential') {
    displayChamber = 'PRESIDENT';
  } else if (candidate.chamber === 'Senate') {
    displayChamber = `SENATE FROM ${state?.toUpperCase()}`;
  } else {
    displayChamber = `HOUSE OF REPRESENTATIVES FROM ${state?.toUpperCase()}-${district}`;
  }

  const blocName = candidateBlocName(candidate, chamber);
  return (
    <Dialog
      onClose={closeCallback}
      aria-labelledby="Ranking not Allowed"
      open={open}
    >
      <Wrapper className={isExternalLink ? 'with-logo' : ''}>
        <Close onClick={closeCallback}>
          <CloseIcon />
        </Close>
        {isExternalLink && (
          <div className="text-center">
            {' '}
            <Logo src={LogoCapsImg} />
          </div>
        )}

        <AvatarWrapper>
          <CandidateAvatar
            good={isGood}
            size="xl"
            src={candidate.image}
            name={candidate.name}
          />

          {isExternalLink ? (
            <>
              <TitleH1 style={{ marginBottom: '12px' }}>
                Want to try and elect {candidate.name}?
              </TitleH1>
              {candidate.chamber === 'Presidential' ? (
                <SubTitle>
                  {candidate.party === 'W' ? '' : 'AS A'}{' '}
                  {partyResolver(candidate.party)} CANDIDATE FOR
                  <br />
                  U.S. PRESIDENT
                </SubTitle>
              ) : (
                <SubTitle>
                  {partyResolver(candidate.party)} CANDIDATE
                  <br />
                  U.S. {displayChamber}
                </SubTitle>
              )}
            </>
          ) : (
            <TitleH1>
              {blocName} Joined!{' '}
              <span role="img" aria-label="flex">
                💪
              </span>
            </TitleH1>
          )}

          <SupportersRow>
            {animateCount ? (
              <>
                <SupportersCount
                  style={{
                    animation: `animate-out 1s ease-in-out forwards`,
                  }}
                >
                  <HeartImg src={heartImg} alt="tgp" />
                  {numberFormatter(chamberCount)}{' '}
                  {chamberCount === 0 ? 'person' : 'people'}
                </SupportersCount>
                <SupportersCount
                  style={{
                    animation: `animate-in 1s ease-in-out forwards`,
                  }}
                >
                  <HeartImg src={heartImg} alt="tgp" />
                  {numberFormatter(chamberCount + 1)}{' '}
                  {chamberCount === 1 ? 'person' : 'people'}
                </SupportersCount>
              </>
            ) : (
              <SupportersCount>
                <HeartImg src={heartImg} alt="tgp" />
                {numberFormatter(chamberCount ? chamberCount : 0)}{' '}
                {chamberCount === 1 ? 'person' : 'people'}
              </SupportersCount>
            )}
          </SupportersRow>
          <SuppoetersBody13>
            have joined the {blocName}{' '}
            {state ? `in ${state.toUpperCase()}` : ''}
            {district ? `-${district}` : ''} so far
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
        {isExternalLink ? (
          <>
            <BlueButton fullWidth onClick={() => joinCallback(candidate)}>
              <H3 style={{ color: '#FFF', textTransform: 'none' }}>
                JOIN {blocName}
              </H3>
            </BlueButton>
            <Footer>
              <Link to="?article=1ic6T6fhH0jZLNvX5aZkDe">
                What is the {blocName} in The Good Party?
              </Link>
            </Footer>
          </>
        ) : (
          <>
            <BlueButton fullWidth onClick={shareCallback}>
              <H3 style={{ color: '#FFF' }}>TELL SOME FRIENDS...</H3>
            </BlueButton>
            <Footer>
              Don&apos;t worry, we will{' '}
              <Link to="?article=prGq4SAFpfT7qzBFM1HDy">
                never waste your vote
              </Link>
              .
            </Footer>
          </>
        )}
      </Wrapper>
    </Dialog>
  );
};

ChoiceModal.propTypes = {
  open: PropTypes.bool,
  closeCallback: PropTypes.func,
  shareCallback: PropTypes.func,
  joinCallback: PropTypes.func,
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  votesNeeded: PropTypes.number,
  chamberCount: PropTypes.number,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  animateCount: PropTypes.bool,
  userState: PropTypes.string,
  suffixText: PropTypes.string,
  chamber: PropTypes.string,
  state: PropTypes.string,
  district: PropTypes.number,
  isExternalLink: PropTypes.bool,
};

export default ChoiceModal;
