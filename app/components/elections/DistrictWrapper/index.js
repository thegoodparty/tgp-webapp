import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Collapse from '@material-ui/core/Collapse';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import WarningIcon from '@material-ui/icons/Warning';

import PageWrapper from 'components/shared/PageWrapper';
import LoadingAnimation from 'components/shared/LoadingAnimation';
import AmaContainer from 'containers/shared/AmaContainer';
import { H1, H3, Body, Body11 } from 'components/shared/typogrophy';
import TopQuestions from 'components/shared/TopQuestions';
import {
  houseElectionLink,
  isEmptyCandidates,
  presidentialElectionLink,
  senateElectionLink,
} from 'helpers/electionsHelper';
import VsCard from '../VsCard';
import RankedCard from '../RankedCard/Loadable';

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

const AlertWrapper = styled.div`
  border: solid 1px red;
`;

const DistrictWrapper = ({
  district = {},
  cdIndex,
  presidential = {},
  senateCandidates = {},
  houseCandidates = {},
  content,
  changeDistrictCallback,
  deleteRankingCallback,
  changeZipCallback,
  user,
  ranking = {},
}) => {
  let districtNumber;
  const presidentialRank = ranking.presidential;
  const senateRank = ranking.senate;
  const houseRank = ranking.house;

  const [showCds, setShowCds] = useState(false);
  const [cdsWithPerc, setCdsWithPerc] = useState([]);
  const [showRankAlert, setShowRankAlert] = React.useState(false);
  const [selectedCid, setSelectedCid] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(false);
  const [changeZipSelected, setChangeZipSelected] = React.useState(false);

  const {
    stateShort,
    approxPctArr,
    cds,
    primaryCity,
    stateLong,
    zip,
  } = district;

  const shortState = stateShort ? stateShort.toUpperCase() : '';
  const approxPct = approxPctArr ? JSON.parse(approxPctArr) : [];
  if (cds?.length > 0) {
    const { districtId } = approxPct[cdIndex];
    cds.forEach(dist => {
      if (dist.id === districtId) {
        districtNumber = dist.code;
      }
    });
  }

  let articles = [];
  if (content?.faqArticles) {
    const allArticles = content.faqArticles;
    articles = allArticles.filter(article => {
      if (!article.pages) {
        return false;
      }
      return article.pages.includes('district');
    });
  }

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

  let electionCount = 3;
  if (
    senateCandidates?.good?.length < 2 &&
    senateCandidates.notGood.length === 0 &&
    senateCandidates.unknown.length === 0
  ) {
    electionCount--;
  }
  if (
    houseCandidates?.good?.length < 2 &&
    houseCandidates.notGood.length === 0 &&
    houseCandidates.unknown.length === 0
  ) {
    electionCount--;
  }

  const handleDistrictChange = (cdId, index) => {
    if ((user && houseRank) || (user && senateRank)) {
      setSelectedCid(cdId);
      setSelectedIndex(index);
      setShowRankAlert(true);
    } else {
      changeDistrictCallback(cdId, index, zip, user);
    }
  };

  const handleCloseAlert = () => {
    setShowRankAlert(false);
    setSelectedCid(false);
    setSelectedIndex(false);
    setChangeZipSelected(false);
  };

  const handleZipChange = () => {
    if ((user && houseRank) || (user && senateRank)) {
      setChangeZipSelected(true);
      setShowRankAlert(true);
    } else {
      changeZipCallback();
    }
  };

  const handleDeleteRanking = () => {
    deleteRankingCallback(shortState, districtNumber);
    changeDistrictCallback(selectedCid, selectedIndex, zip, user);
    if (changeZipSelected) {
      changeZipCallback();
    }
    handleCloseAlert();
  };

  const upperState = stateShort ? stateShort.toUpperCase() : stateShort;

  return (
    <PageWrapper>
      {district && presidential ? (
        <>
          <Row data-cy="location">
            <H1>{primaryCity},</H1>
            &nbsp;
            <H3>
              {shortState} {zip}
            </H3>
          </Row>
          <Row justifyContent="space-between" data-cy="congressional-district">
            <Body>
              Congressional District:{' '}
              <strong>
                {shortState}-{districtNumber}
              </strong>
            </Body>
            <NotDistrict onClick={toggleShowCds} data-cy="select-district">
              {showCds ? 'Select Your District' : 'Not Your District?'}
            </NotDistrict>
          </Row>
          <Collapse in={showCds} timeout={600}>
            {cdsWithPerc.length > 1 &&
              cdsWithPerc.map((cd, index) => (
                <CdWrapper
                  className={index === cdIndex && 'active'}
                  key={cd.id}
                  onClick={() => handleDistrictChange(cd.id, index, zip, user)}
                  data-cy="district"
                >
                  <Body
                    className={index === cdIndex && 'active'}
                    data-cy="district-name"
                  >
                    {cd.name}
                  </Body>
                  <Body11 data-cy="district-data">
                    {cd.pct}% of {zip} zip code population live in {cd.name}
                  </Body11>
                </CdWrapper>
              ))}
            <CdWrapper onClick={handleZipChange} data-cy="change-zip">
              <Body>Change your Zip Code</Body>
            </CdWrapper>
          </Collapse>
          <Spacer>
            <Body data-cy="federal-election">
              You have <strong data-cy="election-count">{electionCount}</strong>{' '}
              relevant Federal Elections. Check{' '}
              <Link
                to="?article=1ic6T6fhH0jZLNvX5aZkDe"
                data-cy="candidate-article"
              >
                candidate voting blocs
              </Link>{' '}
              to see if your vote can elect someone{' '}
              <Link
                to="?article=5KnBx42FOEVDJNUFpoU1PX"
                data-cy="potentially-good-article"
              >
                Potentially Good
              </Link>
              .
            </Body>
          </Spacer>
          <Link to={presidentialElectionLink()} data-cy="presidential">
            {presidentialRank && Object.keys(presidentialRank).length > 0 ? (
              <RankedCard
                title="Presidential Election"
                candidates={presidential}
                rankObj={presidentialRank}
                suffixText={` (${presidential.electors} ELECTORS)`}
              />
            ) : (
              <VsCard
                title="Presidential Election"
                candidates={presidential}
                suffixText={` IN ${upperState} (${
                  presidential.electors
                } ELECTORS)`}
              />
            )}
          </Link>
          {!isEmptyCandidates(senateCandidates) && (
            <Link to={senateElectionLink(shortState)} data-cy="senate">
              {senateRank && Object.keys(senateRank).length > 0 ? (
                <RankedCard
                  title={`Senator - ${stateLong}`}
                  candidates={senateCandidates}
                  rankObj={senateRank}
                  suffixText={` ${upperState}`}
                  chamber="senate"
                  state={shortState}
                />
              ) : (
                <VsCard
                  title={`Senator - ${stateLong}`}
                  candidates={senateCandidates}
                  suffixText={` ${upperState}`}
                />
              )}
            </Link>
          )}
          {!isEmptyCandidates(houseCandidates) && (
            <Link to={houseElectionLink(shortState, districtNumber)}>
              {houseRank && Object.keys(houseRank).length > 0 ? (
                <RankedCard
                  title={`House Representative ${shortState}-${districtNumber}`}
                  candidates={houseCandidates}
                  rankObj={houseRank}
                  suffixText={` ${upperState}-${districtNumber}`}
                  chamber="house"
                  district={districtNumber}
                  state={shortState}
                />
              ) : (
                <VsCard
                  title={`House Representative ${shortState}-${districtNumber}`}
                  candidates={houseCandidates}
                  suffixText={` ${upperState}-${districtNumber}`}
                />
              )}
            </Link>
          )}
          <TopQuestions articles={articles} />
          <AmaContainer />
        </>
      ) : (
        <LoadingAnimation />
      )}
      <Dialog
        onClose={handleCloseAlert}
        aria-labelledby="Ranking not Allowed"
        open={showRankAlert}
      >
        <AlertWrapper>
          <DialogTitle id="alert-dialog-title">
            <WarningIcon /> District Change
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              If you proceed, your previous district&apos;s ranked choices will
              be discarded.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAlert} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteRanking} color="primary" autoFocus>
              Proceed
            </Button>
          </DialogActions>
        </AlertWrapper>
      </Dialog>
    </PageWrapper>
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
  cdIndex: PropTypes.number,
  changeDistrictCallback: PropTypes.func,
  deleteRankingCallback: PropTypes.func,
  changeZipCallback: PropTypes.func,
  presidentialRank: PropTypes.array,
  senateRank: PropTypes.array,
  houseRank: PropTypes.array,
};

export default DistrictWrapper;
