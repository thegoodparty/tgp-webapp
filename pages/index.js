import HomePage from '/containers/HomePage';
import tgpApi from '/api/tgpApi';

export default function Home({ ssrState }) {
  return <HomePage ssrState={ssrState} />;
}

// export async function getServerSideProps() {
//   const api = tgpApi.homepageCandidates;
//
//   let homepageCandidates;
//   let engagements = 134222;
//   try {
//     const res = await fetch(api.url);
//     ({ homepageCandidates, engagements } = await res.json());
//   } catch (e) {
//     homepageCandidates = [];
//   }
//
//   return {
//     props: {
//       ssrState: {
//         homepageCandidates,
//         engagements,
//       },
//     }, // will be passed to the page component as props
//   };
// }

export async function getServerSideProps(context) {
  const utmContent = context.query.utm_content || '';
  const utmSource = context.query.utm_source || '';

  const api = tgpApi.followers;

  let totalFollowers;
  try {
    const res = await fetch(api.url);
    const response = await res.json();
    totalFollowers = response.total;
  } catch (e) {
    totalFollowers = 31858;
  }
  return {
    props: {
      ssrState: {
        utmContent,
        utmSource,
        totalFollowers,
      },
    },
  };
}
