import '~/styles/globals.css'
import Cookies from 'cookies'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export const getServerSideProps = async ({ req, res }) => {
  const cookies = new Cookies(req, res);
  console.log(cookies.get("token"));
  return {};
}

export default MyApp