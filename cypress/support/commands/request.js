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
  