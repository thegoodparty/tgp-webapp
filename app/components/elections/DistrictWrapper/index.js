import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Wrapper from 'components/shared/Wrapper';
import LoadingAnimation from 'components/shared/LoadingAnimation';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import Nav from 'containers/Nav';
import { H1, H3, Body, Body11 } from 'components/shared/typogrophy';
import TopQuestions from 'components/shared/TopQuestions';
import GrayWrapper from 'components/shared/GrayWrapper';
import Ama from 'components/shared/Ama';
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
`;

const DistrictWrapper = ({
  district = {},
  geoLocation = false,
  presidential = {},
  districtIncumbents = {},
  districtCandidates = {},
  content,
}) => {
  let primaryCity;
  let stateLong;
  let zip;
  let shortState;
  let districtNumber;

  if (geoLocation) {
    const { normalizedAddess, district } = geoLocation;
    primaryCity = normalizedAddess.city;
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
      districtNumber = cds[0].code;
    }
  }

  let senateInc = { good: [], notGood: [] };
  let houseInc = { good: [], notGood: [] };
  const { houseIncumbent, senateIncumbents } = districtIncumbents;
  if (houseIncumbent) {
    if (houseIncumbent.isGood) {
      houseInc.good.push(houseIncumbent);
    } else {
      houseInc.notGood.push(houseIncumbent);
    }
  }

  if (senateIncumbents) {
    senateInc = senateIncumbents;
  }

  let houseCandidatesAndIncumbents;
  const { houseCandidates, senateCandidates } = districtCandidates;
  if (houseCandidates) {
    houseCandidatesAndIncumbents = {
      good: houseInc.good.concat(houseCandidates.good),
      notGood: houseInc.notGood.concat(houseCandidates.notGood),
    };
  }

  let senateCandidatesAndIncumbents;
  if (senateCandidates) {
    senateCandidatesAndIncumbents = {
      good: senateInc.good.concat(senateCandidates.good),
      notGood: senateInc.notGood.concat(senateCandidates.notGood),
    };
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
              <Link to="/">
                <NotDistrict>Not Your District?</NotDistrict>
              </Link>
            </Row>
            <Spacer>
              <Body>
                You have <strong>3</strong> relevant Federal elections to
                consider. Click on the cards below for details:
              </Body>
            </Spacer>
            <Link to="/elections/presidential-election">
              <VsCard title="Presidential Election" candidates={presidential} />
            </Link>
            <VsCard
              title={`Senator - ${stateLong}`}
              candidates={senateCandidatesAndIncumbents || []}
            />
            <VsCard
              title={`House Representative ${shortState}-${districtNumber}`}
              candidates={houseCandidatesAndIncumbents || []}
            />
            <GoodPartyStats />
            <TopQuestions articles={articles} />
          </Wrapper>
          <Ama />
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
  districtIncumbents: PropTypes.object,
  districtCandidates: PropTypes.object,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default DistrictWrapper;
