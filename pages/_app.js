import Layout from '../components/Layout.jsx'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Layout />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
