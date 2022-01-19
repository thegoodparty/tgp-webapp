import styled from 'styled-components';

import {
  FaTwitterSquare,
  FaFacebookSquare,
  FaYoutubeSquare,
  FaLinkedin,
  FaSnapchatSquare,
  FaTiktok,
  FaRedditSquare,
  FaGlobeAmericas,
  FaVideo,
  FaDollarSign,
} from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';

const IconWrapper = styled.span`
  color: ${({ theme }) => theme.colors.purple};
  font-size: 24px;
  margin-right: 16px;
`;
export const step2fields = [
  {
    label: 'Candidate First Name',
    key: 'firstName',
    placeholder: 'First Name',
    required: true,
    defaultValue: '',
    type: 'text',
    shortLabel: 'First name',
  },
  {
    label: 'Candidate Last Name',
    key: 'lastName',
    placeholder: 'Last Name',
    required: true,
    defaultValue: '',
    type: 'text',
    shortLabel: 'Last name',
  },
  {
    label: 'Preferred pronouns of candidate',
    key: 'pronouns',
    defaultValue: '',
    type: 'select',
    options: ['He/Him', 'She/Her', 'They/Them'],
    shortLabel: 'Pronouns',
  },
  {
    label: 'Ethnicity of candidate',
    key: 'ethnicity',
    defaultValue: '',
    type: 'text',
    placeholder: 'Ethnicity',
    shortLabel: 'Ethnicity',
  },
  {
    label: 'Race of candidate',
    key: 'race',
    defaultValue: '',
    type: 'text',
    placeholder: 'Race',
    shortLabel: 'Race',
  },
  {
    label: 'Where is the primary residence of the candidate?',
    key: 'zip',
    placeholder: 'Enter Zip Code',
    required: true,
    defaultValue: '',
    type: 'text',
    shortLabel: 'ZIP code',
    maxLength: 5,
  },
  {
    label: 'Is the candidate a U.S. Citizen?',
    key: 'citizen',
    required: true,
    defaultValue: '',
    type: 'radio',
    options: ['Yes', 'No'],
    shortLabel: 'US citizenship status',
  },
  // {
  //   label: 'Length of citizenship',
  //   key: 'citizenLength',
  //   defaultValue: '',
  //   type: 'radio',
  //   options: ['Citizen at birth', 'Select date of naturalization'],
  // },
  {
    label: 'Have you ever run for public office before?',
    key: 'ranBefore',
    defaultValue: '',
    required: true,
    type: 'radio',
    options: ['Yes', 'No'],
    toggleElement: 'publicOffice',
    shortLabel: 'Public office history',
  },
  {
    key: 'publicOffice',
    hidden: true,
  },
  {
    label: 'Have you ever been elected or appointed to public office?',
    key: 'electedBefore',
    defaultValue: '',
    required: true,
    type: 'radio',
    options: ['Yes', 'No'],
    toggleElement: 'officeElected',
    shortLabel: 'Elected for public office?',
  },
  {
    key: 'officeElected',
    hidden: true,
  },

  {
    label: 'Have you ever been a registered member of a political party?',
    key: 'memberPolitical',
    defaultValue: '',
    required: true,
    type: 'radio',
    options: ['Yes', 'No'],
    shortLabel: 'Political affiliation history',
  },
];

