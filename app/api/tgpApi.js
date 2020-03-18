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
  districtIncumbents: {
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
  //
  // CONTENT
  //
  content: {
    url: `${base}content/all-content`,
    method: 'GET',
  },
  findPresidentialCandidate: {
    url: `${base}presidential/find`,
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

  // General
  sendAma: {
    url: `${base}notifications/email-ama`,
    method: 'POST',
  },
};
export default api;
