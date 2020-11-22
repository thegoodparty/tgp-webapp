// import { END } from 'redux-saga';
import Page from 'containers/elections/DistrictPage';
// import wrapper from '../../redux/store';
// import { loadContent } from '../../utils/loadInitialState';

export default function Party() {
  return <Page />;
}
//
// export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
//   loadContent(store.dispatch);
//   store.dispatch(END)
//   if (store.global) {
//     await store.global.toPromise();
//   }
// });
