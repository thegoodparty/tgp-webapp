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
}) => {
  let primaryCity;
  let stateLong;
  let zip;
  let shortState;
  let districtNumber;

  const [showCds, setShowCds] = useState(false);
  const [cdsWithPerc, setCdsWithPerc] = useState([]);

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

  // let senateInc = { good: [], notGood: [] };
  // let houseInc = { good: [], notGood: [] };
  // const { houseIncumbent, senateIncumbents } = districtIncumbents;
  // if (houseIncumbent) {
  //   if (houseIncumbent.isGood) {
  //     houseInc.good.push(houseIncumbent);
  //   } else {
  //     houseInc.notGood.push(houseIncumbent);
  //   }
  // }
  //
  // if (senateIncumbents) {
  //   senateInc = senateIncumbents;
  // }
  //
  // let houseCandidatesAndIncumbents;
  // const { houseCandidates, senateCandidates } = districtCandidates;
  // if (houseCandidates) {
  //   houseCandidatesAndIncumbents = {
  //     good: houseInc.good.concat(houseCandidates.good),
  //     notGood: houseInc.notGood.concat(houseCandidates.notGood),
  //   };
  // }
  //
  // let senateCandidatesAndIncumbents;
  // if (senateCandidates) {
  //   senateCandidatesAndIncumbents = {
  //     good: senateInc.good.concat(senateCandidates.good),
  //     notGood: senateInc.notGood.concat(senateCandidates.notGood),
  //   };
  // }

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

  const { cds, approxPctArr } = district;
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
  }, [cds]);

  const toggleShowCds = () => {
    setShowCds(prev => !prev);
  };

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
              {cdsWithPerc.length > 1 && (
                <NotDistrict onClick={toggleShowCds}>
                  {showCds ? 'Select Your District' : 'Not Your District?'}
                </NotDistrict>
              )}
            </Row>
            <Collapse in={showCds} timeout={600}>
              {cdsWithPerc.map((cd, index) => (
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
            </Collapse>
            <Spacer>
              <Body>
                You have <strong>3</strong> relevant Federal elections to
                consider. Click on the cards below for details:
              </Body>
            </Spacer>
            <Link to="/elections/presidential-election">
              <VsCard title="Presidential Election" candidates={presidential} />
            </Link>
            <Link to={`/elections/senate-election/${shortState.toLowerCase()}`}>
              <VsCard
                title={`Senator - ${stateLong}`}
                candidates={senateCandidates}
              />
            </Link>
            <Link
              to={`/elections/house-election/${shortState.toLowerCase()}-${districtNumber}`}
            >
              <VsCard
                title={`House Representative ${shortState}-${districtNumber}`}
                candidates={houseCandidates}
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

  presidential: PropTypes.object,
  senateCandidates: PropTypes.object,
  houseCandidates: PropTypes.object,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  cdIndex: PropTypes.number,
  changeDistrictCallback: PropTypes.func,
};

export default DistrictWrapper;
