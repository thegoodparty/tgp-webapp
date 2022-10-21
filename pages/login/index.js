import LoginPage from '/containers/entrance/LoginPage';
export default function Login() {
  return <LoginPage />;
}

export async function getServerSideProps(context) {
  // x-real-ip
  // const ip = req.connection.remoteAddress

  const { res } = context;
  res.setHeader('Location', '/?login=true');
  res.statusCode = 301;
  res.end();
  return {
    props: {},
  };
}
