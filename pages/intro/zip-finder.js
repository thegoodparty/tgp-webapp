// import { END } from 'redux-saga';
import Page from 'containers/intro/ZipFinderPage';
// import wrapper from '../../redux/store';
// import { loadContent } from '../../utils/loadInitialState';

export default function Party() {
  return <Page />;
}

// export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
//   console.log('get static props', store);
//   console.log('store.getState()', store.getState());
//   loadContent(store.dispatch);
//   store.dispatch(END)
//   console.log('store.getState()', store.getState());
//   if (store.global) {
//     await store.global.toPromise();
//   }
// });
