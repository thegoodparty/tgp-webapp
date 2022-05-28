import { CONTACT_EMAIL, JOIN_FORM_LINK } from '../../../utils/constants';
import { TEAM_MEMBERS } from '../../../components/TeamWrapper/TeamSection';
import { VOLUNTEERS } from '../../../components/TeamWrapper/VolunteersSection';
describe('Team Page', () => {
  it('load Page', () => {
    cy.visit('/team');
  });
  it('test Site Header', () => {
    cy.testSiteHeader();
  });
  it('test Site Footer', () => {
    cy.testSiteFooter();
  });
  it('test Hero Section', () => {
    cy.get('[data-cy=team-hero-section-title]')
      .contains('Working on creating a Good Party for all!');
    cy.get('[data-cy=team-hero-section-content]')
      .contains('Good Party’s core team are the people working full-time, part-time, or');
    cy.get('[data-cy=team-hero-section-join-link]')
      .should('have.attr', 'href', '/work-with-us')
      .contains('joining us!');
  });
  it('test Team Section', () => {
    cy.get('[data-cy=team-section-tap]')
      .contains('Tap to see our Party side!')
    cy.get('[data-cy=team-section-tap]').click();
    cy.get('[data-cy=team-section-tap]')
      .contains('Tap to see our Good side!')
    cy.get('[data-cy=team-member]')
      .should('have.length', TEAM_MEMBERS.length)
      .each(($el, index) => {
        cy.wrap($el)
          .find('[data-cy=member-name]')
          .contains(TEAM_MEMBERS[index].name);
        cy.wrap($el)
          .find('[data-cy=member-role]')
          .contains(TEAM_MEMBERS[index].role);
        cy.wrap($el)
          .find('[data-cy=member-party-role]')
          .contains(TEAM_MEMBERS[index].partyRole);
      });
  });
  it('test Volunteers Section', () => {
    cy.get('[data-cy=volunteer-section-title]')
      .contains('Volunteers');
    cy.get('[data-cy=volunteer]')
      .should('have.length', VOLUNTEERS.length)
      .each(($el, index) => {
        cy.wrap($el)
          .find('[data-cy=volunteer-name]')
          .should('have.attr', 'href', VOLUNTEERS[index].link)
          .contains(VOLUNTEERS[index].name);
        cy.wrap($el)
          .find('[data-cy=volunteer-role]')
          .contains(VOLUNTEERS[index].role);
      });
    cy.get('[data-cy=join-form]')
      .contains('If you’re interested in volunteering your time and talent, join us!');
    cy.get('[data-cy=join-form-link]')
      .should('have.attr', 'href', JOIN_FORM_LINK)
      .contains('this form');
    cy.get('[data-cy=contact-email-link]')
      .should('have.attr', 'href', `mailto:${CONTACT_EMAIL}`)
      .contains(CONTACT_EMAIL);
  });
});
