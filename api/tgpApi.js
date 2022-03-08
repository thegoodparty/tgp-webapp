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

  confirmCode: {
    url: `${base}user/confirm`,
    method: 'PUT',
    withAuth: true,
  },

  confirmCodeLogin: {
    url: `${base}user/confirm/login`,
    method: 'PUT',
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

  loginStep1: {
    url: `${base}entrance/login-step1`,
    method: 'PUT',
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
  createCrew: {
    url: `${base}user/crew`,
    method: 'POST',
    withAuth: true,
  },

  leaderboard: {
    url: `${base}user/leaderboard`,
    method: 'GET',
    withAuth: true,
  },

  changePassword: {
    url: `${base}user/password`,
    method: 'PUT',
    withAuth: true,
  },

  addPassword: {
    url: `${base}user/password`,
    method: 'POST',
    withAuth: true,
  },

  refreshToken: {
    url: `${base}user/token-refresh`,
    method: 'PUT',
    withAuth: true,
  },

  deleteAccount: {
    url: `${base}user`,
    method: 'DELETE',
    withAuth: true,
  },

  // General
  sendAma: {
    url: `${base}notifications/email-ama`,
    method: 'POST',
  },
  sendFeedback: {
    url: `${base}notifications/feedback`,
    method: 'POST',
    withAuth: true,
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
    releases: {
      create: {
        url: `${base}release`,
        method: 'POST',
        withAuth: true,
      },
      update: {
        url: `${base}release`,
        method: 'PUT',
        withAuth: true,
      },
      delete: {
        url: `${base}release`,
        method: 'DELETE',
        withAuth: true,
      },
      list: {
        url: `${base}releases`,
        method: 'GET',
        withAuth: true,
      },
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
    issueTopics: {
      create: {
        url: `${base}issue-topic`,
        method: 'POST',
        withAuth: true,
      },
      update: {
        url: `${base}issue-topic`,
        method: 'PUT',
        withAuth: true,
      },
      delete: {
        url: `${base}issue-topic`,
        method: 'DELETE',
        withAuth: true,
      },
      list: {
        url: `${base}issue-topics`, // non admin
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
    createCampaignUpdate: {
      url: `${base}new-candidate/campaign-update`,
      method: 'POST',
      withAuth: true,
    },
    saveCampaignUpdate: {
      url: `${base}new-candidate/campaign-update`,
      method: 'PUT',
      withAuth: true,
    },
    deleteCampaignUpdate: {
      url: `${base}new-candidate/campaign-update`,
      method: 'DELETE',
      withAuth: true,
    },
    approveUpdate: {
      url: `${base}new-candidate/approve-update`, // admin
      method: 'PUT',
      withAuth: true,
    },
  },
  trackVisit: {
    url: `${base}visit`,
    method: 'POST',
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
    supportUpdates: {
      url: `${base}support-updates`,
      method: 'GET',
      withAuth: true,
    },
    candidateSupports: {
      url: `${base}candidate-supports`,
      method: 'GET',
    },
  },
  campaign: {
    find: {
      url: `${base}campaign`,
      method: 'GET',
      withAuth: true,
    },
    stats: {
      url: `${base}campaign/stats`,
      method: 'GET',
      withAuth: true,
    },
    updateRequest: {
      create: {
        url: `${base}campaign/update-request`,
        method: 'POST',
        withAuth: true,
      },
    },
    endorsement: {
      create: {
        url: `${base}campaign/endorsement`,
        method: 'POST',
        withAuth: true,
      },
      list: {
        url: `${base}campaign/endorsements`,
        method: 'GET',
        withAuth: true,
      },
    },
    image: {
      create: {
        url: `${base}campaign/image`,
        method: 'POST',
        withAuth: true,
      },
    },
    staff: {
      userStaff: {
        url: `${base}user/staff`,
        method: 'GET',
        withAuth: true,
      },
      create: {
        url: `${base}campaign/staff`,
        method: 'POST',
        withAuth: true,
      },
      update: {
        url: `${base}campaign/staff`,
        method: 'PUT',
        withAuth: true,
      },
      delete: {
        url: `${base}campaign/staff`,
        method: 'DELETE',
        withAuth: true,
      },
      role: {
        url: `${base}campaign/staff-role`,
        method: 'GET',
        withAuth: true,
      },
      list: {
        url: `${base}campaign/staff`,
        method: 'GET',
        withAuth: true,
      },
    },
    ugc: {
      find: {
        url: `${base}ugc`,
        method: 'GET',
        withAuth: true,
      },
      update: {
        url: `${base}ugc`,
        method: 'PUT',
        withAuth: true,
      },

      list: {
        // admin
        url: `${base}ugcs`,
        method: 'GET',
        withAuth: true,
      },

      accept: {
        // admin
        url: `${base}ugcs/accept`,
        method: 'PUT',
        withAuth: true,
      },

      reject: {
        // admin
        url: `${base}ugcs/reject`,
        method: 'PUT',
        withAuth: true,
      },
    },

    notification: {
      find: {
        url: `${base}campaign/notification`,
        method: 'GET',
        withAuth: true,
      },
      update: {
        url: `${base}campaign/notification`,
        method: 'PUT',
        withAuth: true,
      },
    },
  },
  candidateUser: {
    issue: {
      find: {
        url: `${base}candidate-issue`,
        method: 'GET',
        withAuth: true,
      },
      update: {
        url: `${base}candidate-issue`,
        method: 'PUT',
        withAuth: true,
      },
      list: {
        // admin
        url: `${base}candidate-issue/pending`,
        method: 'GET',
        withAuth: true,
      },

      accept: {
        // admin
        url: `${base}candidate-issue/accept`,
        method: 'PUT',
        withAuth: true,
      },

      reject: {
        // admin
        url: `${base}candidate-issue/reject`,
        method: 'PUT',
        withAuth: true,
      },
    },

    updateRequest: {
      create: {
        url: `${base}candidate-user/update-request`,
        method: 'POST',
        withAuth: true,
      },
    },
  },
  jobUpdates: {
    create: {
      url: `${base}updates`,
      method: 'POST',
    },
  },

  candidateApplication: {
    create: {
      url: `${base}application`,
      method: 'POST',
      withAuth: true,
    },
    delete: {
      url: `${base}application`,
      method: 'DELETE',
      withAuth: true,
    },
    list: {
      url: `${base}applications`,
      method: 'GET',
      withAuth: true,
    },
    find: {
      url: `${base}application`,
      method: 'GET',
      withAuth: true,
    },
    update: {
      url: `${base}application`,
      method: 'PUT',
      withAuth: true,
    },
    submit: {
      url: `${base}application/submit`,
      method: 'POST',
      withAuth: true,
    },
    uploadImage: {
      url: `${base}application/upload-image`,
      method: 'POST',
      withAuth: true,
    },

    adminList: {
      url: `${base}applications/in-review`,
      method: 'GET',
      withAuth: true,
    },

    adminApprove: {
      url: `${base}applications/approve`,
      method: 'PUT',
      withAuth: true,
    },

    adminReject: {
      url: `${base}applications/reject`,
      method: 'PUT',
      withAuth: true,
    },
  },
};
export default api;
