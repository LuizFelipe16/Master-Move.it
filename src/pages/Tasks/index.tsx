import Head from 'next/head';
import Sidebar from '../../components/Sidebar';
import { FaPlus, FaEdit } from 'react-icons/fa';

import styles from '../../styles/pages/Tasks.module.css';
import { FormEvent, useEffect, useState } from 'react';
import api from '../../services/api';
import Cookies from 'js-cookie';
import { notifyError, notifySuccess } from '../../utils/configToast';
import { ToastContainer } from 'react-toastify';

interface Task {
  id: number;
  amount: number;
  description: string;
  type: string;
}

export default function Tasks() {
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const [tasks, setTasks] = useState([]);

  const [isUpdate, setIsUpdate] = useState(false);
  const [idTaskForUpdate, setIdTaskForUpdate] = useState(0);

  const id = Cookies.get('user_id');
  const token = Cookies.get('token');

  async function handleCreateTask(event: FormEvent) {
    event.preventDefault();

    await api.post(`/tasks/${id}`, {
      description,
      difficulty,
      type: 'body',
    }, {
      headers: {
        Authorization: `bearer ${token}`
      }
    }).then((response) => {
      notifySuccess(response.data.message);

      handleGetTasks();

      setDescription('');
      setDifficulty('');
    }).catch((response) => {
      notifyError(response.data.error);
    });
  }

  async function handleGetTasks() {
    await api.get(`/tasks/${id}`, {
      headers: {
        Authorization: `bearer ${token}`
      }
    }).then((response) => {
      setTasks(response.data);
    }).catch((response) => {
      notifyError(response.data.error);
    });
  }

  async function handleDeleteTask(id: number) {
    await api.delete(`/tasks/${id}`, {
      headers: {
        Authorization: `bearer ${token}`
      }
    }).then((response) => {
      notifySuccess(response.data.message);

      handleGetTasks();
    }).catch((response) => {
      notifyError(response.data.error);
    });
  }

  async function handleSetStatesForUpdateTask(description: string, amount: number, id: number) {
    setDescription(description);
    setIdTaskForUpdate(id);
    setIsUpdate(true);
    
    if(amount === 350) {
      setDifficulty('very-hard');
    }
  
    if(amount === 200) {
      setDifficulty('hard');
    }
  
    if(amount === 100) {
      setDifficulty('average');
    }
  
    if(amount === 70) {
      setDifficulty('easy');
    }
  }

  async function handleUpdateTask(event: FormEvent) {
    event.preventDefault();
    
    await api.put(`/tasks/${idTaskForUpdate}`, {
      description,
      difficulty,
      user_id: id
    }, {
      headers: {
        Authorization: `bearer ${token}`
      }
    }).then((response) => {
      notifySuccess(response.data.message);

      setIsUpdate(false);
      setDescription('');
      setDifficulty('');
      setIdTaskForUpdate(0);

      handleGetTasks();
    }).catch((response) => {
      notifyError(response.data.error);
    });
  }

  useEffect(() => {
    handleGetTasks();
  }, [id, token]);

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Tarefas | Move.it</title>
        </Head>

        <Sidebar activePageTasks={true} />

        <div className={styles.tasks}>
          <h1>Adicione uma Tarefa</h1>

          <form onSubmit={isUpdate ? handleUpdateTask : handleCreateTask} className={styles.addContainer}>
            <input
              value={description}
              onChange={e => setDescription(e.target.value)}
              style={{ width: '55%' }}
              type="text"
              placeholder="Qual é a sua tarefa?"
            />

            <select
              value={difficulty}
              onChange={e => setDifficulty(e.target.value)}
              style={{ width: '20%' }}
            >
              <option hidden value="">Dificuldade da Tarefa</option>
              <option value="very-hard">Muito Difícil</option>
              <option value="hard">Difícil</option>
              <option value="average">Médio</option>
              <option value="easy">Fácil</option>
            </select>
            
            <button type="submit">
              {
                isUpdate ? <FaEdit /> : <FaPlus />
              }
            </button>
          </form>

          <br />
          <br />

          <h1>Tarefas</h1>

          <div className={styles.containerTitleTasks}>
            <h1>
              EXPERIÊNCIA
            </h1>

            <p>
              DESCRIÇÃO
            </p>

            <strong>
              OPÇÕES
            </strong>
          </div>

          {
            tasks.map((task: Task) => {
              return (
                <div className={styles.containerTask}>
                  <h1>
                    {task.amount}px
                  </h1>

                  <p>
                    {task.description}
                  </p>

                  <div>
                    <button 
                      className={styles.delete} 
                      type="button"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      X
                    </button>
                    <button 
                      className={styles.edit} 
                      type="button"
                      onClick={() => handleSetStatesForUpdateTask(task.description, task.amount, task.id)}
                    >
                      <FaEdit />
                    </button>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>

      <ToastContainer />
    </>
  );
}