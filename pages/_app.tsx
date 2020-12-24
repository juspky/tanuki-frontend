import '../styles/tailwind.css'
import 'remixicon/fonts/remixicon.css'
import { defaults } from 'react-chartjs-2';

// Disable animating charts by default.
defaults.global.animation = false;

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
