/**
 *
 * EditProfilePage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { push } from 'connected-react-router';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectUser from 'containers/you/YouPage/selectors';
import reducer from 'containers/you/YouPage/reducer';
import saga from 'containers/you/YouPage/saga';
import userActions from 'containers/you/YouPage/actions';
import { createStructuredSelector } from 'reselect';

import EditProfileWrapper from 'components/you/EditProfileWrapper';
import LoadingAnimation from '../../../components/shared/LoadingAnimation';
import candidateActions from '../../elections/CandidatePage/actions';

export function EditProfilePage({
  userState,
  updateProfileCallback,
  updatePhotoCallback,
  deleteRankingCallback,
}) {
  useInjectReducer({ key: 'user', reducer });
  useInjectSaga({ key: 'user', saga });

  const { user } = userState;

  const childProps = {
    user,
    updateProfileCallback,
    updatePhotoCallback,
    deleteRankingCallback,
  };

  return (
    <div>
      <Helmet>
        <title>Edit Profile | The Good Party</title>
        <meta name="description" content="Edit Profile | The Good Party" />
      </Helmet>
      <EditProfileWrapper {...childProps} />
    </div>
  );
}

EditProfilePage.propTypes = {
  userState: PropTypes.object,
  updateProfileCallback: PropTypes.func,
  updatePhotoCallback: PropTypes.func,
  deleteRankingCallback: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    updateProfileCallback: updatedFields => {
      dispatch(userActions.updateUserAction(updatedFields));
    },
    updatePhotoCallback: photo => {
      if (photo && photo.pictureFile && photo.pictureData) {
        dispatch(
          userActions.uploadAvatarAction(
            photo.pictureFile,
            photo.pictureData,
            false,
          ),
        );
      }
    },
    deleteRankingCallback: user => {
      if (user && user.shortState && user.districtNumber) {
        const { shortState, districtNumber } = user;
        dispatch(
          candidateActions.saveRankHouseCandidateAction(
            [],
            shortState,
            districtNumber,
          ),
        );
      }
      if (user && user.shortState) {
        const { shortState } = user;

        dispatch(
          candidateActions.saveRankSenateCandidateAction([], shortState),
        );
        dispatch(userActions.deleteUserRankingAction());
      }

      dispatch(push('/intro/zip-finder'));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  userState: makeSelectUser(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EditProfilePage);
