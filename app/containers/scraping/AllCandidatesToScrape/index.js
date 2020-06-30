/**
 *
 * AllCandidatesToScrape
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { makeSelectLocation } from 'containers/App/selectors';
import queryHelper from 'helpers/queryHelper';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAllCandidatesToScrape from './selectors';
import reducer from './reducer';
import saga from './saga';
import scrapeAction from './actions';
import { candidateRoute } from '../../../helpers/electionsHelper';

export function AllCandidatesToScrape({
  scrapeState,
  locationState,
  dispatch,
}) {
  useInjectReducer({ key: 'allCandidatesToScrape', reducer });
  useInjectSaga({ key: 'allCandidatesToScrape', saga });

  const { candidates } = scrapeState;
  const { search } = locationState;
  const onlyNoData = queryHelper(search, 'onlyNoData');
  useEffect(() => {
    if (!candidates) {
      dispatch(scrapeAction.loadAllCandidatesAction(onlyNoData || false));
    }
  }, [candidates, onlyNoData]);

  const underScoreName = name => {
    const nameArr = name.split(' ');
    let newName = '';
    nameArr.forEach(part => {
      newName += `${part.charAt(0).toUpperCase()}${part.slice(1)}_`;
    });

    return newName.slice(0, -1);
  };

  const underScoreNameNoMiddle = name => {
    const nameArr = name.split(' ');
    let last = nameArr[nameArr.length - 1].toLowerCase();
    console.log(last);
    if (last === 'jr' || last === 'jr.') {
      last = nameArr[nameArr.length - 2];
      console.log('found jr', last);
    }
    const firstLastOnly = `${nameArr[0]} ${last}`;
    return underScoreName(firstLastOnly);
  };

  const hasMiddleName = name => {
    const nameArr = name.split(' ');
    return nameArr.length > 2;
  };

  return (
    <div>
      <Helmet>
        <title>AllCandidatesToScrape</title>
        <meta
          name="description"
          content="Description of AllCandidatesToScrape"
        />
      </Helmet>
      <div>
        <h1>
          Candidates {onlyNoData ? ' without data ' : ''}count:{' '}
          {candidates && candidates.length}
        </h1>
        {candidates &&
          candidates.map((candidate, index) => (
            <div>
              <>
                {!onlyNoData ? (
                  <>
                    <span key={candidate.id}>
                      <a
                        className="ballotpedia"
                        href={
                          candidate.source
                            ? candidate.source
                            : `https://ballotpedia.org/${underScoreName(
                                candidate.name,
                              )}`
                        }
                        // href={`https://ballotpedia.org/${underScoreName(
                        //   candidate.name,
                        // )}`}
                      >
                        {candidate.id}|{candidate.name}|
                        {candidate.isIncumbent && 'incumbent'}|
                        {candidate.chamber}
                      </a>
                    </span>
                    {hasMiddleName(candidate.name) && (
                      <span key={candidate.id}>
                        <a
                          className="ballotpedia"
                          href={
                            candidate.source
                              ? candidate.source
                              : `https://ballotpedia.org/${underScoreNameNoMiddle(
                                  candidate.name,
                                )}`
                          }
                          // href={`https://ballotpedia.org/${underScoreNameNoMiddle(
                          //   candidate.name,
                          // )}`}
                        >
                          {candidate.id}|{candidate.name}|
                          {candidate.isIncumbent && 'incumbent'}|
                          {candidate.chamber}
                        </a>
                      </span>
                    )}
                  </>
                ) : (
                  <span key={candidate.id}>
                    <a
                      className="ballotpedia"
                      href={
                        candidate.source
                          ? candidate.source
                          : `https://ballotpedia.org/${underScoreNameNoMiddle(
                              candidate.name,
                            )}`
                      }
                      // href={`https://ballotpedia.org/${underScoreNameNoMiddle(
                      //   candidate.name,
                      // )}`}
                    >
                      {candidate.id}|{candidate.name}|
                      {candidate.isIncumbent && 'incumbent'}|
                      {candidate.chamber}
                    </a>
                  </span>
                )}
              </>
              <span style={{ padding: '0 20px' }}>
                {candidate.state} - {candidate.district}
              </span>
              <a href={candidateRoute(candidate)}>
                {candidateRoute(candidate)}
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}

AllCandidatesToScrape.propTypes = {
  dispatch: PropTypes.func.isRequired,
  scrapeState: PropTypes.object,
  locationState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  scrapeState: makeSelectAllCandidatesToScrape(),
  locationState: makeSelectLocation(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AllCandidatesToScrape);
