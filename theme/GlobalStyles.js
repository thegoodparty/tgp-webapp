import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html,
  body {
    min-height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }

  body {
    font-family: 'Lato', sans-serif;
    line-height: 1.3;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: subpixel-antialiased;
    padding-right: 0 !important; // for the tooltip issue
  }


  a {
   text-decoration: none;
   color: #000;
  }
  
  .pointer {
    cursor: pointer;
  }

  a:hover {
   color: #333;
   text-decoration: underline;
  }
  
  a.no-underline:hover {
    text-decoration: none;
  }
  
  a.underline {
    text-decoration: underline;
  }

  .bold700 {
    font-weight: 700;
  }

  .bold600 {
    font-weight: 600;
  }

  .bold500 {
    font-weight: 500;
  }

  .blue {
    color: #117CB6;
  }

  .purple-text {
  color: #5C00C7;
  }

  .text-right {
    text-align: right;
  }

  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }

  .pointer {
    cursor: pointer;
  },
  .spacing05 {
    letter-spacing: 0.5px;
  }
  .faq-image {
    width: 100%;
    height: auto;
  }
  .full-image {
    width: 100%;
    height: auto;
  }
  .uploadIcon {
    display: none;
  }

  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ReactCrop__image {
    max-width: 700px;
  }
  
  .MuiPopover-paper.MuiPaper-root {
    overflow: visible !important;
  }
  
  .relative {
    position:relative;
  }
  
  .red {
    color: #bf0020;
  }
  .blue {
    color: #0027dc;
  }
`;

export default GlobalStyles;
