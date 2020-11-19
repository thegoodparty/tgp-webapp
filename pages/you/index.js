import { END } from 'redux-saga';
import YouPage from '../../containers/you/YouPage';
import wrapper from '../../redux/store';
import { loadContent } from '../loadInitialState';

export default function You() {
  return <YouPage />;
}

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  console.log('get static props', store);
  console.log('store.getState()', store.getState());
  loadContent(store.dispatch);
  store.dispatch(END);
  console.log('store.getState()', store.getState());
  await store.global.toPromise();
});
