import styles from './SearchBar.module.scss';
import searchIcon from '@/assets/search.svg';
import imageIcon from '@/assets/image.svg';

function SearchBar() {
  return (
    <div className={styles.searchBar}>
      <img src={imageIcon} alt="search" className={styles.imageIcon} />
      <img src={searchIcon} alt="search" className={styles.searchIcon} />
      <input
        type="text"
        placeholder="여행지 설명을 작성해주세요"
        className={styles.input}
      />
      <input type="image" hidden />
    </div>
  );
}

export default SearchBar;
