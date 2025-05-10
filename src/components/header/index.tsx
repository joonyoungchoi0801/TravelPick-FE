import { useState } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from '../searchbar';
import styles from './Header.module.scss';
import SigninModal from '../modal/signin';
import SignupModal from '../modal/signup';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [isSigninModalOpen, setSigninModalOpen] = useState(false);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);
  const isLogin = localStorage.getItem('isLogin') === 'true';
  const name = localStorage.getItem('name') || '';

  const handleLogin = async () => {
    if (isLogin) {
      localStorage.removeItem('isLogin');
      localStorage.removeItem('name');
      try {
        const apiUrl = import.meta.env.VITE_AUTH_URL;
        await fetch(`${apiUrl}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        alert('로그아웃 되었습니다.');
        navigate('/home');
      } catch (error) {
        alert('로그아웃에 실패했습니다.');
      }
    } else {
      setSigninModalOpen(!isSigninModalOpen);
    }
  };
  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.header}>
          <div className={styles.nav}>
            <div className={styles.logo} onClick={() => navigate('/home')}>
              TRAVELPICK
            </div>
            {/* <div className={styles.menu}>
              <button className={styles.menuButton}>여행지 추가</button>
            </div> */}
            <button
              className={styles.loginButton}
              onClick={() => handleLogin()}
            >
              {isLogin ? `${name}님 환영합니다!` : '로그인'}
            </button>
          </div>
        </div>
        <div className={styles.searchBarContainer}>
          <SearchBar />
        </div>
        {isSigninModalOpen &&
          ReactDOM.createPortal(
            <SigninModal
              onClose={() => setSigninModalOpen(false)}
              setSignupModalOpen={() => {
                setSignupModalOpen(true);
                setSigninModalOpen(false);
              }}
            />,
            document.getElementById('modal-root') as HTMLElement
          )}
        {isSignupModalOpen &&
          ReactDOM.createPortal(
            <SignupModal
              onClose={() => setSignupModalOpen(false)}
              setLoginModalOpen={() => {
                setSignupModalOpen(false);
                setSigninModalOpen(true);
              }}
            />,
            document.getElementById('modal-root') as HTMLElement
          )}
      </div>
    </>
  );
}

export default Header;
