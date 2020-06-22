import ENV from './ENV';
// let base = 'http://localhost:1337/api/v1/';
let base = 'https://api-dev.thegoodparty.org/api/v1/';
if (ENV === 'dev') {
  base = 'https://api-dev.thegoodparty.org/api/v1/';
} else if (ENV === 'prod') {
  base = 'https://api.thegoodparty.org/api/v1/';
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
  findCandidate: {
    url: `${base}candidates/find`,
    method: 'GET',
  },
  findBlocCandidate: {
    url: `${base}candidates/find-by-bloc`,
    method: 'GET',
  },

  //
  // CONTENT
  //
  content: {
    url: `${base}content/all-content`,
    method: 'GET',
  },
  articleFeedback: {
    url: `${base}content/article-feedback`,
    method: 'POST',
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

  socialLogin: {
    url: `${base}entrance/social-login`,
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

  rankCandidate: {
    url: `${base}user/rank-candidate`,
    method: 'POST',
    withAuth: true,
  },

  deleteCandidateRanking: {
    url: `${base}user/rank-candidate`,
    method: 'DELETE',
    withAuth: true,
  },

  deleteAllUserRankings: {
    url: `${base}user/delete-user-ranking`,
    method: 'PUT',
    withAuth: true,
  },

  uploadAvatar: {
    url: `${base}user/upload-avatar`,
    method: 'PUT',
    withAuth: true,
  },

  crew: {
    url: `${base}user/crew`,
    method: 'GET',
    withAuth: true,
  },

  userRanking: {
    url: `${base}user/ranking`,
    method: 'GET',
    withAuth: true,
  },

  /*
   * SCRAPE
   */

  scrapeIncumbents: {
    url: `${base}incumbent/to-scrape`,
    method: 'GET',
  },

  scrapeAllCandidates: {
    url: `${base}race-candidate/all`,
    method: 'GET',
  },

  // General
  sendAma: {
    url: `${base}notifications/email-ama`,
    method: 'POST',
  },

  // admin
  admin: {
    candidates: {
      url: `${base}admin/candidates`,
      method: 'GET',
      withAuth: true,
    },
    updateCandidate: {
      url: `${base}admin/candidate`,
      method: 'PUT',
      withAuth: true,
    },
    allUsers: {
      url: `${base}admin/users`,
      method: 'GET',
      withAuth: true,
    },
    articlesFeedback: {
      url: `${base}admin/articles-feedback`,
      method: 'GET',
      withAuth: true,
    },
  },

  creator: {
    message: {
      url: `${base}creators/engagement-email`,
      method: 'POST',
      withAuth: true,
    }
  }
};
export default api;
