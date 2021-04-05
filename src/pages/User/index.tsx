import Head from 'next/head';
import Sidebar from '../../components/Sidebar';
import { ToastContainer } from 'react-toastify';

import styles from '../../styles/pages/User.module.css';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { notifyError, notifySuccess } from '../../utils/configToast';
import Cookies from 'js-cookie';
import { FaCheck } from 'react-icons/fa';

interface UserProps {
  user_id: number;
  user_name: string;
  token: string;
  user_email: string;
  user_gender: string;
}

export default function User(props: UserProps) {
  const [email, setEmail] = useState(props.user_email);
  const [name, setName] = useState(props.user_name);
  const [photo_user, setPhotoUser] = useState(props.user_gender);
  const [password, setPassword] = useState('')

  const [inputDisabled, setInputDisabled] = useState(true);

  useEffect(() => {
    if (props.user_gender === 'male') {
      return setPhotoUser('user-male.png');
    }
    if (props.user_gender === 'female') {
      return setPhotoUser('user-female.png');
    }
    if (props.user_gender === 'neutral') {
      return setPhotoUser('user-neutral.png');
    }
  }, []);

  async function handleUpdateUser() {
    if (password.length < 5) {
      return notifyError('Sua senha precisa ter 5 caracteres!');
    }

    await api.put(`/users/${props.user_id}`, {
      email,
      name,
      password
    }, {
      headers: {
        Authorization: `bearer ${props.token}`
      }
    }).then((response) => {
      notifySuccess(response.data.message);

      Cookies.remove('user_name');
      Cookies.remove('email');
      Cookies.set('user_name', name);
      Cookies.set('email', email);

      setInputDisabled(true);
    }).catch(() => {
      notifyError('Ocorreu um erro');
    });
  }

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Usuário | Move.it</title>
        </Head>

        <Sidebar activePageUser={true} />

        <div className={styles.user}>
          <div>
            <img src={photo_user} alt="user" />

            <div className={styles.input}>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                disabled={inputDisabled}
                type="text"
                name="name"
                id="name"
                placeholder="Nome"
                required
              />
              <span>Nome:</span>
            </div>

            <div className={styles.input}>
              <input
                disabled={inputDisabled}
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                placeholder="E-mail"
                required
              />
              <span>E-mail:</span>
            </div>

            <div className={styles.input}>
              <input
                disabled={inputDisabled}
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                placeholder="********"
                required
              />

              {inputDisabled ? (
                <span>Senha:</span>
              ) : (
                <span>Nova Senha (mínimo de 5 caracteres):</span>
              )}
            </div>

            {inputDisabled ? (
              <button
                onClick={() => { setInputDisabled(false); }}
                className={styles.buttonEdit}
                type="button"
              >
                Editar Perfil
              </button>
            ) : (
              <button
                onClick={handleUpdateUser}
                type="button"
              >
                <FaCheck color="#fff" />
              </button>
            )}
          </div>

          <div>
            <img src="/logo-user.svg" alt="Logo" />
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    user_id,
    token,
    user_name,
    user_email,
    user_gender,
  } = context.req.cookies;

  return {
    props: {
      user_id: Number(user_id),
      token: token,
      user_name: user_name,
      user_email: user_email,
      user_gender: user_gender,
    }
  }
}