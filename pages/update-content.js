import { promises as fs } from 'fs';
import path from 'path';
import tgpApi from '/api/tgpApi';

export default function UpdateContent() {
  return <div>updated</div>;
}

export async function getServerSideProps() {
  const api = tgpApi.content;
  const res = await fetch(api.url);

  const response = await res.json();
  const template = `const content = ${JSON.stringify(response, null, 2)};
      export default content;`;

  const appDir = path.join(process.cwd(), '/containers/App/');
  const filePath = path.join(appDir, 'content.js');

  await fs.writeFile(filePath, template, {
    encoding: 'utf8',
    flag: 'w',
  });
  const content = await fs.readFile(filePath, 'utf8');
  return {
    props: {  },
  };
}
