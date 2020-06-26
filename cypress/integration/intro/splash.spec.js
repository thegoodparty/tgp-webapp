describe('Splash', () => {
    beforeEach(() => {
        cy.visit('/intro/splash');
    });
    it('finds correct text', () => {
        cy.get('[data-cy=title]').contains('THE GOOD PARTY');
        cy.get('[data-cy=subtitle]').contains('FIXING POLITICS FOR GOOD');
    });
    it('finds correct cards', () => {
        cy.get('[data-cy=card-item]').should('have.length', 3)
        cy.get('[data-cy=card-icon]').should('have.length', 3)

        const titleList = [
            'See Good Candidates',
            'Join Voting Blocs',
            'Never Waste Your Vote'
        ];
        cy.get('[data-cy=card-title]')
            .should('have.length', 3)
            .each(($el, index) => {
                cy.wrap($el).contains(titleList[index])
            })

        const textList = [
            'See good grass-roots candidates who are challenging',
            'Privately join candidate voting blocs to be notified if any bloc grows big enough to win',
            'We only activate a candidate bloc vote',
        ]
        cy.get('[data-cy=card-text]')
            .should('have.length', 3)
            .each(($el, index) => {
                cy.wrap($el).contains(textList[index])
            })
    });
    it('finds correct link to zip finder', () => {
        cy.get('[data-cy=start-link]')
            .should('have.attr', 'href', '/intro/zip-finder')
            .get('[data-cy=start-button]')
            .contains('GET STARTED');
    });
});
