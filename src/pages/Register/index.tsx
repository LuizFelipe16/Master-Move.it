import Head from 'next/head';
import { BsArrowLeftShort } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { FaLock, FaMehBlank, FaUserAlt } from 'react-icons/fa';

import styles from '../../styles/pages/Register.module.css';
import { FormEvent, useState } from 'react';
import api from '../../services/api';
import { notifyError, notifySuccess } from '../../utils/configToast';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import Link from 'next/link';

export default function Register() {
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');

  async function handleCreateUser(e: FormEvent) {
    e.preventDefault();

    api.post('/register', {
      name,
      email,
      gender,
      password,
      confirmPassword
    }).then((response) => {
      const { error, message } = response.data;
      
      if(error) {
        notifyError(error);
      }

      if(message) {
        router.push('/Login');
  
        notifySuccess(message);
      }
    }).catch(() => {
      notifyError('Erro ao tentar se registrar. Tente mais tarde.')
    });
  }
  
  return (
    <>
    <div className={styles.containerRegister}>
      <Head>
        <title>Cadastro | Move.it</title>
      </Head>

      <section>
        <img src="/landing-logo.svg" alt="ogo" />
      </section>

      <section>
        <Link href="/Login">
          <a className={styles.backPage}> <BsArrowLeftShort /> </a>
        </Link>

        <form onSubmit={handleCreateUser}>
          <p>Preencha com seu dados</p>

          {/* transformar essas div em componentes */}
          <div>
            <input
              required
              type="text"
              placeholder="Digite seu nome"
              value={name}
              onChange={e => setName(e.target.value)}
            />

            <span>Nome</span>

            <button disabled className={styles.buttonDisabled} type="button"><FaUserAlt color="#fff" size={26} /></button>
          </div>

          <div>
            <input
              required
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <span>Email</span>

            <button disabled className={styles.buttonDisabled} type="button"><MdEmail color="#fff" size={26} /></button>
          </div>

          <div>
            <select
              required
              value={gender}
              onChange={e => setGender(e.target.value)}
            >
              <option hidden disabled value="">Informe seu Gênero</option>
              <option value="male">Masculino</option>
              <option value="female">Feminino</option>
              <option value="neutral">Prefiro não informar</option>
            </select>

            <span>Gênero</span>

            <button disabled className={styles.buttonDisabled} type="button"><FaMehBlank color="#fff" size={26} /></button>
          </div>

          <div>
            <input
              required
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <span>Senha</span>

            <button disabled className={styles.buttonDisabled} type="button"><FaLock color="#fff" size={26} /></button>
          </div>

          <div>
            <input
              required
              type="password"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />

            <span>Repita sua Senha</span>

            <button disabled className={styles.buttonDisabled} type="button"><FaLock color="#fff" size={26} /></button>
          </div>

          <button type="submit">Cadastrar</button>
        </form>
      </section>
    </div>
    <ToastContainer />
    </>
  );
}