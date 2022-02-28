let ENV; // local, dev, qa, prod
export const API_ENV = process.env.API_ENV || 'prod';
if (typeof window !== 'undefined') {
  const { host } = window.location;
  if (host === 'localhost:4000') {
    ENV = 'local';
  } else if (host === 'dev.goodparty.org') {
    ENV = 'dev';
  } else if (host === 'qa.goodparty.org') {
    ENV = 'qa';
  } else if (host === 'goodparty.org') {
    ENV = 'prod';
  } else {
    ENV = 'prod';
  }
} else {
  ENV = 'prod';
}

export const GA_ID = 'UA-146762622-1';

export default ENV;
