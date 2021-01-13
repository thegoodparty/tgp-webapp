// import { candidateRoute } from '../app/helpers/electionsHelper';
// import apiHelper from '../app/helpers/apiHelper';
const { default: Axios } = require('axios');
const path = require('path');
const fs = require('fs');

const loadContent = async () => {
  try {
    const response = await Axios.get(
      'https://api-dev.thegoodparty.org/api/v1/content/all-content',
    );
    const template = `const content = ${JSON.stringify(response.data, null, 2)};
      export default content;`;
    fs.writeFileSync(
      path.join(__dirname, '../containers/App/content.js'),
      template,
      {
        encoding: 'utf8',
        flag: 'w',
      },
    );
  } catch (e) {
    console.log('error at generateSiteMapXML', e);
    return '';
  }
};
loadContent();
