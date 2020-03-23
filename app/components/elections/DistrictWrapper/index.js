import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Collapse from '@material-ui/core/Collapse';

import Wrapper from 'components/shared/Wrapper';
import LoadingAnimation from 'components/shared/LoadingAnimation';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import Nav from 'containers/shared/Nav';
import AmaContainer from 'containers/shared/AmaContainer';
import { H1, H3, Body, Body11 } from 'components/shared/typogrophy';
import TopQuestions from 'components/shared/TopQuestions';
import GrayWrapper from 'components/shared/GrayWrapper';
import GoodPartyStats from '../GoodPartyStats';
import VsCard from '../VsCard';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: ${props => props.justifyContent || 'normal'};
`;
const Spacer = styled.div`
  margin-top: 16px;
`;

const NotDistrict = styled(Body11)`
  color: ${({ theme }) => theme.colors.blue};
  font-weight: 500;
  cursor: pointer;
`;

const CdWrapper = styled.div`
  padding: 1rem;
  margin: 1rem 0;
  background-color: #fff;
  border: solid 1px #fff;
  cursor: pointer;
  transition: border 0.4s;

  &:hover,
  &.active {
    border: solid 1px ${({ theme }) => theme.colors.blue};
    .active {
      color: ${({ theme }) => theme.colors.blue};
  }
`;

const DistrictWrapper = ({
  district = {},
  geoLocation = false,
  cdIndex,
  presidential = {},
  senateCandidates = {},
  houseCandidates = {},
  content,
  changeDistrictCallback,
  user,
  userCounts,
}) => {
  let primaryCity;
  let stateLong;
  let zip;
  let shortState;
  let districtNumber;

  const [showCds, setShowCds] = useState(false);
  const [cdsWithPerc, setCdsWithPerc] = useState([]);
  const [thresholds, setThresholds] = useState({});

  if (geoLocation) {
    const { normalizedAddress, district } = geoLocation;
    primaryCity = normalizedAddress.city;
    stateLong = geoLocation.state;
    shortState = geoLocation.state.toUpperCase();
    districtNumber = district.code;
  } else {
    const { stateShort, cds } = district;
    primaryCity = district.primaryCity;
    stateLong = district.stateLong;
    zip = district.zip;

    shortState = stateShort ? stateShort.toUpperCase() : '';
    if (cds && cds.length > 0) {
      districtNumber = cds[cdIndex].code;
    }
  }

  let articles = [];
  if (content && content.faqArticles) {
    const allArticles = content.faqArticles;
    articles = allArticles.filter(article => {
      if (!article.pages) {
        return false;
      }
      return article.pages.includes('district');
    });
  }

  const { cds, approxPctArr, senateThresholds } = district;
  useEffect(() => {
    const cdWithPerc = [];

    const approxArr = approxPctArr ? JSON.parse(approxPctArr) : [];
    approxArr.forEach(approxDist => {
      cds.forEach(cd => {
        if (approxDist.districtId === cd.id) {
          cdWithPerc.push({ ...cd, pct: approxDist.pct });
        }
      });
    });
    setCdsWithPerc(cdWithPerc);
    let houseThreshold;
    let senateThreshold;
    if (cds && cds[cdIndex]) {
      houseThreshold =
        Math.max(
          cds[cdIndex].writeInThreshold,
          cds[cdIndex].writeInThresholdWithPresident,
        ) + 1;
    }
    if (senateThresholds) {
      senateThreshold =
        Math.max(
          senateThresholds.writeInThreshold,
          senateThresholds.writeInThresholdWithPresident,
        ) + 1;
    }

    const presidentialThreshold = 65853514;
    setThresholds({
      presidentialThreshold,
      senateThreshold,
      houseThreshold,
    });
  }, [cds]);

  const toggleShowCds = () => {
    setShowCds(prev => !prev);
  };

  let electionCount = 1;
  if (
    senateCandidates &&
    senateCandidates.good &&
    senateCandidates.good.length === 0 &&
    senateCandidates.notGood.length === 0 &&
    senateCandidates.unknown.length === 0
  ) {
    electionCount++;
  }
  if (
    houseCandidates &&
    houseCandidates.good &&
    houseCandidates.good.length === 0 &&
    houseCandidates.notGood.length === 0 &&
    houseCandidates.unknown.length === 0
  ) {
    electionCount++;
  }

  return (
    <GrayWrapper>
      {district && presidential ? (
        <>
          <Nav />
          <Wrapper>
            <MobileHeader />
            <Row>
              <H1>{primaryCity},</H1>
              &nbsp;
              <H3>
                {shortState} {zip}
              </H3>
            </Row>
            <Row justifyContent="space-between">
              <Body>
                {stateLong} District {districtNumber} ({shortState}-
                {districtNumber})
              </Body>
              <NotDistrict onClick={toggleShowCds}>
                {showCds ? 'Select Your District' : 'Not Your District?'}
              </NotDistrict>
            </Row>
            <Collapse in={showCds} timeout={600}>
              {cdsWithPerc.length > 1 &&
                cdsWithPerc.map((cd, index) => (
                  <CdWrapper
                    className={index === cdIndex && 'active'}
                    key={cd.id}
                    onClick={() =>
                      changeDistrictCallback(cd.id, index, zip, user)
                    }
                  >
                    <Body className={index === cdIndex && 'active'}>
                      {cd.name}
                    </Body>
                    <Body11>
                      {cd.pct}% of {zip} zip code population live in {cd.name}
                    </Body11>
                  </CdWrapper>
                ))}
              <CdWrapper>
                <Link to="/intro/zip-finder">
                  <Body>Change your Zip Code</Body>
                </Link>
              </CdWrapper>
            </Collapse>
            <Spacer>
              <Body>
                You have <strong>{electionCount}</strong> relevant Federal
                elections to consider. Click on the cards below for details:
              </Body>
            </Spacer>
            <Link to="/elections/presidential-election">
              <VsCard
                title="Presidential Election"
                candidates={presidential}
                votesNeeded={thresholds.presidentialThreshold}
                peopleSoFar={userCounts ? userCounts.totalUsers : 0}
              />
            </Link>
            <Link to={`/elections/senate-election/${shortState.toLowerCase()}`}>
              <VsCard
                title={`Senator - ${stateLong}`}
                candidates={senateCandidates}
                votesNeeded={thresholds.senateThreshold}
                peopleSoFar={userCounts ? userCounts.stateUsers : 0}
              />
            </Link>
            <Link
              to={`/elections/house-election/${shortState.toLowerCase()}-${districtNumber}`}
            >
              <VsCard
                title={`House Representative ${shortState}-${districtNumber}`}
                candidates={houseCandidates}
                votesNeeded={thresholds.houseThreshold}
                peopleSoFar={userCounts ? userCounts.districtUsers : 0}
              />
            </Link>
            <GoodPartyStats />
            <TopQuestions articles={articles} />
          </Wrapper>
          <AmaContainer />
        </>
      ) : (
        <Wrapper>
          <MobileHeader />
          <LoadingAnimation />
        </Wrapper>
      )}
    </GrayWrapper>
  );
};

DistrictWrapper.propTypes = {
  district: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  geoLocation: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),

  presidential: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  senateCandidates: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  houseCandidates: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  userCounts: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  cdIndex: PropTypes.number,
  changeDistrictCallback: PropTypes.func,
};

export default DistrictWrapper;
