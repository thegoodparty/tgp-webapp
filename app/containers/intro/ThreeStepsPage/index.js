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
import { getCookie } from 'helpers/cookieHelper';

export function ThreeStepsPage({ handleNextStep }) {
  const childProps = {
    handleNextStep,
  };
  return (
    <div>
      <Helmet>
        <title>Three Good Steps</title>
        <meta
          name="description"
          content="Three Good Steps: show good candidates, count needed votes, vote or write in, for the win!"
        />
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
      let zipWithDistricts;
      const zipCookie = getCookie('zip');
      if (zipCookie) {
        zipWithDistricts = JSON.parse(zipCookie);
      }

      if (zipWithDistricts) {
        dispatch(push(`/elections/district/${zipWithDistricts.zip}`));
      } else {
        dispatch(push('/intro/zip-finder'));
      }
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
