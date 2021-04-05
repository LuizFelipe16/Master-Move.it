import Link from 'next/link';

import styles from '../styles/components/Headernav.module.css';

export default function Headernav() {
  return (
    <header className={styles.nav}>
      <img src="/logo.svg" alt="Logo" />

      <div className={styles.groupSystem}>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/About">
          <a>Sobre</a>
        </Link>
      </div>

      <div className={styles.groupOptions}>
        <Link href="/Login">
          <a>Logar</a>
        </Link>
        <Link href="/Register">
          <a>Criar Conta</a>
        </Link>
      </div>
    </header>
  );
}