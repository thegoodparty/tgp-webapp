import promisify from 'cypress-promise';
import { ThemeProvider as UiThemeProvider } from '@material-ui/styles';
import { ThemeProvider } from 'styled-components';
import WonLostElection from '../../../components/shared/WonLostElection';
import theme from '../../../theme';

const sampleCandidateList = [36, 30, 43];

const Component = (props) => (
    <UiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <WonLostElection {...props} />
      </ThemeProvider>
    </UiThemeProvider>
)
context('WonLostElection.cy.js', () => {
  let candidate;
  sampleCandidateList.forEach(candidateId => {
    describe(`check candidate avatar - ${candidateId}`, () => {
      it(`loads candidate data`, async () => {
          candidate = await promisify(
              cy.getCandidate(candidateId).then(response => response.body),
          );
          candidate = candidate.candidate;
      });
      it(`should render component`, () => {
        
        cy.mount(
          <Component 
            candidate={candidate}
          />
        );
        let resultStatus;
        if (
          !candidate.votesReceived ||
          candidate.votesReceived === 0 ||
          candidate.votesReceived === candidate.votesNeeded
        ) {
          resultStatus = 'pending';
        } else if (candidate.votesReceived > candidate.votesNeeded) {
          resultStatus = 'won';
        } else {
          resultStatus = 'lost';
        }
        if(resultStatus === 'pending') {
          cy.get('[data-cy=won-lost-election]')
            .should('exist')
            .contains('RESULTS PENDING');
        }
        else if(resultStatus === 'won') {
          cy.get('[data-cy=won-lost-election]')
            .should('exist')
            .contains('WON ELECTION');
        }
        else if(resultStatus === 'lost') {
          cy.get('[data-cy=won-lost-election]')
            .should('exist')
            .contains('LOST ELECTION');
        }
      });
    });
  });
})