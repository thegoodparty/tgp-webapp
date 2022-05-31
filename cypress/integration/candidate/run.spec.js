import { HOW_WORKS_SECTIONS } from '../../../components/RunWrapper/HowWorksSection';

describe('Run Page', () => {
  it('test Top Section', () => {
    cy.visit('/run');
    cy.get('[data-cy=run-title]').contains('Run as an Indie or 3rd Party.');
    cy.get('[data-cy=run-description]').contains(
      'We’ve made it simple and free like democracy',
    );
    cy.get('[data-cy=campaign-start-button-link]').should(
      'have.attr',
      'href',
      '/campaign-application/guest/1',
    );
    cy.get('[data-cy=campaign-start-button-label]').contains(
      'Start your Campaign',
    );
    cy.get('[data-cy=run-questions]').contains('Have more questions?');
  });
  it('test Site Header', () => {
    cy.testSiteHeader();
  });
  it('test Site Footer', () => {
    cy.testSiteFooter();
  });
  it('test Becoming Section', () => {
    cy.get('[data-cy=becoming-good-certified]').contains(
      'Good Party Free Tools Provide',
    );
    cy.get('[data-cy=becoming-section-1]').contains('Viability');
    cy.get('[data-cy=becoming-section-2]').contains('Insights');
    cy.get('[data-cy=becoming-section-3]').contains('People');
  });
  it('test HowWorks Section', () => {
    HOW_WORKS_SECTIONS;
    cy.get('[data-cy=howworks-title]').contains('How it works');
    cy.get('[data-cy=howworks-box]')
      .should('have.length', HOW_WORKS_SECTIONS.length)
      .each(($el, index) => {
        cy.wrap($el)
          .find('[data-cy=howworks-box-title]')
          .contains(HOW_WORKS_SECTIONS[index].title);
        cy.wrap($el)
          .find('[data-cy=howworks-box-point]')
          .should('have.length', HOW_WORKS_SECTIONS[index].points.length)
          .each(($el1, index1) => {
            cy.wrap($el1)
              .find('[data-cy=howworks-box-point-title]')
              .contains(HOW_WORKS_SECTIONS[index].points[index1].title);
            cy.wrap($el1)
              .find('[data-cy=howworks-box-point-content]')
              .contains(HOW_WORKS_SECTIONS[index].points[index1].content);
          });
      });
  });
});
