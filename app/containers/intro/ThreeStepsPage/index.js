/**
 *
 * ThreeStepsPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

import ThreeStepsWrapper from 'components/intro/ThreeStepsWrapper';

export function ThreeStepsPage({ handleNextStep }) {
  const childProps = {
    handleNextStep,
  };
  return (
    <div>
      <Helmet>
        <title>ThreeStepsPage</title>
        <meta name="description" content="Description of ThreeStepsPage" />
      </Helmet>
      <ThreeStepsWrapper {...childProps} />
    </div>
  );
}

ThreeStepsPage.propTypes = {
  handleNextStep: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    handleNextStep: () => {
      /*
      if (zipWithDistricts) {
      Router.push(`/elections/district/${zipWithDistricts.zip}`);
    } else {
      Router.push('/zip-finder');
    }
       */
      dispatch(push('/intro/zip-finder'));
    },
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ThreeStepsPage);
