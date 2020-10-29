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
import TgpHelmet from '../../../components/shared/TgpHelmet';

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
      <TgpHelmet
        title="Congressional Funding"
        description="We tracked the funding for all 535 members of congress to see who is funded by normal people."
      />
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
