import { END } from 'redux-saga';
import PartyPage from '../../containers/party/PartyPage';
import wrapper from '../../redux/store';
import { loadContent } from '../loadInitialState';

export default function Party() {
  return <PartyPage />;
}

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  console.log('get static props', store);
  console.log('store.getState()', store.getState());
  loadContent(store.dispatch);
  store.dispatch(END)
  console.log('store.getState()', store.getState());
  await store.global.toPromise();
});
