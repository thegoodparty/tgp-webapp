// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import { api, base, TOKEN } from '../../constants';
import promisify from 'cypress-promise';

Cypress.Commands.add(
    'sendRequest',
    (method, url, data = null, token = null) => {
      if ((method === 'GET' || method === 'DELETE') && data) {
        url = `${url}?`;
        Object.keys(data).forEach(key => {
          url += `${key}=${data[key]}&`;
        });
        url = url.slice(0, -1);
      }
      let body = null;
      if ((method === 'POST' || method === 'PUT') && data) {
        body = JSON.stringify(data);
      }
      const options = { method, url, body };
      if (token) {
        options.auth = {
          bearer: token,
        };
      }
      cy.request(options);
    },
  );
Cypress.Commands.add('getFaqArticles', () => {
  cy.sendRequest(
    api.contentByKey.method,
    `${api.contentByKey.url}?key=articleCategories`
  );
});
Cypress.Commands.add('getPrivacyPageContent', () => {
  cy.sendRequest(
    api.contentByKey.method,
    `${api.contentByKey.url}?key=privacyPage`
  );
});
Cypress.Commands.add('getHomepageCandidates', () => {
  cy.sendRequest(
    api.homepageCandidates.method,
    api.homepageCandidates.url
  );
});
Cypress.Commands.add('getCandidateList', () => {
  cy.sendRequest(
    api.newCandidate.list.method,
    api.newCandidate.list.url
  );
});
Cypress.Commands.add('getHomepageFeed', () => {
  cy.sendRequest(
    api.feed.method,
    `${api.feed.url}?searchId=2bade780970fd5134f8bd216b568bc8e&limit=4&useCache=true&save=true`
  );
});
Cypress.Commands.add('getHomepageFollwers', () => {
  cy.sendRequest(
    api.followers.method,
    api.followers.url
  );
});
Cypress.Commands.add('getHomepageCandidates', () => {
  cy.sendRequest(
    api.homepageCandidates.method,
    api.homepageCandidates.url
  );
});
Cypress.Commands.add('getCandidate', (candidateId) => {
  cy.sendRequest(
    api.newCandidate.find.method,
    `${api.newCandidate.find.url}?id=${candidateId}&allFields=true`
  );
});
Cypress.Commands.add('getApplications', () => {
  cy.sendRequest(
    api.candidateApplication.list.method,
    api.candidateApplication.list.url,
    null,
    api.candidateApplication.list.withAuth && TOKEN,
  );
});
Cypress.Commands.add('getStaff', () => {
  cy.sendRequest(
    api.campaign.staff.userStaff.method,
    api.campaign.staff.userStaff.url,
    null,
    api.campaign.staff.userStaff.withAuth && TOKEN,
  );
});
Cypress.Commands.add('getUserSupports', () => {
  cy.sendRequest(
    api.supportCandidate.userSupports.method,
    api.supportCandidate.userSupports.url,
    {
      withCandidates: true,
    },
    api.supportCandidate.userSupports.withAuth && TOKEN,
  );
});
Cypress.Commands.add('getCandidateSupports', (candidateId) => {
  cy.sendRequest(
    api.supportCandidate.candidateSupports.method, 
    `${api.supportCandidate.candidateSupports.url}?candidateId=${candidateId}`
  );
});

Cypress.Commands.add('getCandidatePageData', async (candidateId) => {
  const candidate = await promisify(
    cy.getCandidate().then(response => response.body),
  );

  return {
    candidate: candidate.candidate,
    candidatePositions: candidate.candidatePositions || [],
    similarCampaigns: candidate.similarCampaigns || [],
    id: candidateId,
  }
});

Cypress.Commands.add('getCandidatesPageData', async (candidateId) => {
  const { candidates, positions, positionsByTopIssues, states } = await promisify(
    cy.getCandidateList().then(response => response.body),
  );
  return {
    candidates,
    positions,
    positionsByTopIssues,
    states,
  }
});
Cypress.Commands.add('getCampaignStats', (range, id) => {
  cy.sendRequest(
    api.campaign.stats.method, 
    api.campaign.stats.url,
    {
      range,
      id
    },
    api.campaign.stats.withAuth && TOKEN,
  );
});

Cypress.Commands.add('getCampaignCandidate', (id) => {
  cy.sendRequest(
    api.campaign.find.method, 
    api.campaign.find.url,
    {
      id
    },
    api.campaign.find.withAuth && TOKEN,
  );
});

Cypress.Commands.add('getCampaignCandidatePositions', (id) => {
  cy.sendRequest(
    api.campaign.candidatePosition.list.method, 
    api.campaign.candidatePosition.list.url,
    {
      id
    },
    api.campaign.candidatePosition.list.withAuth && TOKEN,
  );
});

Cypress.Commands.add('getEndorsements', (id) => {
  cy.sendRequest(
    api.campaign.endorsement.list.method, 
    api.campaign.endorsement.list.url,
    {
      candidateId: id
    },
    api.campaign.endorsement.list.withAuth && TOKEN,
  );
});

Cypress.Commands.add('getCampaignStaff', (id) => {
  cy.sendRequest(
    api.campaign.staff.list.method, 
    api.campaign.staff.list.url,
    {
      id
    },
    api.campaign.staff.list.withAuth && TOKEN,
  );
});