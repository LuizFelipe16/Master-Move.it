// primeira pagina que o user vê

import Head from 'next/head';
import Link from 'next/link';
import { FaArrowUp } from 'react-icons/fa';
import Footer from '../components/Footer';
import Headernav from '../components/Headernav';

import styles from '../styles/pages/Landing.module.css';

export default function Landing() {
  return (
    <>
      <div className={styles.containerLanding}>
        <Head>
          <title>Move.it</title>
        </Head>

        <Headernav />

        <main id="main">
          <div>
            <h1>Controle suas Tarefas e suba seu Nível cada vez mais!</h1>
            <p>Conheça o Move.it, um sistema que pode mudar a forma como você faz tarefas, com inúmeras possibilidades.</p>
            
            <br/>
            <br/>

            <Link href="/Login">
              <a className={styles.buttonLogar}>Logar</a>
            </Link>
            <br/>
            <Link href="/About">
              <a className={styles.buttonAbout}>Sobre</a>
            </Link>
          </div>
        </main>

        <div>
          <section>
            <h1>1</h1>

            <img src="/tela-register.png" alt="Tela"/>

            <p>Começe criando uma conta! Preencha todos os seus dados de forma correta.</p>
          </section>

          <section className={styles.sectionInvert}>
            <h1>2</h1>

            <img src="/tela-login.png" alt="Tela"/>

            <p>Pegue seu email e senha cadastrados e faça login na plataforma.</p>
          </section>

          <section>
            <h1>3</h1>

            <img src="/tela-dash.png" alt="Tela"/>

            <p>Aqui está seu Dashboard! Você possui seu XP para subir de nível com as tarefas que irão aparecer a cada vez que você completar um ciclo de 25 minutos.</p>
          </section>

          <section className={styles.sectionInvert}>
            <h1>4</h1>

            <img src="/tela-task.png" alt="Tela"/>

            <p>Sua área personalizada de tarefas, você pode decidir qual tarefa quer executar ao final de cada ciclo e também sua dificuldade, com base nisso o XP será calculado.</p>
          </section>

          <section>
            <h1>5</h1>

            <img src="/tela-profile.png" alt="Tela"/>

            <p>Quando você quiser ver seu perfil geral é só dar uma olhada, vai saber seu nível, todo o XP que possui e as tarefas que completou.</p>
          </section>
        </div>

        <Footer />
      </div>
    </>
  );
}