import ENV from './ENV';
let base = 'http://localhost:1337/api/v1/';
if (ENV === 'dev') {
  base = 'https://api-dev.thegoodparty.org/api/v1/';
}

const api = {
  base,
  //
  // DISTRICT
  //

  allPresidential: {
    url: `${base}presidential/all`,
    method: 'GET',
  },
  districtIncumbent: {
    url: `${base}incumbent/find-by-district`,
    method: 'GET',
  },
  houseCandidates: {
    url: `${base}race-candidate/house-by-district`,
    method: 'GET',
  },
  senateCandidates: {
    url: `${base}race-candidate/senate-by-state`,
    method: 'GET',
  },
  fullAddressToDistrict: {
    url: `${base}entrance/address-to-district`,
    method: 'GET',
  },
  userCounts: {
    url: `${base}counts/user-counts`,
    method: 'GET',
  },
  //
  // CONTENT
  //
  content: {
    url: `${base}content/all-content`,
    method: 'GET',
  },
  findCandidate: {
    url: `${base}candidates/find`,
    method: 'GET',
  },
  //
  // ENTRANCE
  //
  register: {
    url: `${base}entrance/register`,
    method: 'POST',
  },

  resendEmail: {
    url: `${base}entrance/resend-verify-email`,
    method: 'GET',
  },

  confirmEmail: {
    url: `${base}entrance/confirm-email`,
    method: 'PUT',
  },

  zipToDistrict: {
    url: `${base}entrance/zip-to-district`,
    method: 'GET',
  },

  login: {
    url: `${base}entrance/login`,
    method: 'PUT',
  },
  //
  // USER
  //
  updateAddress: {
    url: `${base}user/update-address`,
    method: 'PUT',
    withAuth: true,
  },

  updateUser: {
    url: `${base}user/update-user`,
    method: 'PUT',
    withAuth: true,
  },

  updateUserRanking: {
    url: `${base}user/update-user-ranking`,
    method: 'PUT',
    withAuth: true,
  },

  /*
   * SCRAPE
   */

  scrapeIncumbents: {
    url: `${base}incumbent/to-scrape`,
    method: 'GET',
    withAuth: true,
  },

  // General
  sendAma: {
    url: `${base}notifications/email-ama`,
    method: 'POST',
  },
};
export default api;
