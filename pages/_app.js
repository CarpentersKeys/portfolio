import Layout from '../components/Layout.jsx'
import '../public/globals.scss'
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  console.log(Component.pagename);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
