import promisify from 'cypress-promise';
import { ThemeProvider as UiThemeProvider } from '@material-ui/styles';
import { ThemeProvider } from 'styled-components';
import CandidateCard from '../../../components/shared/CandidateCard';
import theme from '../../../theme';

const sampleCandidateList = [36, 30, 43];

const Component = (props) => (
    <UiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CandidateCard {...props} />
      </ThemeProvider>
    </UiThemeProvider>
)
context('CandidateCard.cy.js', () => {
  let candidate;
  sampleCandidateList.forEach(candidateId => {
    describe(`check candidate card - ${candidateId}`, () => {
      it(`loads candidate data`, async () => {
          candidate = await promisify(
              cy.getCandidate(candidateId).then(response => response.body),
          );
          candidate = candidate.candidate;
      });
      it(`should render card without follow button`, () => {
        cy.mount(
          <Component 
            candidate={candidate}
          />
        );
        const {
          id,
          firstName,
          lastName,
          positions,
        } = candidate;
        cy.get('[data-cy="candidate-link"]')
          .should('have.attr', 'href', `/candidate/${firstName.replace(' ', '%20')}-${lastName.replace(' ', '%20')}/${id}`);
        cy.get('[data-cy="candidate-name"]')
          .should('contain', firstName)
          .contains(lastName);
        if(positions) {
          cy.get('[data-cy=position]')
          .should('have.length', positions.length) 
          .each(($el, index) => {
            cy.wrap($el)
              .contains(positions[index].name);
          });
        }
        cy.get('[data-cy="candidate-view"]')
          .contains('View');
      });
    });
  });
})