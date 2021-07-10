import Page from 'containers/admin/AdminCandidateListPage';
import tgpApi from '../../api/tgpApi';

export default function Admin() {
  return <Page  />;
}

// export async function getServerSideProps(context) {
//   const api = tgpApi.admin.candidates;
//   const url = `${api.url}?chamber=local`;
//   const res = await fetch(url);
//   let candidates;
//   try {
//     const response = await res.json();
//     ({ candidates } = response);
//   } catch (e) {
//     candidates = [];
//   }
//   return {
//     props: {
//       ssrState: {
//         candidate: candidates,
//       },
//     },
//   };
// }
