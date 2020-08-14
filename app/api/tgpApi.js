import { apiBase } from 'helpers/apiHelper';

const api = {
  base: apiBase,
  //
  // DISTRICT
  //

  allPresidential: {
    url: `${apiBase}presidential/all`,
    method: 'GET',
  },
  districtIncumbent: {
    url: `${apiBase}incumbent/find-by-district`,
    method: 'GET',
  },
  houseCandidates: {
    url: `${apiBase}race-candidate/house-by-district`,
    method: 'GET',
  },
  senateCandidates: {
    url: `${apiBase}race-candidate/senate-by-state`,
    method: 'GET',
  },
  fullAddressToDistrict: {
    url: `${apiBase}entrance/address-to-district`,
    method: 'GET',
  },
  userCounts: {
    url: `${apiBase}counts/user-counts`,
    method: 'GET',
  },
  findCandidate: {
    url: `${apiBase}candidates/find`,
    method: 'GET',
  },
  findBlocCandidate: {
    url: `${apiBase}candidates/find-by-bloc`,
    method: 'GET',
  },

  //
  // CONTENT
  //
  content: {
    url: `${apiBase}content/all-content`,
    method: 'GET',
  },
  articleFeedback: {
    url: `${apiBase}content/article-feedback`,
    method: 'POST',
  },

  //
  // ENTRANCE
  //
  register: {
    url: `${apiBase}entrance/register`,
    method: 'POST',
  },

  resendEmail: {
    url: `${apiBase}entrance/resend-verify-email`,
    method: 'GET',
  },

  confirmEmail: {
    url: `${apiBase}entrance/confirm-email`,
    method: 'PUT',
  },

  zipToDistrict: {
    url: `${apiBase}entrance/zip-to-district`,
    method: 'GET',
  },

  login: {
    url: `${apiBase}entrance/login`,
    method: 'PUT',
  },

  forgotPassword: {
    url: `${apiBase}entrance/send-password-recovery-email`,
    method: 'POST',
  },

  resetPassword: {
    url: `${base}entrance/reset-password`,
    method: 'PUT',
  },

  socialLogin: {
    url: `${base}entrance/social-login`,
    method: 'PUT',
  },

  twitterLogin: {
    url: `${base}entrance/twitter-login`,
    method: 'PUT',
  },

  confirmTwitterCallback: {
    url: `${base}entrance/twitter-confirm`,
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

  leaderboard: {
    url: `${base}user/leaderboard`,
    method: 'GET',
    withAuth: true,
  },

  userRanking: {
    url: `${base}user/ranking`,
    method: 'GET',
    withAuth: true,
  },

  changePassword: {
    url: `${base}user/change-password`,
    method: 'PUT',
    withAuth: true,
  },

  addPassword: {
    url: `${base}user/add-password`,
    method: 'POST',
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

  logError: {
    url: `${base}notifications/log-error`,
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
    updateCandidateImage: {
      url: `${base}admin/candidate-image`,
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
    },
  },

  directory: {
    allCandidates: {
      url: `${base}candidates/all`,
      method: 'GET',
    },
  },
};
export default api;
