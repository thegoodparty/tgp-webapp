/**
 *
 * SharePage
 *
 */

import React, { memo} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import makeSelectUser from 'containers/you/YouPage/selectors';
import reducer from 'containers/you/YouPage/reducer';
import { makeSelectContent } from 'containers/App/selectors';

import ShareWrapper from 'components/you/ShareWrapper';

export function SharePage({ content, userState}) {
  useInjectReducer({ key: 'user', reducer });

  const { user } = userState;

  const childProps = {
    content,
    user,
  };
  return (
    <div>
      <Helmet>
        <title>Share The Message! | The Good Party</title>
        <meta
          name="description"
          content="Share The Message! | The Good Party"
        />
      </Helmet>
      <ShareWrapper {...childProps} />
    </div>
  );
}

SharePage.propTypes = {
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  userState: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
  };
}

const mapStateToProps = createStructuredSelector({
  content: makeSelectContent(),
  userState: makeSelectUser(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SharePage);
