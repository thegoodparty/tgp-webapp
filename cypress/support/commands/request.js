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

Cypress.Commands.add('sendRequest', (method, url, data = null) => {
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
  cy.request(method, url, body);
});

Cypress.Commands.add('getCMSContent', () => {
  cy.sendRequest(api.content.method, api.content.url).should(response => {
    cy.writeFile('cypress/fixtures/content.json', response.body);
  });
});

Cypress.Commands.add('getDistrictData', zip => {
  // call zip-to-district api
  cy.sendRequest(api.zipToDistrict.method, api.zipToDistrict.url, {
    zip,
  });
});

Cypress.Commands.add('getPresidentialCandidateData', (zip = null) => {
  cy.sendRequest(
    api.allPresidential.method,
    api.allPresidential.url,
    zip && {
      zip,
    },
  );
});

Cypress.Commands.add('getSenateCandidateData', state => {
  cy.sendRequest(api.senateCandidates.method, api.senateCandidates.url, {
    state,
  });
});

Cypress.Commands.add('getHouseCandidateData', (state, district) => {
  // call zip-to-district api
  cy.sendRequest(api.houseCandidates.method, api.houseCandidates.url, {
    state,
    district,
  });
});
