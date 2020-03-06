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
    url: base + 'presidential/all',
    method: 'GET',
  },
  districtIncumbents: {
    url: base + 'incumbent/find-by-district',
    method: 'GET',
  },
  districtCandidates: {
    url: base + 'race-candidate/find-by-district',
    method: 'GET',
  },
  //
  // CONTENT
  //
  content: {
    url: base + 'content/all-content',
    method: 'GET',
  },
  findPresidentialCandidate: {
    url: base + 'presidential/find',
    method: 'GET',
  },
  //
  // ENTRANCE
  //
  register: {
    url: base + 'entrance/register',
    method: 'POST',
  },

  resendEmail: {
    url: base + 'entrance/resend-verify-email',
    method: 'GET',
  },

  confirmEmail: {
    url: base + 'entrance/confirm-email',
    method: 'PUT',
  },

  zipToDistrict: {
    url: base + 'entrance/zip-to-district',
    method: 'GET',
  },
  //
  // USER
  //
  updateAddress: {
    url: base + 'user/update-address',
    method: 'PUT',
    withAuth: true,
  },
};
export default api;
