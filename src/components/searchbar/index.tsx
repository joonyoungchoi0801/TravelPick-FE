import styles from './SearchBar.module.scss';
import searchIcon from '@/assets/search.svg';
import imageIcon from '@/assets/image.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
interface LocationState {
  file?: File;
  previewUrl?: string;
}
function SearchBar() {
  const location = useLocation();
  const { file } = (location.state || {}) as LocationState;
  const params = new URLSearchParams(location.search);
  const searchTerm = params.get('term');
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(file || null);
  const [query, setQuery] = useState<string>(searchTerm || '');
  const navigate = useNavigate();

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const previewUrl = image ? URL.createObjectURL(image) : undefined;

      navigate(`/search?term=${encodeURIComponent(query)}`, {
        state: { file: image, previewUrl },
      });
    }
  };
  const handleNavigate = () => {
    const previewUrl = image ? URL.createObjectURL(image) : undefined;

    navigate(`/search?term=${encodeURIComponent(query)}`, {
      state: { file: image, previewUrl },
    });
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
      <img
        src={searchIcon}
        alt="search"
        className={styles.searchIcon}
        onClick={handleNavigate}
      />

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
        onChange={(e) => setQuery(e.target.value)}
        value={query}
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
