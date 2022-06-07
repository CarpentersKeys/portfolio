import Layout from '../components/Layout.jsx'
import '../public/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
  )
}

export default MyApp
