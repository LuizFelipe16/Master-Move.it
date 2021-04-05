import { FormEvent, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { notifyError } from '../../utils/configToast';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { MdEmail } from 'react-icons/md';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { FaLongArrowAltRight } from 'react-icons/fa';
import api from '../../services/api';
import { saveToken } from '../../services/saveToken';

import styles from '../../styles/pages/Login.module.css';
import Cookies from 'js-cookie';

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLoginUser(e: FormEvent) {
    e.preventDefault();

    await api.post('/login', {
      email,
      password
    }).then((response) => {
      const { id, email, name, token, error, gender } = response.data;

      if(error) {
        return notifyError(error);
      }

      Cookies.set('user_id', id);
      Cookies.set('user_email', email);
      Cookies.set('user_name', name);
      Cookies.set('user_gender', gender);
      Cookies.set('isUserOnline', String(true));

      const isUserValid = saveToken(token);

      if (isUserValid) {
        router.push('/Dashboard');
      }
    }).catch(() => {
      notifyError('Não foi Possível Entrar na Aplicação. Tente mais tarde.');
    });
  }

  return (
    <>
      <div className={styles.containerLogin}>
        <Head>
          <title>Login | Move.it</title>
        </Head>

        <section>
          <img src="/landing-logo.svg" alt="ogo" />
        </section>

        <section>
          <img src="/logo.svg" alt="ogo" />

          <form onSubmit={handleLoginUser}>
            <h1>Bem-vindo!</h1>

            <p>Faça Login com sua conta para começar.</p>

            <div>
              <input
                required
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={event => setEmail(event.target.value)}
              />

              <button disabled type="button"><MdEmail color="#fff" size={29} /></button>
            </div>

            <div>
              <input
                required
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={event => setPassword(event.target.value)}
              />

              <button className={styles.buttonLogin} type="submit"><AiOutlineArrowRight color="#fff" size={29} /></button>
            </div>

            <Link href="/Register">
              <a><FaLongArrowAltRight color="#fff" /> Não tenho uma Conta</a>
            </Link>
          </form>
        </section>
      </div>
      <ToastContainer />
    </>
  );
}