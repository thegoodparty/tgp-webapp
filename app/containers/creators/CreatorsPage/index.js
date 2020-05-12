/**
 *
 * CreatorsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import CreatorsWrapper from 'components/creators/CreatorsWrapper';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCreatorsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectContent,
} from 'containers/App/selectors';

export function CreatorsPage({ content }) {
  useInjectReducer({ key: 'creatorsPage', reducer });
  useInjectSaga({ key: 'creatorsPage', saga });
  const childProps = {
    projects: content.creatorsProjects || []
  };
  
  return (
    <div>
      <Helmet>
        <title>Creators of The World, Unite!</title>
        <meta name="description" content="Creators of The World, Unite!" />
      </Helmet>
      <CreatorsWrapper {...childProps} />
    </div>
  );
}

CreatorsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  creatorsPage: makeSelectCreatorsPage(),
  content: makeSelectContent(),
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

export default compose(withConnect)(CreatorsPage);
