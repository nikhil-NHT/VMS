import { useEffect, useState } from 'react'
import '../styles/globals.css'
import Head from 'next/head'
import { Provider as GlobalContext } from '../src/context/GlobalContext'
import globals from '../src/utils/global'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import router from 'next/router'
import Success from '../src/components/Success'

function MyApp({ Component, pageProps }) {

  return (
    <>
  <Head>
    <meta charset='utf-8' />
    <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
    <meta name='description' content='Description' />
    <meta name='keywords' content='Keywords' />
    <title>Volunteer System</title>

    <link rel='manifest' href='/manifest.json' />
    <link
      href='https://d157777v0iph40.cloudfront.net/portal/pwa/static/icons/mainLogo192x192_1.png'
      rel='icon'
      type='image/png'
      sizes='16x16'
    />
    <link
      href='https://d157777v0iph40.cloudfront.net/portal/pwa/static/icons/mainLogo256x256_1.png'
      rel='icon'
      type='image/png'
      sizes='32x32'
    />
    <link rel='apple-touch-icon' href='/apple-icon.png' />
    <meta name='theme-color' content='#317EFB' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' />
  </Head>
  <GlobalContext>
    <Header />
    <Component {...pageProps} />
    <Success />
  </GlobalContext>
  </>
  )
}

export default MyApp
