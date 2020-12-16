import { END } from 'redux-saga';
import YouPage from 'containers/you/YouPage';
import wrapper from 'redux/store';
import { loadContent } from 'utils/loadInitialState';

export default function You() {
  return <YouPage />;
}
//
// export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
//   loadContent(store.dispatch);
//   store.dispatch(END);
//   if (store.global) {
//     await store.global.toPromise();
//   }
// });
