import { emptyCandidate } from '../../support/utils';
import { isProduction } from '../../constants';

context('Candidate', () => {
  const candidates = [
    // isGood  = false
    // isMajor = true
    // isAligned = false
    // isIncumbent = true
    // https://thegoodparty.org/elections/candidate/presidential-i/donald-trump/1
    {
      isGood: false,
      isMajor: true,
      isAligned: false,
      chamber: 'presidential',
      isIncumbent: true,
      candidateId: isProduction ? 1 : 14,
      candidateName: 'Donald Trump',
    },
    // isGood = false
    // isMajor = true
    // isAligned = true
    // https://thegoodparty.org/elections/candidate/presidential/joe-biden/3
    {
      isGood: false,
      isMajor: true,
      isAligned: true,
      chamber: 'presidential',
      isIncumbent: false,
      candidateId: isProduction ? 3 : 12,
      candidateName: 'Joe Biden',
    },
    // isGood = true (most of contributions are from small donors)
    // isMajor = true
    // isAligned = true
    // https://thegoodparty.org/elections/candidate/presidential/bernie-sanders/2
    {
      isGood: true,
      isMajor: true,
      isAligned: true,
      chamber: 'presidential',
      isIncumbent: false,
      candidateId: isProduction ? 2 : 11,
      candidateName: 'Bernie Sanders',
    },
    // isGood = true
    // isMajor = false
    // isAligned = true
    // https://thegoodparty.org/elections/candidate/presidential/howie-hawkins/4
    {
      isGood: true,
      isMajor: false,
      isAligned: true,
      chamber: 'presidential',
      isIncumbent: false,
      candidateId: isProduction ? 4 : 18,
      candidateName: 'Howie Hawkins',
    },
    // isGood = unknown
    // isMajor = false
    // isAligned = unknown
    // https://thegoodparty.org/elections/candidate/senate/bryant-corky-messner/580
    {
      isGood: 'unknown',
      isMajor: false,
      isAligned: true,
      chamber: 'senate',
      isIncumbent: false,
      candidateId: 580,
      candidateName: 'Bryant Corky Messner',
    },
    // isGood = true
    // isMajor = true
    // isAligned true
    // isIncumbent = true
    // https://thegoodparty.org/elections/candidate/house-i/alexandria-ocasiocortez/343
    // https://thegoodparty.org/elections/candidate/house-i/devin-nunes/387
    // https://thegoodparty.org/elections/candidate/house-i/jim-jordan/123
    {
      isGood: true,
      isMajor: true,
      isAligned: true,
      chamber: 'house',
      isIncumbent: true,
      candidateId: 343,
      candidateName: 'Alexandria Ocasiocortez',
    },
    {
      isGood: true,
      isMajor: true,
      isAligned: true,
      chamber: 'house',
      isIncumbent: true,
      candidateId: 387,
      candidateName: 'Devin Nunes',
    },
    {
      isGood: true,
      isMajor: true,
      isAligned: true,
      chamber: 'house',
      isIncumbent: true,
      candidateId: 123,
      candidateName: 'Jim Jordan',
    },
  ];
  candidates.forEach(candidate => {
    const { chamber, isIncumbent, candidateId, candidateName } = candidate;
    let candidateData;
    let incumbentData;
    describe(`check ${chamber.replace(/^\w/, c =>
      c.toUpperCase(),
    )} Candidate(${candidateName}) page: ${
      candidate.isGood === true
        ? 'Good'
        : candidate.isGood === false
          ? 'Not Good'
          : 'Unknown'
      }, ${candidate.isMajor ? 'Major' : 'Minor'}, ${
      candidate.isAligned ? 'Aligned' : 'Not Aligned'
      }, ${candidate.isIncumbent ? 'Incumbent' : 'Not Incumbent'}`, () => {
        beforeEach(() => {
          const url = `/elections/candidate/${chamber}${
            isIncumbent ? '-i' : ''
            }/${candidateId}/${candidateId}`;
          cy.visit(url);
        });
        it(`loads candidate data and test components`, () => {
          cy.getCandidateData(candidate).then(response1 => {
            candidateData = response1.body;
            cy.getIncumbentData(
              candidate.chamber === 'senate' && candidateData,
            ).then(response2 => {
              incumbentData = chamber === 'house' ? {} : response2.body.incumbent;
              cy.get('[data-cy=page-title]')
                .should(
                  'contain',
                  candidateData && !emptyCandidate(candidateData)
                    ? candidateData.name
                    : '',
                )
                .and('contain', chamber)
                .and(
                  'contain',
                  candidateData &&
                    !emptyCandidate(candidateData) &&
                    candidateData.isIncumbent
                    ? 'incumbent'
                    : 'candidate',
                );
              console.log('candidateData', candidateData);
              cy.testCandidateTopRow(candidate, candidateData, incumbentData);
            });
          });
        });
      });
  });
});
