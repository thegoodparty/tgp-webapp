import CandidatePage from 'containers/elections/CandidatePage';
import tgpApi from 'api/tgpApi';
export default function Candidate({ ssrState }) {
  return <CandidatePage ssrState={ssrState} />;
}

export async function getServerSideProps(context) {
  const { chamberNameIdTab } = context.params;
  const chamber = chamberNameIdTab?.length > 0 ? chamberNameIdTab[0] : false;
  // const name = chamberNameIdTab?.length > 1 ? chamberNameIdTab[1] : false;
  const id = chamberNameIdTab?.length > 2 ? chamberNameIdTab[2] : false;
  const tab = chamberNameIdTab?.length > 3 ? chamberNameIdTab[3] : false;

  const [chamberName, chamberIncumbent] = chamber ? chamber.split('-') : '';
  const isIncumbent = chamberIncumbent === 'i';

  if (id) {
    const api = tgpApi.findCandidate;
    let url = `${api.url}?id=${id}&isIncumbent=${isIncumbent}`;
    if (chamberName) {
      url += `&chamber=${chamberName}`;
    }

    const res = await fetch(url);
    const candidate = await res.json();
    let incumbent = {};

    const { state, district } = candidate || {};
    if (!isIncumbent) {
      if (chamberName === 'presidential') {
        url = tgpApi.districtIncumbent.url;
      } else if (candidate?.chamber === 'Senate') {
        url = `${tgpApi.districtIncumbent.url}?state=${state}`;
      } else {
        url = `${
          tgpApi.districtIncumbent.url
        }?state=${state}&district=${district} `;
      }
      const res2 = await fetch(url);
      incumbent = await res2.json();
      incumbent = incumbent.incumbent;
    }

    return {
      props: {
        ssrState: {
          candidate,
          chamber,
          id,
          isIncumbent,
          tab,
          incumbent,
        },
      }, // will be passed to the page component as props
    };
  }
  return {
    props: {},
  };
}
