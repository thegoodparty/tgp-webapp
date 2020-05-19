/**
 *
 * YouPage
 *
 */

import React, { useEffect } from 'react';
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
import districtSaga from 'containers/intro/ZipFinderPage/saga';
import districtReducer from 'containers/intro/ZipFinderPage/reducer';
import districtActions from 'containers/intro/ZipFinderPage/actions';

import YouWrapper from 'components/you/YouWrapper';
import ProfileWrapper from 'components/you/ProfileWrapper/Loadable';
import makeSelectZipFinderPage from '../../intro/ZipFinderPage/selectors';
import { userDistrict } from '../../../helpers/userHelper';
import { makeSelectContent } from '../../App/selectors';
import articlesHelper from '../../../helpers/articlesHelper';
import { makeSelectRanking } from './selectors';

export function YouPage({
  userState,
  districtState,
  dispatch,
  signoutCallback,
  content,
  rankingObj,
}) {
  useInjectReducer({ key: 'user', reducer });
  useInjectSaga({ key: 'user', saga });

  useInjectReducer({ key: 'zipFinderPage', reducer: districtReducer });
  useInjectSaga({ key: 'zipFinderPage', saga: districtSaga });

  const { user, crew, ranking } = userState;
  const { houseCandidates, senateCandidates } = districtState;

  useEffect(() => {
    if (user && !crew) {
      dispatch(userActions.crewAction());
    }
    if (user) {
      const { shortState } = user;
      const districtNumber = userDistrict(user);
      if (shortState && districtNumber) {
        dispatch(
          districtActions.loadHouseCandidatesAction(shortState, districtNumber),
        );
      }

      if (shortState) {
        dispatch(districtActions.loadSenateCandidatesAction(shortState));
      }
      if (!ranking) {
        dispatch(userActions.userRankingAction());
      }
    }
  }, [user]);

  let articles = [];
  if (content && content.faqArticles) {
    articles = articlesHelper(content.faqArticles, 'party');
  }

  const countCandidates = chamber => {
    let count = 0;
    if (chamber && typeof chamber.good !== 'undefined') {
      count =
        chamber.good.length + chamber.notGood.length + chamber.unknown.length;
    }
    return count;
  };

  const senateCandidatesCount = countCandidates(senateCandidates);
  const houseCandidatesCount = countCandidates(houseCandidates);

  const accountProps = {
    articles,
    user,
    crew,
    signoutCallback,
    houseCandidatesCount,
    senateCandidatesCount,
    rankingObj,
  };

  const youProps = {
    articles,
  };

  return (
    <div>
      <Helmet>
        <title>You | The Good Party</title>
        <meta name="description" content="You | The Good Party" />
      </Helmet>
      {user ? (
        <ProfileWrapper {...accountProps} />
      ) : (
        <YouWrapper {...youProps} />
      )}
    </div>
  );
}

YouPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userState: PropTypes.object,
  signoutCallback: PropTypes.func,
  districtState: PropTypes.object,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  rankingObj: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    signoutCallback: () => {
      dispatch(userActions.signoutAction());
      dispatch(push('/'));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  userState: makeSelectUser(),
  districtState: makeSelectZipFinderPage(),
  content: makeSelectContent(),
  rankingObj: makeSelectRanking(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(YouPage);
