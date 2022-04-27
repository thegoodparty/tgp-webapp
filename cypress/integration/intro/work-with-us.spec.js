import { CONTACT_EMAIL, HOW_WORKS_SECTIONS, JOIN_FORM_LINK, UPDATE_FORM_NOTIFICATIONS } from '../../../utils/constants';

describe('Work With Us Page', () => {
  it('test Top Section', () => {
    cy.visit('/work-with-us');
    cy.get('[data-cy=wwu-title]')
      .contains('Work With Us');
    cy.get('[data-cy=waw-title]')
      .contains('Who Are We?');
    cy.get('[data-cy=waw-content]')
      .contains('Good Party is a fully-funded startup organized as a Public Benefit');
    cy.get('[data-cy=team-link]')
      .should('have.attr', 'href', '/team');
  });
  it('test Site Header', () => {
    cy.testSiteHeader();
  });
  it('test Site Footer', () => {
    cy.testSiteFooter();
  });
  it('test LeverCareers Section', () => {
    cy.get('[data-cy=opening-title]')
      .contains('Openings');
    cy.get('[data-cy=opening-content]')
      .contains('Beyond these open positions for our core team, there are many ways');
    cy.get('[data-cy=waw-content]')
      .contains('Good Party is a fully-funded startup organized as a Public Benefit');
    cy.get('[data-cy=opening-form-link]')
      .should('have.attr', 'href', JOIN_FORM_LINK);
    cy.get('[data-cy=opening-contact-email]')
      .should('have.attr', 'href', `mailto:${CONTACT_EMAIL}`)
      .contains(CONTACT_EMAIL);
  });
  it('test UpdatesForm Section', () => {
    cy.get('[data-cy=update-form-question]')
      .contains('Nothing available that matches your skill set?');
    cy.get('[data-cy=update-form-title]')
      .contains('Sign up for future updates');
    cy.get('[data-cy=notification]')
      .should('have.length', UPDATE_FORM_NOTIFICATIONS.length)
      .each(($el, index) => {
        cy.wrap($el)
          .contains(UPDATE_FORM_NOTIFICATIONS[index].label);
      });
  });
});
