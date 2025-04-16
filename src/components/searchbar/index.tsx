import styles from "./SearchBar.module.scss";
import searchIcon from "@/assets/search.svg";
import imageIcon from "@/assets/image.svg";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate();
  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const query = (event.target as HTMLInputElement).value;
      navigate(`/search?term=${query}`);
    }
  };
  return (
    <div className={styles.searchBar}>
      <img src={imageIcon} alt="search" className={styles.imageIcon} />
      <img src={searchIcon} alt="search" className={styles.searchIcon} />
      <input
        type="text"
        placeholder="여행지 설명을 작성해주세요"
        className={styles.input}
        onKeyDown={(e) => {
          handleSearch(e);
        }}
      />
      <input type="image" hidden />
    </div>
  );
}

export default SearchBar;
