import SearchBar from '../searchbar';
import styles from './Header.module.scss';

function Header() {
  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.header}>
          <div className={styles.nav}>
            <div className={styles.logo}>TRAVELPICK</div>
            <div className={styles.menu}>
              <button className={styles.menuButton}>여행지</button>
              <button className={styles.menuButton}>여행지 추가</button>
            </div>
            <button className={styles.loginButton}>로그인</button>
          </div>
        </div>
        <div className={styles.searchBarContainer}>
          <SearchBar />
        </div>
      </div>
    </>
  );
}

export default Header;

// <header className="fixed top-0 left-0 right-0 flex items-center justify-center w-full h-[60px] border-b border-[color:var(--color-gray)] px-[calc((100vw-80rem)/2)]">
//       <div className="flex items-center justify-between w-full ">
//         <div className="flex items-center">TRAVELPICK</div>
//         <div className="flex items-center gap-[1rem]">
//           <button className="inline-block px-4 py-2 hover:bg-gray-200 rounded text-[1rem]">
//             여행지
//           </button>

//           <button className="inline-block px-4 py-2 hover:bg-gray-200 rounded text-[1rem]">
//             여행지 추가
//           </button>
//         </div>
//         <button className="flex items-center">로그인</button>
//       </div>
//     </header>
