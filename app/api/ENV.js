let ENV; // local, dev, qa, prod
const host = window.location.host;
if (host === 'localhost:4000') {
  ENV = 'local';
} else if (host === 'dev.thegoodparty.org') {
  ENV = 'dev';
} else if (host === 'thegoodparty.org') {
  ENV = 'prod';
} else {
  ENV = 'prod';
}
export default ENV;
