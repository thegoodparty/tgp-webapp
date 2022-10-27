import TestComponent from '../TestComponent';
import SocialPost from '../../../components/shared/SocialPost';
describe('SocialPost.cy.js', () => {
  it('Should render component', () => {
    const post = {
      title: '',
      content: '',
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
  });
})