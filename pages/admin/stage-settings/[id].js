import Page from 'containers/admin/AdminCandidateStageSettingsPage';
import tgpApi from 'api/tgpApi';

export default function Admin({ ssrState }) {
  return <Page ssrState={ssrState} />;
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  if (id) {
    const api = tgpApi.newCandidate.findWithInactive;
    const url = `${api.url}?id=${id}`;
    const res = await fetch(url);
    const candidate = await res.json();

    return {
      props: {
        ssrState: {
          candidate: candidate.candidate,
        },
      }, // will be passed to the page component as props
    };
  }

  return {
    props: {
      ssrState: {
        candidate: false,
      },
    }, // will be passed to the page component as props
  };
}
