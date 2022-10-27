import Container from '/containers/entrance/RegisterPage';
export default function Page() {
  return <Container />;
}

export async function getServerSideProps(context) {
  // x-real-ip
  // const ip = req.connection.remoteAddress

  const { res } = context;
  res.setHeader('Location', '/?register=true');
  res.statusCode = 301;
  res.end();
  return {
    props: {},
  };
}
