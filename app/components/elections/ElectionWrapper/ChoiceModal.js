import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Cancel';
import { Link } from 'react-router-dom';
import VotesNeeded from 'components/home/ChallengersSection/VotesNeeded';
// import SupportersImg from 'images/icons/supporters.svg';
// import LogoCapsImg from 'images/logo-caps.svg';
import { Body, Body13, H3, Body11 } from 'components/shared/typogrophy';
import CandidateAvatar from 'components/shared/CandidateAvatar';
import {
  candidateBlocName,
  partyResolver,
  blocNameSuffix,
} from 'helpers/electionsHelper';
import { getCandidateChamberDistrict } from 'helpers/candidatesHelper';
import { numberFormatter } from 'helpers/numberHelper';
import SupportersProgressBar from '../SupportersProgressBar';
import { BlueButton } from '../../shared/buttons';
import Stepper from '../../shared/Stepper';

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

const defaultRegisterSteps = ['Sign Up', 'Voterize', 'Tell Others'];

const ChoiceModal = ({
  candidate,
  open,
  votesNeeded,
  chamberCount,
  userState,
  suffixText,
  closeCallback,
  shareCallback,
  joinCallback,
  state,
  district,
  isExternalLink,
}) => {
  if (!candidate) {
    return <> </>;
  }

  let { isGood, name } = candidate;
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
  candidate.votesNeeded = votesNeeded;
  const blocName = candidateBlocName(candidate);
  const blocSuffix = blocNameSuffix(blocName);
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
        {/*<div className="text-center">*/}
        {/*  {' '}*/}
        {/*  <Logo src={LogoCapsImg} />*/}
        {/*</div>*/}
        <Stepper steps={defaultRegisterSteps} activeStep={2} />
        <AvatarWrapper>
          <CandidateAvatar
            good={isGood}
            size="responsive"
            src={candidate.image}
            name={candidate.name}
          />

          {isExternalLink ? (
            <>
              <TitleH3 style={{ marginBottom: '12px' }}>
                Want to try and elect {candidate.name}?
              </TitleH3>
              {candidate.chamber === 'presidential' || !candidate.chamber ? (
                <SubTitle>
                  {candidate.party === 'W' ? '' : 'AS A'}{' '}
                  {partyResolver(candidate.party)} CANDIDATE FOR
                  <br />
                  U.S. PRESIDENT
                </SubTitle>
              ) : (
                <SubTitle>
                  {candidate.id < 0
                    ? 'TO THE '
                    : `${partyResolver(candidate.party)} CANDIDATE `}
                  <br />
                  U.S. {displayChamber}
                </SubTitle>
              )}
            </>
          ) : (
            <>
              <Spread>Tell others about this campaign!</Spread>
              <TitleH3>
                {name}
                <br />
                for {getCandidateChamberDistrict(candidate)}
              </TitleH3>
            </>
          )}
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
            votesNeeded={votesNeeded}
            peopleSoFar={chamberCount}
            showSupporters={false}
            showSuffix={false}
            userState={userState}
            suffixText={suffixText}
          />
        </CenterBar>
        {isExternalLink ? (
          <>
            <BlueButton fullWidth onClick={() => joinCallback(candidate)}>
              <H3 style={{ color: '#FFF', textTransform: 'none' }}>
                JOIN {blocName} {blocSuffix}
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
              <H3 style={{ color: '#FFF' }}>SHARE THIS...</H3>
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
