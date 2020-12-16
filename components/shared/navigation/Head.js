import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

const TgpHead = ({ title, description }) => (
  <Head>
    <title>{title}</title>
    <link rel="icon" href="/favicon.ico" />
    <meta property="og:site_name" content="The Good Party" />
    <meta property="og:title" content={title} />
    <meta property="og:type" content="website" />
    <meta
      property="og:image"
      content="https://assets.thegoodparty.org/share.jpg"
    />
    <meta name="description" content={description} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content="https://thegoodparty.org" />
    <meta property="twitter:card" content="summary_large_image" />
    <meta name="theme-color" content="#ffffff" />

    <link
      href="https://fonts.googleapis.com/css?family=PT+Serif:400,700&display=swap"
      rel="stylesheet"
    />
    <link
      rel="icon"
      type="image/png"
      href="https://assets.thegoodparty.org/favicon.png"
    />
    <link
      rel="apple-touch-icon"
      href="https://assets.thegoodparty.org/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="https://assets.thegoodparty.org/favicon/favicon-16x16.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="https://assets.thegoodparty.org/favicon/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="96x96"
      href="https://assets.thegoodparty.org/favicon/favicon-96x96.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="512x1512"
      href="https://assets.thegoodparty.org/favicon/favicon-512x1512.png"
    />

    <link rel="manifest" href="/manifest.json" />
  </Head>
);

TgpHead.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default TgpHead;
