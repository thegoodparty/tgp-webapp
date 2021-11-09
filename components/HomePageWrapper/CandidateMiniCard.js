import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Link from 'next/Link';
import CandidateAvatar from '../shared/CandidateCard/CandidateAvatar';
import { candidateRoute, partyResolver } from '../../helpers/electionsHelper';
import { numberFormatter } from '../../helpers/numberHelper';
import SupportersProgressBar from '../elections/SupportersProgressBar';
import { achievementsHelper } from '../../helpers/achievementsHelper';
import { PurpleButton } from '../shared/buttons';

const Wrapper = styled.div`
  padding: 24px;
  background-color: #efecf2;
  border-radius: 8px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  margin: 6px;

  .bar-bg {
    background-color: #fff; // progress bar bg
  }
`;

const Name = styled.div`
  font-size: 21px;
  line-height: 26px;
  letter-spacing: 0.2px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.purple};
`;

const Race = styled.div`
  margin-top: 8px;
  font-size: 15px;
  letter-spacing: 0.2px;
  font-weight: 700;
`;

const Row = styled.div`
  display: flex;
  margin-top: 12px;
  align-items: center;
  font-size: 12px;
  line-height: 22px;
  letter-spacing: 0.2px;
`;

const Icon = styled.img`
  margin-right: 16px;
`;

const Endorsements = styled.div`
  font-size: 16px;
  line-height: 22px;
  margin-top: 16px;

  .large {
    font-size: 22px;
    line-height: 22px;
    color: ${({ theme }) => theme.colors.purple};
    font-weight: 700;
  }
`;

const NextStep = styled.div`
  text-align: right;
  font-size: 11px;
  position: relative;
`;

const Line = styled.div`
  border-right: solid 1px #d3cbe0;
  height: 16px;
  width: 2px;
  position: absolute;

  top: 16px;
  right: 4px;
  z-index: 100;
`;

const ButtonWrapper = styled.div`
  max-width: 200px;
  text-align: center;
  margin: 12px auto 0;
`;

const CandidateMiniCard = ({ candidate }) => {
  const {
    firstName,
    lastName,
    image,
    race,
    party,
    supporters,
    headline,
    isDraft,
  } = candidate;

  const achievements = achievementsHelper(supporters);
  return (
    <Wrapper>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <CandidateAvatar
            avatar={image}
            party={party}
            size="medium"
            partyBadge
            centered
            hideBadge={isDraft}
          />
        </Grid>
        <Grid item xs={9}>
          <Name>
            {firstName}
            <br />
            {lastName}
          </Name>
          <Race>{race}</Race>
        </Grid>
      </Grid>
      <Row>
        <Icon src="/images/homepage/party-icon.svg" />
        <div>{partyResolver(party)}</div>
      </Row>
      <Row>
        <Icon src="/images/homepage/talk-bubble-icon.svg" />
        <div>&quot;{headline}&quot;</div>
      </Row>
      <Endorsements>
        <span className="large">{numberFormatter(supporters)}</span>{' '}
        endorsements
      </Endorsements>
      <NextStep>
        {numberFormatter(achievements.nextStep)}
        <Line />
      </NextStep>
      <SupportersProgressBar
        showSupporters={false}
        votesNeeded={achievements.nextStep}
        peopleSoFar={supporters}
        fullWidth
        showSuffix={false}
      />

      <ButtonWrapper>
        <Link href={candidateRoute(candidate)} passHref>
          <a>
            <PurpleButton fullWidth>See Campaign</PurpleButton>
          </a>
        </Link>
      </ButtonWrapper>
    </Wrapper>
  );
};

CandidateMiniCard.propTypes = {
  candidate: PropTypes.object,
};

export default CandidateMiniCard;
