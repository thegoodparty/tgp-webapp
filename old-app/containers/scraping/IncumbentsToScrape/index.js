/**
 *
 * IncumbentsToScrape
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
import makeSelectIncumbentsToScrape from './selectors';
import reducer from './reducer';
import saga from './saga';
import scrapeAction from './actions';

export function IncumbentsToScrape({ scrapeState, dispatch }) {
  useInjectReducer({ key: 'incumbentsState', reducer });
  useInjectSaga({ key: 'incumbentsState', saga });

  const { incumbents } = scrapeState;

  useEffect(() => {
    if (!incumbents) {
      dispatch(scrapeAction.loadIncumbentsAction());
    }
  }, [incumbents]);

  return (
    <div>
      <Helmet>
        <title>IncumbentsToScrape</title>
        <meta name="description" content="Description of IncumbentsToScrape" />
      </Helmet>
      <div>
        {incumbents &&
          incumbents.map(incumbent => (
            <div key={incumbent}>
              <a
                href={`https://www.opensecrets.org/members-of-congress/summary?cycle=2020&type=C&cid=${incumbent}`}
              >
                {incumbent}
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}

IncumbentsToScrape.propTypes = {
  dispatch: PropTypes.func.isRequired,
  scrapeState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  scrapeState: makeSelectIncumbentsToScrape(),
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

export default compose(withConnect)(IncumbentsToScrape);
