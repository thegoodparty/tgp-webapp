/**
 *
 * IncumbentsPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import IncumbentsWrapper from 'components/elections/IncumbentsWrapper';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectIncumbentsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';

export function IncumbentsPage({ incumbentsPage, dispatch }) {
  useInjectReducer({ key: 'incumbentsPage', reducer });
  useInjectSaga({ key: 'incumbentsPage', saga });

  const { loading, incumbents } = incumbentsPage;
  useEffect(() => {
    if (!incumbents) {
      dispatch(actions.loadIncumbentsAction());
    }
  }, [incumbents]);

  const childProps = {
    loading,
    incumbents,
  };
  return (
    <div>
      <Helmet>
        <title>IncumbentsPage</title>
        <meta name="description" content="Description of IncumbentsPage" />
      </Helmet>
      <IncumbentsWrapper {...childProps} />
    </div>
  );
}

IncumbentsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  incumbentsPage: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  incumbentsPage: makeSelectIncumbentsPage(),
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

export default compose(withConnect)(IncumbentsPage);
