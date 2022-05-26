import promisify from 'cypress-promise';

let candidates;
describe('CandidatesPage', () => {
    beforeEach(() => {
        cy.visit('/candidates');
    });
    it('test Site Header', () => {
        cy.testSiteHeader();
    });
    it('test Site Footer', () => {
        cy.testSiteFooter();
    });
    it('load Candidates', async () => {
        const content = await promisify(
        cy.getCandidateList().then(response => response.body),
        );
        ({candidates} = content);
        console.log(content);
    });
    it('test Top Section', () => {
        cy.get('[data-cy=candidates-top-section-title]')
        .contains('Good Certified Candidates are...');
        cy.get('[data-cy=certified-badge]')
        .should('have.attr', 'src', '/images/certified-black.svg');
        cy.get('[data-cy=candidates-top-section-subtitle]')
        .contains('FROM ACROSS THE POLITICAL SPECTRUM');
        cy.get('[data-cy=candidates-article-link]')
        .should('have.attr', 'href', '/candidates?article=FqZOWMEEYfcXbASjaRkMU');
        cy.get('[data-cy=candidates-article-link-label]')
        .contains('Why is this important?');
        cy.get('[data-cy=candidates-run-link]')
        .should('have.attr', 'href', '/run');
        cy.get('[data-cy=candidates-run-link-label]')
        .contains('Want to Run for Office?');
    });
    it('test Candidates Section', () => {
        cy.get('[data-cy=candidate-card]')
        .should('have.length', candidates.length)
        .each(($el, index) => {
            cy.testCandidateCard($el, candidates[index]);
        });
    });
});
