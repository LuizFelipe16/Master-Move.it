import Head from 'next/head';
import Footer from '../../components/Footer';
import Headernav from '../../components/Headernav';

import styles from '../../styles/pages/About.module.css';

export default function About() {
  return (
    <>
      <div className={styles.containerAbout}>
        <Head>
          <title>Sobre | Move.it</title>
        </Head>

        <Headernav />

        <main id="main">
          <div>
            <h1>Sobre o Move.it</h1>

            <h2>
              Experiência dos jogos para a vida real, deixando extremamente mais divertido a forma como você pode fazer tarefas comuns.
            </h2>

            <p>
              O Move.it é um sistema web feito com base em gamificação, para trazer a experiência dos jogos para a vida real, deixando extremamente mais divertido a forma como você pode fazer tarefas comuns.
              <br/>
              <br/>
              Foi criado para ajudar no trabalho home-office e baseado na técnica 'Pomodoro', ou seja, ciclos de 25 minutos, a cada término você vai receber uma terefa de escolha sua! Você decide o que fazer para o seu bem-estar.
              <br/>
              <br/>
              Se você trabalho muito sentado, pode criar tarefas de exércicios. Se você sente que usa e força muito sua visão, pode criar tarefas para melhorar isso. Pode até mesmo criar tarefas para lembrar de beber água. Uma infinidade de possibilidades aguardam você!
            </p>
          </div>
        </main>

        <div className={styles.about}>
          <div>
            <div>
              <h1>
                <hr/>
                Origem
              </h1>

              <br/>

              <p>
                Sua primeira versão foi criada em 29 de fevereiro de 2021 como apenas uma forma de estudo, porém seu melhoramente contínuo evoluiu para um sistema independente.
                <br/>
                <br/>
                Baseado na técnica de produtividade chamada 'Pomodoro' em que temos ciclos de 25 minutos e intervalos de 5 minutos para intensidade e relaxamente. O Move.it tem o mesmo objetivo, porém você tem controle de tarefas que podem ajudar em sua produtividade.
                <br/>
                <br/>
                O principal exemplo de uso seria para pessoas que necessitam ficar constantemente sentados no trabalho home-office, com isso pode surgir problemas em relação a coluna, então pode criar suas tarefas de alongamento ou exercícios para ajudar e evitar problemas.
              </p>
            </div>

            <img src="/tela-login.png" alt="Tela"/>
          </div>

          <div>
            <div>
              <h1>
                <hr/>
                Por que usar?
              </h1>

              <br/>

              <p>
                Torne mais divertido a forma como você faz algo! Seu trabalho ou seu estudo, não importa o que seja.
              <br/>
              <br/>
                Tenha experiência, tenha Level e tenho vários desafios completos, você que está no controle e pode usar isso de várias formas, mas principalmente vai te ajudar em qualquer tarefa que você for fazer! Se junte a comunidade Move.it!
              </p>
            </div>

            <img src="/tela-dash.png" alt="Tela"/>
          </div>

        </div>

        <Footer />
      </div>
    </>
  );
}