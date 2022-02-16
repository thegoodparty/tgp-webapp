import Page from '/containers/profile/LeaderboardPage';

export default function You() {
  return <Page />;
}
//
// export async function getServerSideProps(context) {
//   const cookies = context.req ? context.req.headers.cookie : undefined;
//   console.log('cookies', cookies);
//   return {
//     props: { cookies },
//   };
// }
