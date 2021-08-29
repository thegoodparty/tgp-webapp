import apiHelper from '../helpers/apiHelper';
const base = apiHelper.apiBase;
const api = {
  base,
  //
  // DISTRICT
  //

  homepageCandidates: {
    url: `${base}homepage-candidates`,
    method: 'GET',
  },

  findCandidate: {
    url: `${base}candidates/find`,
    method: 'GET',
  },

  //
  // CONTENT
  //
  content: {
    url: `${base}content/all-content`,
    method: 'GET',
  },
  landingPageContent: {
    url: `${base}content/landing-page`,
    method: 'GET',
  },
  contentByKey: {
    url: `${base}content/content-by-key`,
    method: 'GET',
  },
  articleFeedback: {
    url: `${base}content/article-feedback`,
    method: 'POST',
  },
  topicFeedback: {
    url: `${base}content/topic-feedback`,
    method: 'POST',
  },
  //
  // ENTRANCE
  //
  register: {
    url: `${base}entrance/register`,
    method: 'POST',
  },
  createCrew: {
    url: `${base}entrance/crew`,
    method: 'POST',
    withAuth: true,
  },
  confirmCode: {
    url: `${base}user/confirm`,
    method: 'PUT',
    withAuth: true,
  },
  sendCode: {
    url: `${base}user/confirm`,
    method: 'POST',
    withAuth: true,
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

  forgotPassword: {
    url: `${base}entrance/send-password-recovery-email`,
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

  uploadAvatar: {
    url: `${base}user/avatar`,
    method: 'POST',
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

  refreshToken: {
    url: `${base}user/token-refresh`,
    method: 'PUT',
    withAuth: true,
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
    associateCandidateUser: {
      url: `${base}admin/candidate-user`,
      method: 'PUT',
      withAuth: true,
    },
    findAssociateUser: {
      url: `${base}admin/candidate-user`,
      method: 'GET',
      withAuth: true,
    },
    removeAssociateUser: {
      url: `${base}admin/candidate-user`,
      method: 'DELETE',
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
    deleteUser: {
      url: `${base}admin/user`,
      method: 'DELETE',
      withAuth: true,
    },
    articlesFeedback: {
      url: `${base}admin/articles-feedback`,
      method: 'GET',
      withAuth: true,
    },
    topicsFeedback: {
      url: `${base}admin/topics-feedback`,
      method: 'GET',
      withAuth: true,
    },
    voterize: {
      url: `${base}admin/voterize`,
      method: 'GET',
      withAuth: true,
    },
    updateVoterize: {
      url: `${base}admin/voterize`,
      method: 'PUT',
      withAuth: true,
    },
    deleteUpdate: {
      url: `${base}admin/candidate-update`,
      method: 'DELETE',
      withAuth: true,
    },

    uploadedImages: {
      url: `${base}admin/uploaded-images`,
      method: 'POST',
      withAuth: true,
    },
    uploadImage: {
      url: `${base}admin/upload-image`,
      method: 'POST',
      withAuth: true,
    },
    topics: {
      create: {
        url: `${base}compare-topic`,
        method: 'POST',
        withAuth: true,
      },
      update: {
        url: `${base}compare-topic`,
        method: 'PUT',
        withAuth: true,
      },
      delete: {
        url: `${base}compare-topic`,
        method: 'DELETE',
        withAuth: true,
      },
      list: {
        url: `${base}compare-topics`,
        method: 'GET',
        withAuth: true,
      },
    },
  },
  newCandidate: {
    create: {
      url: `${base}new-candidate`,
      method: 'POST',
      withAuth: true,
    },
    find: {
      url: `${base}new-candidate`,
      method: 'GET',
      withAuth: true,
    },
    findInactive: {
      url: `${base}new-candidate-inactive`,
      method: 'GET',
      withAuth: true,
    },
    findWithInactive: {
      url: `${base}new-candidate-with-inactive`,
      method: 'GET',
    },
    list: {
      url: `${base}new-candidates`,
      method: 'GET',
    },
    update: {
      url: `${base}new-candidate`,
      method: 'PUT',
      withAuth: true,
    },
    deleteCandidate: {
      url: `${base}new-candidate`,
      method: 'DELETE',
      withAuth: true,
    },
    shareImage: {
      url: `${base}new-candidate/share-image`,
      method: 'POST',
    },
    trackShare: {
      url: `${base}new-candidate/share`,
      method: 'POST',
      withAuth: true,
    },
    trackGuestShare: {
      url: `${base}new-candidate/share-guest`,
      method: 'POST',
    },
    updateImage: {
      url: `${base}new-candidate/image`,
      method: 'PUT',
      withAuth: true,
    },
    updateComparedCandidates: {
      url: `${base}new-candidate/compared`,
      method: 'PUT',
      withAuth: true,
    },
  },
  subscribeEmail: {
    url: `${base}subscribe/email`,
    method: 'GET',
  },
  verifyVote: {
    url: `${base}voterize/verify-vote`,
    method: 'GET',
    withAuth: true,
  },
  registerVote: {
    url: `${base}voterize/register-vote`,
    method: 'GET',
    withAuth: true,
  },

  supportCandidate: {
    support: {
      url: `${base}support`,
      method: 'POST',
      withAuth: true,
    },
    removeSupport: {
      url: `${base}support`,
      method: 'DELETE',
      withAuth: true,
    },
    adminDeleteSupport: {
      url: `${base}admin-support`,
      method: 'DELETE',
      withAuth: true,
    },
    updateSupport: {
      url: `${base}support`,
      method: 'PUT',
      withAuth: true,
    },
    userSupports: {
      url: `${base}supports`,
      method: 'GET',
      withAuth: true,
    },
    candidateSupports: {
      url: `${base}candidate-supports`,
      method: 'GET',
    },
  },
  candidateUser: {
    find: {
      url: `${base}candidate-user`,
      method: 'GET',
      withAuth: true,
    },
  },
};
export default api;
