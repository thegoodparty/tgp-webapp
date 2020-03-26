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

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAllCandidatesToScrape from './selectors';
import reducer from './reducer';
import saga from './saga';
import scrapeAction from './actions';

export function AllCandidatesToScrape({ scrapeState, dispatch }) {
  useInjectReducer({ key: 'allCandidatesToScrape', reducer });
  useInjectSaga({ key: 'allCandidatesToScrape', saga });

  const { candidates } = scrapeState;

  useEffect(() => {
    if (!candidates) {
      dispatch(scrapeAction.loadAllCandidatesAction());
    }
  }, [candidates]);

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
    const firstLastOnly = `${nameArr[0]} ${nameArr[nameArr.length - 1]}`;
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
        <div><a href="https://ballotpedia.org/Mike_Garcia">2073|Mike Garcia|</a></div>
        <div><a href="https://ballotpedia.org/Christy_Smith">2074|Christy Smith|</a></div>
        <div><a href="https://ballotpedia.org/George_Papadopoulos">2075|George Papadopoulos|</a></div>
      </div>
      {/*<div>*/}
        {/*{candidates &&*/}
          {/*candidates.map(candidate => (*/}
            {/*<>*/}
              {/*<div key={candidate.id}>*/}
                {/*<a*/}
                  {/*href={`https://ballotpedia.org/${underScoreName(*/}
                    {/*candidate.name,*/}
                  {/*)}`}*/}
                {/*>*/}
                  {/*{candidate.id}|{candidate.name}|*/}
                  {/*{candidate.isIncumbent && 'incumbent'}*/}
                {/*</a>*/}
              {/*</div>*/}
              {/*{hasMiddleName(candidate.name) && (*/}
                {/*<div key={candidate.id}>*/}
                  {/*<a*/}
                    {/*href={`https://ballotpedia.org/${underScoreNameNoMiddle(*/}
                      {/*candidate.name,*/}
                    {/*)}`}*/}
                  {/*>*/}
                    {/*{candidate.id}|{candidate.name}|*/}
                    {/*{candidate.isIncumbent && 'incumbent'}*/}
                  {/*</a>*/}
                {/*</div>*/}
              {/*)}*/}
            {/*</>*/}
          {/*))}*/}
      {/*</div>*/}
    </div>
  );
}

AllCandidatesToScrape.propTypes = {
  dispatch: PropTypes.func.isRequired,
  scrapeState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  scrapeState: makeSelectAllCandidatesToScrape(),
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
