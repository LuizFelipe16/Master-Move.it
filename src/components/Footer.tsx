import { FaArrowUp } from 'react-icons/fa';

import styles from '../styles/components/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <h1>create by luizfelipe @2021</h1>

      <a href="#main">
        <FaArrowUp />
      </a>
    </footer>
  );
}