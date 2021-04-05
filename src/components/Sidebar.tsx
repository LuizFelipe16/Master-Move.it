import Link from 'next/link';
import { FaMedal, FaHome, FaUserAlt, FaTasks } from 'react-icons/fa';
import { AiOutlineLogout } from 'react-icons/ai';

import styles from '../styles/components/Sidebar.module.css';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

interface SidebarProps {
  activePageHome?: boolean;
  activePageLeaderBoard?: boolean;
  activePageProfile?: boolean;
  activePageTasks?: boolean;
  activePageUser?: boolean;
}

export default function Sidebar(props: SidebarProps) {
  const router = useRouter();
  
  function handleLogout() {
    Cookies.remove('token');
    Cookies.remove('user_name');
    Cookies.remove('user_id');
    Cookies.remove('user_email');
    Cookies.remove('isUserOnline');
    router.push('/Login');
  }
  
  return (
    <aside className={styles.sidebar}>
      <img src="/logo-sidebar.svg" alt="Logo" />

      <div className={styles.linksContainer}>
        <Link href="/Dashboard">
          <a className={props.activePageHome ? styles.linkActive : styles.link}>
            <FaHome size={30} />
          </a>
        </Link>
        
        <Link href="/Tasks">
          <a className={props.activePageTasks ? styles.linkActive : styles.link}>
            <FaTasks size={30} />
          </a>
        </Link>

        <Link href="/Profile">
          <a className={props.activePageProfile ? styles.linkActive : styles.link}>
            <FaMedal size={30} />
          </a>
        </Link>
        
        <Link href="/User">
          <a className={props.activePageUser ? styles.linkActive : styles.link}>
            <FaUserAlt size={30} />
          </a>
        </Link>
      </div>

      <div className={styles.logoutContainer}>
        <button onClick={handleLogout} type="button" className={styles.logout}>
          <AiOutlineLogout size={25} />
        </button>
      </div>
    </aside>
  );
}