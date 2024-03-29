const NotionIcon = '/images/icons/notion.svg';
const FigmaIcon = '/images/icons/figma.svg';
const GoogleIcon = '/images/icons/icons8-google.svg';
const GoogleDriveIcon = '/images/icons/icons8-google-drive.svg';
const GoogleDocsIcon = '/images/icons/icons8-google-docs.svg';
const GooglePptIcon = '/images/icons/icons8-google-slides.svg';
const GoogleSheetIcon = '/images/icons/icons8-google-sheets.svg';
const AirtableIcon = '/images/icons/icons8-airtable.svg';
const GithubIcon = '/images/icons/icons8-github.svg';
const VimeoIcon = '/images/icons/icons8-vimeo.svg';
const YoutubeIcon = '/images/icons/icons8-youtube.svg';

const NOTION = 'https://notion.so';
const FIGMA = 'https://www.figma.com';
const GOOGLE = 'https://www.google.com';
const GOOGLE_DRIVE = 'https://drive.google.com';
const GOOGLE_DOCS_BASE = 'https://docs.google.com';
const GOOGLE_DOCS = 'https://docs.google.com/document';
const GOOGLE_SHEET = 'https://docs.google.com/spreadsheets';
const GOOGLE_PPT = 'https://docs.google.com/presentation';
const AIRTABLE = 'https://www.airtable.com';
const GITHUB = 'https://github.com';
const VIMEO = 'https://vimeo.com';
const YOUTUBE = 'https://youtu.be';



const ICONS_LIST = {
    [NOTION]: NotionIcon,
    [FIGMA]: FigmaIcon,
    [GOOGLE]: GoogleIcon,
    [GOOGLE_DRIVE]: GoogleDriveIcon,
    [GOOGLE_DOCS]: GoogleDocsIcon,
    [GOOGLE_SHEET]: GoogleSheetIcon,
    [GOOGLE_PPT]: GooglePptIcon,
    [AIRTABLE]: AirtableIcon,
    [GITHUB]: GithubIcon,
    [VIMEO]: VimeoIcon,
    [YOUTUBE]: YoutubeIcon
}
export const getBaseUrl = (link) => {
    let pathArray = link.split('/');
    let protocol = pathArray[0];
    let host = pathArray[2];
    let firstParam = pathArray[3];
    let url = protocol + '//' + host;
    if (url === GOOGLE_DOCS_BASE) {
        url += '/' + firstParam;
    }
    return url
}
export const getLinkIcon = (link) => {
    return ICONS_LIST[getBaseUrl(link)];
}