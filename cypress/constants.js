// const apiBaseUrls = {
//   'https://dev.goodparty.org': 'https://api-dev.goodparty.org/api/v1/',
//   'https://goodparty.org': 'https://api.goodparty.org/api/v1/',
//   // 'http://localhost:4000': 'http://localhost:1337/api/v1/',
//   'http://localhost:4000': 'https://api-dev.goodparty.org/api/v1/',
// };
// export const base = apiBaseUrls[Cypress.config().baseUrl];
import { generateApi } from '../api/tgpApi';
import { parseCookie } from './support/utils';

export const base = Cypress.env('API_BASE');
export const isProduction = Cypress.config().baseUrl === 'https://goodparty.org';
export const feedbackLink = 'mailto:ask@goodparty.org?subject=Feedback%20or%20Suggestion';
export const api = generateApi(base);

export const TEST_ACCOUNT_EMAIL = 'blueshark0811@gmail.com';
export const TEST_ACCOUNT_PWD = 'myFirst100!@#';
export const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo5MCwiZW1haWwiOiJibHVlc2hhcmswODExQGdtYWlsLmNvbSJ9LCJpYXQiOjE2NTE1MjAyNTAsImV4cCI6MTY4MzA1NjI1MH0.YQNAh1oIsRefhXowKNWlkqqFe7wMPc2eqh920ENHW6Y';
export const USER_COOKIE = '%7B%22id%22:90,%22phone%22:%22%22,%22email%22:%22blueshark0811@gmail.com%22,%22uuid%22:%22zpzeclooe0%22,%22name%22:%22Peter%20Asaro%22,%22feedback%22:%22The%20Good%20Party%22,%22socialId%22:null,%22socialProvider%22:null,%22displayAddress%22:%22%22,%22addressComponents%22:%22%22,%22zip%22:%2295001%22,%22isPhoneVerified%22:false,%22isEmailVerified%22:true,%22avatar%22:%22https://assets.goodparty.org/uploads/user-htzxz8.jpeg%22,%22hasPassword%22:true,%22voteStatus%22:%22%22,%22guestReferrer%22:null,%22crewCount%22:1,%22isAdmin%22:true,%22metaData%22:null,%22address%22:%22asdf%22,%22city%22:%22Aptos%22,%22displayName%22:%22%22,%22pronouns%22:%22%22,%22referrer%22:null%7D';