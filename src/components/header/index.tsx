import { useState } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from '../searchbar';
import styles from './Header.module.scss';
import SigninModal from '../modal/signin';
import SignupModal from '../modal/signup';

function Header() {
  const [isSigninModalOpen, setSigninModalOpen] = useState(false);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);

  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.header}>
          <div className={styles.nav}>
            <div className={styles.logo}>TRAVELPICK</div>
            <div className={styles.menu}>
              <button className={styles.menuButton}>여행지 추가</button>
            </div>
            <button
              className={styles.loginButton}
              onClick={() => setSigninModalOpen(!isSigninModalOpen)}
            >
              로그인
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
