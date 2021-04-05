import '../styles/global.css';
import 'react-toastify/dist/ReactToastify.css';
import { ChallengesProvider } from '../contexts/ChallengesContext';

// Aqui fica tudo que vai tá em todas as Pages

function MyApp({ Component, pageProps }) {
  return (
    <ChallengesProvider>
      <Component {...pageProps} />
    </ChallengesProvider>
  );
}

export default MyApp
