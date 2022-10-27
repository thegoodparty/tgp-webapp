import TestComponent from '../TestComponent';
import SocialPost from '../../../components/shared/SocialPost';
import { dateUsHelper } from '../../../helpers/dateHelper';
describe('SocialPost.cy.js', () => {
  it('Should render empty component', () => {
    const post = {
      title: '',
      content: "Georgia midterm voters turned out in record numbers on the first day of early in-person voting, Republican Secretary of State Brad Raffensperger said on Tuesday. via: BET According to the Georgia secretary of state's office, 131,318 ballots were cast in person, compared to 70,849 in-person ballots on the first day of early voting in 2018. In fact, the turnout on Monday was closer to the number of ballots cast on the first day of early voting in the 2020 presidential election year. Monday's total reached 143,077 when the 11,759 absentee ballots were added to the total. Election officials expected the turnout pace to increase during the final week of early voting. Meanwhile, statewide reports of long lines to cast a ballot were minimal, though some voters in metro areas reported waiting more than 30 minutes in line. It appears that there's a lot of interest among voters in the Georgia gubernatorial and U.S. Senate races. The competition for governor pits Republican Gov. Brian Kemp against Democrat Stacey Abrams in a rematch of their close race in 2018. An Atlanta Journal-Constitution/Georgia News Collaborative poll released last week showed Kemp with 51 percent support and Abrams with 41 percent. About six percent of those polled were undecided, while Libertarian Shane Hazel had two percent support. In the high-stakes Senate race, incumbent Sen. Raphael Warnock, a Democrat, squares off against GOP candidate Herschel Walker. This race could decide which party controls the Senate. After weeks of bad press, including allegedly paying for an abortion, Walker has plummeted in a recent poll. A poll by SurveyUSA has Warnock with a huge 12 percent lead, 50 percent to 38 percent. A poll in September by CBS News-YouGov found that the race was much tighter, with 51 percent supporting Warnock with 49 percent for Walker. The post Georgia Breaks Record For Early Voting On First Day appeared first on LOVEBSCOTT.",
      source: 'FACEBOOK_PAGE',
      engagement: 55,
      likesCount: 49,
      commentsCount: 6,
      url: 'https://www.facebook.com/111040616957411_488222996452912',
      images: [
          {
          title: '',
          url: 'https://external-lga3-2.xx.fbcdn.net/emg1/v/t13/12775023192151706328?url=https%3A%2F%2Fkubrick.htvapps.com%2Fhtv-prod-media.s3.amazonaws.com%2Fimages%2Femma-gov-candidate-graphic-0870-jpg-00-00-03-09-still001-1662628653.jpg%3Fcrop%3D1.00xw%253A1.00xh%253B0%252C0%26resize%3D1200%253A%252A&fb_obo=1&utld=htvapps.com&stp=c0.5000x0.5000f_dst-emg0_p675x675_q75&ccb=13-1&oh=06_AaqtzMycuXQ310dFf3UtjZpKxh8EsqEDtfEDAsKIrBCbUg&oe=631DBFE1&_nc_sid=6ac203'
          }
      ],
      userName: 'Ricky Dale Harrington Jr',
      userScreenName: 'Ricky Dale Harrington Jr',
      publishedAt: '2022-09-10T05:55:28Z',
      videos: [
          {
          title: '',
          url: 'https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.4029tv.com%2Farticle%2Farkansas-governor-candidates-hitting-the-campaign-trail%2F41143576%3Futm_campaign%3Dsnd-autopilot&h=AT0Ar8RYMmL2uRRrZI9Dlk-RrymiqaAkehOCFjtv2tOQGHBORb7zAolr1GQH8o9dJiQknAfyM7VpYbJDe9V78nkw7wzDpuQtrGWU1ogq7DnVNgVZCd_M4Q&s=1'
          }
      ]
    };
    
    cy.mount(
      <TestComponent Component={SocialPost} post={post} />
    );
    if(post.title) {
      cy.get('[data-cy=post-title]')
        .should('exist')
        .contains(post.title);  
    }
    else {
      cy.get('[data-cy=post-title]')
        .should('not.exist');  
    }
    if(post.userName) {
      cy.get('[data-cy=post-username]')
        .should('exist')
        .contains(post.userName);  
    }
    else {
      cy.get('[data-cy=post-username]')
        .should('not.exist');  
    }
    if(post.userName) {
      cy.get('[data-cy=post-username]')
        .should('exist')
        .contains(post.userName);  
    }
    else {
      cy.get('[data-cy=post-username]')
        .should('not.exist');  
    }
    if(post.userScreenName) {
      cy.get('[data-cy=post-screenname]')
        .should('exist')
        .contains(post.userScreenName);  
    }
    else {
      cy.get('[data-cy=post-screenname]')
        .should('not.exist');  
    }
    if(post.publishedAt) {
      cy.get('[data-cy=post-published-at]')
        .should('exist')
        .contains(dateUsHelper(post.publishedAt));  
    }
    else {
      cy.get('[data-cy=post-published-at]')
        .should('not.exist');  
    }
    if(post.likesCount) {
      cy.get('[data-cy=post-likes]')
        .should('exist')
        .contains(post.likesCount);  
    }
    else {
      cy.get('[data-cy=post-likes]')
        .should('not.exist');  
    }
    if(post.commentsCount) {
      cy.get('[data-cy=post-comments]')
        .should('exist')
        .contains(post.commentsCount);  
    }
    else {
      cy.get('[data-cy=post-comments]')
        .should('not.exist');  
    }
    cy.get('[data-cy=post-share]')
      .should('exist')
      .contains('Share');
    if(post.hadVideo) {
      cy.get('[data-cy=post-view-tiktok]')
        .should('exist')
        .contains('View on TikTok');  
    }
    else {
      cy.get('[data-cy=post-view-tiktok]')
        .should('not.exist');  
    }
    
  });
  it('Should render component', () => {
    const post = {
      title: "Georgia Breaks Record For Early Voting On First Day",
      content: "Georgia midterm voters turned out in record numbers on the first day of early in-person voting, Republican Secretary of State Brad Raffensperger said on Tuesday. via: BET According to the Georgia secretary of state's office, 131,318 ballots were cast in person, compared to 70,849 in-person ballots on the first day of early voting in 2018. In fact, the turnout on Monday was closer to the number of ballots cast on the first day of early voting in the 2020 presidential election year. Monday's total reached 143,077 when the 11,759 absentee ballots were added to the total. Election officials expected the turnout pace to increase during the final week of early voting. Meanwhile, statewide reports of long lines to cast a ballot were minimal, though some voters in metro areas reported waiting more than 30 minutes in line. It appears that there's a lot of interest among voters in the Georgia gubernatorial and U.S. Senate races. The competition for governor pits Republican Gov. Brian Kemp against Democrat Stacey Abrams in a rematch of their close race in 2018. An Atlanta Journal-Constitution/Georgia News Collaborative poll released last week showed Kemp with 51 percent support and Abrams with 41 percent. About six percent of those polled were undecided, while Libertarian Shane Hazel had two percent support. In the high-stakes Senate race, incumbent Sen. Raphael Warnock, a Democrat, squares off against GOP candidate Herschel Walker. This race could decide which party controls the Senate. After weeks of bad press, including allegedly paying for an abortion, Walker has plummeted in a recent poll. A poll by SurveyUSA has Warnock with a huge 12 percent lead, 50 percent to 38 percent. A poll in September by CBS News-YouGov found that the race was much tighter, with 51 percent supporting Warnock with 49 percent for Walker. The post Georgia Breaks Record For Early Voting On First Day appeared first on LOVEBSCOTT.",
      source: "BLOG",
      engagement: 0,
      likesCount: null,
      commentsCount: null,
      url: "https://www.lovebscott.com/georgia-breaks-record-early-voting-first-day",
      images: [],
      userName: "Walker",
      userScreenName: "Walker",
      publishedAt: "2022-10-19T17:30:43Z",
      videos: []
    };
    cy.mount(
      <TestComponent Component={SocialPost} post={post} />
    );
    if(post.title) {
      cy.get('[data-cy=post-title]')
        .should('exist')
        .contains(post.title);  
    }
    else {
      cy.get('[data-cy=post-title]')
        .should('not.exist');  
    }
    if(post.userName) {
      cy.get('[data-cy=post-username]')
        .should('exist')
        .contains(post.userName);  
    }
    else {
      cy.get('[data-cy=post-username]')
        .should('not.exist');  
    }
    if(post.userName) {
      cy.get('[data-cy=post-username]')
        .should('exist')
        .contains(post.userName);  
    }
    else {
      cy.get('[data-cy=post-username]')
        .should('not.exist');  
    }
    if(post.userScreenName) {
      cy.get('[data-cy=post-screenname]')
        .should('exist')
        .contains(post.userScreenName);  
    }
    else {
      cy.get('[data-cy=post-screenname]')
        .should('not.exist');  
    }
    if(post.publishedAt) {
      cy.get('[data-cy=post-published-at]')
        .should('exist')
        .contains(dateUsHelper(post.publishedAt));  
    }
    else {
      cy.get('[data-cy=post-published-at]')
        .should('not.exist');  
    }
    if(post.likesCount) {
      cy.get('[data-cy=post-likes]')
        .should('exist')
        .contains(post.likesCount);  
    }
    else {
      cy.get('[data-cy=post-likes]')
        .should('not.exist');  
    }
    if(post.commentsCount) {
      cy.get('[data-cy=post-comments]')
        .should('exist')
        .contains(post.commentsCount);  
    }
    else {
      cy.get('[data-cy=post-comments]')
        .should('not.exist');  
    }
    cy.get('[data-cy=post-share]')
      .should('exist')
      .contains('Share');
    if(post.hadVideo) {
      cy.get('[data-cy=post-view-tiktok]')
        .should('exist')
        .contains('View on TikTok');  
    }
    else {
      cy.get('[data-cy=post-view-tiktok]')
        .should('not.exist');  
    }
  });
})