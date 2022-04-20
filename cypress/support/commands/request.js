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
import { api, base } from '../../constants';
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
  
Cypress.Commands.add('getHomepageCandidates', () => {
    cy.sendRequest(api.homepageCandidates.method, api.homepageCandidates.url);
});

Cypress.Commands.add('getCandidate', (candidateId) => {
  cy.sendRequest(api.newCandidate.find.method, `${api.newCandidate.find.url}?id=${candidateId}&allFields=true`);
});

Cypress.Commands.add('getCandidateSupports', (candidateId) => {
  cy.sendRequest(api.supportCandidate.candidateSupports.method, `${api.supportCandidate.candidateSupports.url}?candidateId=${candidateId}`);
});

Cypress.Commands.add('getCandidatePageData', async (candidateId) => {
  const candidate = await promisify(
    cy.getCandidate().then(response => response.body),
  );
  const { candidateSupports, total } = await promisify(
    cy.getCandidateSupports().then(response => response.body),
  );
  return {
    candidate: candidate.candidate,
    candidatePositions: candidate.candidatePositions || [],
    similarCampaigns: candidate.similarCampaigns || [],
    id: candidateId,
    candidateSupports,
    supportCount: total,
  }
});
