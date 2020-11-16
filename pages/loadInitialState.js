import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import globalReducer from 'containers/App/reducer';
import globalSaga from 'containers/App/saga';
import globalActions from 'containers/App/actions';

export function loadInitialState() {
  useInjectReducer({ key: 'global', reducer: globalReducer });
  useInjectSaga({ key: 'global', saga: globalSaga });
}

export function loadContent(dispatch) {
  console.log('calling action load content')
  dispatch(globalActions.loadContentAction());
}
