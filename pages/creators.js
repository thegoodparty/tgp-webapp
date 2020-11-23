import { END } from 'redux-saga';
import wrapper from 'redux/store';
import { loadContent } from 'utils/loadInitialState';
import CreatorsPage from 'containers/creators/CreatorsPage';
export default function Creators() {
  return <CreatorsPage />;
}

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  loadContent(store.dispatch);
  store.dispatch(END);
  if (store.global) {
    await store.global.toPromise();
  }
});
