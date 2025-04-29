import styles from "./SearchBar.module.scss";
import searchIcon from "@/assets/search.svg";
import imageIcon from "@/assets/image.svg";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();
  console.log(image);
  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const query = (event.target as HTMLInputElement).value;
      navigate(`/search?term=${query}`);
    }
  };
  const handleImageClick = () => {
    inputRef.current?.click();
  };
  return (
    <div className={styles.searchBar}>
      <img
        src={imageIcon}
        alt="search"
        className={styles.imageIcon}
        onClick={handleImageClick}
      />
      <img src={searchIcon} alt="search" className={styles.searchIcon} />
      <input
        type="file"
        accept="image/*"
        hidden
        ref={inputRef}
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />
      <input
        type="text"
        placeholder="여행지 설명을 작성해주세요"
        className={styles.input}
        onKeyDown={(e) => {
          handleSearch(e);
        }}
      />
      {image && (
        <div className={styles.imagePreview}>
          <img
            src={URL.createObjectURL(image)}
            alt="preview"
            className={styles.previewImage}
          />
        </div>
      )}
    </div>
  );
}

export default SearchBar;