export const step2Socials = [
  {
    key: 'twitter',
    label: 'Twitter',
    adornment: 'twitter.com/',
    placeholder: 'username',
    defaultValue: '',
    icon: (
      <IconWrapper>
        <FaTwitterSquare />
      </IconWrapper>
    ),
  },
  {
    key: 'facebook',
    label: 'Facebook',
    adornment: 'facebook.com/',
    placeholder: 'link',
    defaultValue: '',
    icon: (
      <IconWrapper>
        <FaFacebookSquare />
      </IconWrapper>
    ),
  },
  {
    key: 'youtube',
    label: 'YouTube',
    adornment: 'youtube.com/',
    placeholder: 'username',
    defaultValue: '',
    icon: (
      <IconWrapper>
        <FaYoutubeSquare />
      </IconWrapper>
    ),
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    adornment: 'linkedin.com/',
    placeholder: 'username',
    defaultValue: '',
    icon: (
      <IconWrapper>
        <FaLinkedin />
      </IconWrapper>
    ),
  },
  {
    key: 'snap',
    label: 'Snap',
    adornment: 'snap.com/',
    placeholder: 'username',
    defaultValue: '',
    icon: (
      <IconWrapper>
        <FaSnapchatSquare />
      </IconWrapper>
    ),
  },
  {
    key: 'tiktok',
    label: 'TikTok',
    adornment: 'tiktok.com/',
    placeholder: 'username',
    defaultValue: '',
    icon: (
      <IconWrapper>
        <FaTiktok />
      </IconWrapper>
    ),
  },
  {
    key: 'reddit',
    label: 'Reddit',
    adornment: 'reddit.com/',
    placeholder: 'username',
    defaultValue: '',
    icon: (
      <IconWrapper>
        <FaRedditSquare />
      </IconWrapper>
    ),
  },
  {
    key: 'website',
    label: 'Website',
    adornment: '',
    placeholder: 'website.com',
    defaultValue: '',
    icon: (
      <IconWrapper>
        <FaGlobeAmericas />
      </IconWrapper>
    ),
  },
];

export const step3Fields = [
  {
    label: 'What are you running for?',
    key: 'running for',
    placeholder: 'What are you running for?',
    defaultValue: '',
    type: 'text',
    shortLabel: 'Office',
  },
  {
    label: 'Have you filed your personal disclosure with the Congress?',
    key: 'disclosure',
    defaultValue: '',
    type: 'radio',
    options: ['Yes', 'No'],
    grayBg: true,
    shortLabel: 'Congress disclosure',
  },
  {
    label: 'Campaign summary',
    key: 'campaignSummary',
    placeholder:
      'Why are you running as an independent or 3rd party candidate?',
    subtitle: 'Why are you running as an independent or 3rd party candidate?',
    defaultValue: '',
    type: 'text',
    multiline: true,
    shortLabel: 'Summary',
  },
  {
    label: 'Campaign video',
    key: 'campaignVideo',
    placeholder: 'Paste link to video...',
    subtitle:
      "A 60 second intro video about your campaign and why you're running.",
    defaultValue: '',
    type: 'text',
    subLabel: 'Optional',
    icon: (
      <IconWrapper>
        <FaVideo />
      </IconWrapper>
    ),
  },
  {
    label: 'Campaign photos',
    key: 'photos',
    defaultValue: [
      {
        key: 'headshotPhoto',
        label: 'Candidate headshot',
        value: '',
      },
      {
        key: 'trailPhoto',
        label: 'Campaign trail photo',
        value: '',
      },
      {
        key: 'bannerPhoto',
        label: 'Campaign page banner (16:9 aspect)',
        value: '',
      },
    ],
    subtitle: 'Including at least one good headshot.',
    required: true,
  },
  {
    label: 'What is the name of your candidate/campaign committee?',
    key: 'committeeName',
    placeholder: 'Enter...',
    defaultValue: '',
    type: 'text',
    subLabel: 'If already filled',
    shortLabel: 'Committee name',
  },

  {
    label: 'Have you registered and filed financial statements with the FEC?',
    key: 'fecStatement',
    defaultValue: '',
    type: 'radio',
    options: ['Yes', 'No'],
    shortLabel: 'Financial statements status',
  },

  {
    label: 'Have you filed any statement of candidacy with the State?',
    key: 'candidacyStatement',
    defaultValue: '',
    type: 'radio',
    options: ['Yes', 'No'],
    shortLabel: 'Statement of candidacy history',
  },
  {
    label: 'How much money have you raised so far?',
    required: true,
    key: 'moneyRaisedAmount',
    placeholder: '1,000.00',
    defaultValue: '',
    type: 'text',
    icon: (
      <IconWrapper>
        <FaDollarSign />
      </IconWrapper>
    ),
    shortLabel: 'Money raised',
  },
  {
    label: '',
    noLabel: true,
    required: true,
    key: 'fromWhom',
    placeholder: 'From Whom?',
    defaultValue: '',
    type: 'text',
    icon: (
      <IconWrapper>
        <IoIosPeople />
      </IconWrapper>
    ),
  },
  {
    label:
      'How many signatures are required for your name to appear on the ballot in your election (if applicable)?',
    key: 'signatures',
    placeholder: 'Enter...',
    defaultValue: '',
    type: 'text',
    shortLabel: 'Required Signatures',
  },
  {
    label:
      'How many voters do you believe are likely to support an Independent or 3rd party candidate in your election?',
    key: 'likelySupport',
    placeholder: 'Enter...',
    defaultValue: '',
    type: 'text',
    shortLabel: 'Likely voters',
  },
  {
    label:
      'How many votes do you estimate will it take to win the elected office you are interested in running for in the General election?',
    key: 'votesToWin',
    placeholder: 'Enter...',
    defaultValue: '',
    type: 'text',
    shortLabel: 'Votes Needed',
  },
];

