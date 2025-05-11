import styles from './Carousel.module.scss';
import rightArrow from '@/assets/rightarrow.svg';
import leftArrow from '@/assets/leftarrow.svg';
import { useState } from 'react';

interface CarouselProps {
  images:
    | {
        id: number;
        index: number;
        dataurl: string;
      }[]
    | undefined;
}
function Carousel({ images }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = images ? images.length : 0;

  const handleCurrentIndex = (index: number) => {
    if (index <= 0) {
      setCurrentIndex(0);
    } else if (index >= maxIndex) {
      setCurrentIndex(maxIndex - 1);
    } else {
      setCurrentIndex(index);
    }
  };
  const handleLeftArrowClick = () => {
    handleCurrentIndex(currentIndex - 1);
  };
  const handleRightArrowClick = () => {
    handleCurrentIndex(currentIndex + 1);
  };
  const leftArrowStyle =
    currentIndex === 0 ? styles.disabled : styles.leftArrow;
  const rightArrowStyle =
    currentIndex === maxIndex - 1 ? styles.disabled : styles.rightArrow;
  return (
    <div className={styles.carouselWrapper}>
      <img
        src={rightArrow}
        alt="rightArrow"
        className={rightArrowStyle}
        onClick={handleRightArrowClick}
      />
      <img
        src={leftArrow}
        alt="leftArrow"
        className={leftArrowStyle}
        onClick={handleLeftArrowClick}
      />
      <div className={styles.carouselContent}>
        {images && <img src={images[currentIndex]?.dataurl} alt="여행지" />}
        {/* <img src={mockData[currentIndex]} alt="여행지" /> */}
      </div>
    </div>
  );
}

export default Carousel;
