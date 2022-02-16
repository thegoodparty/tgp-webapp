import Page from '/containers/profile/ProfilePage';

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