export const step3Socials = [
  {
    key: 'twitter',
    adornment: 'twitter.com/',
    placeholder: 'username',
    defaultValue: '',
    icon: (
      <IconWrapper>
        <FaTwitterSquare />
      </IconWrapper>
    ),
  },
  {
    key: 'facebook',
    adornment: 'facebook.com/',
    placeholder: 'link',
    defaultValue: '',
    icon: (
      <IconWrapper>
        <FaFacebookSquare />
      </IconWrapper>
    ),
  },
  {
    key: 'youtube',
    adornment: 'youtube.com/',
    placeholder: 'username',
    defaultValue: '',
    icon: (
      <IconWrapper>
        <FaYoutubeSquare />
      </IconWrapper>
    ),
  },
  {
    key: 'linkedin',
    adornment: 'linkedin.com/',
    placeholder: 'username',
    defaultValue: '',
    icon: (
      <IconWrapper>
        <FaLinkedin />
      </IconWrapper>
    ),
  },
  {
    key: 'snap',
    adornment: 'snap.com/',
    placeholder: 'username',
    defaultValue: '',
    icon: (
      <IconWrapper>
        <FaSnapchatSquare />
      </IconWrapper>
    ),
  },
  {
    key: 'tiktok',
    adornment: 'tiktok.com/',
    placeholder: 'username',
    defaultValue: '',
    icon: (
      <IconWrapper>
        <FaTiktok />
      </IconWrapper>
    ),
  },
  {
    key: 'reddit',
    adornment: 'reddit.com/',
    placeholder: 'username',
    defaultValue: '',
    icon: (
      <IconWrapper>
        <FaRedditSquare />
      </IconWrapper>
    ),
  },
  {
    key: 'website',
    adornment: '',
    placeholder: 'website.com',
    defaultValue: '',
    icon: (
      <IconWrapper>
        <FaGlobeAmericas />
      </IconWrapper>
    ),
  },
];

export const step4Fields = [
  {
    label: 'Email',
    key: 'candidateEmail',
    placeholder: 'email@domain.com',
    defaultValue: '',
    type: 'email',
    required: true,
  },
  {
    label: 'Phone',
    key: 'candidatePhone',
    placeholder: '(555) 555-5555',
    defaultValue: '',
    type: 'phone',
    required: true,
  },
];

export const step4CampaignFields = [
  {
    label: 'Contact Person',
    key: 'contactName',
    placeholder: 'First and last name',
    defaultValue: '',
    type: 'text',
    required: true,
  },
  {
    label: 'Role',
    key: 'contactRole',
    placeholder: 'Role in the campaign',
    defaultValue: '',
    type: 'text',
    required: true,
  },
  {
    label: 'Email',
    key: 'contactEmail',
    placeholder: 'email@domain.com',
    defaultValue: '',
    type: 'email',
    required: true,
  },
  {
    label: 'Phone',
    key: 'contactPhone',
    placeholder: '(555) 555-5555',
    defaultValue: '',
    type: 'phone',
    required: true,
  },
  {
    label: 'Mailing Address',
    key: 'contactAddress',
    placeholder: 'Street, City and ZIP Code',
    defaultValue: '',
    type: 'text',
    required: true,
  },
];
