import Page from '/containers/company/TeamPage';
import tgpApi from '../api/tgpApi';
export default function LP() {
  return <Page />;
}

// export async function getServerSideProps() {
//   try {
//     const api = tgpApi.contentByKey;
//     const url = `${api.url}?key=teamPage`;
//     // const url = `${api.url}?key=teamPage`;
//     const res = await fetch(url);
//
//     const { content } = await res.json();
//     return {
//       props: {
//         ssrState: {
//           content,
//         },
//       },
//     };
//   } catch (e) {
//     return {
//       props: {
//         ssrState: {
//           content: {},
//         },
//       },
//     };
//   }
// }
