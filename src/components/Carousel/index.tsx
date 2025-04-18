import styles from './Carousel.module.scss';
import rightArrow from '@/assets/rightarrow.svg';
import leftArrow from '@/assets/leftarrow.svg';
import { useState } from 'react';

const mockData = [
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/7a/be/64/photo6jpg.jpg?w=1200&h=-1&s=1',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/33/f3/cf/caption.jpg?w=1200&h=-1&s=1',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/bf/02/f6/nui-son-tra.jpg?w=1200&h=-1&s=1',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/bc/ad/20/danang-marble-mountains.jpg?w=1200&h=-1&s=1',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/ff/d4/40/da-nang.jpg?w=1200&h=-1&s=1',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/e9/68/ca/da-nang.jpg?w=1200&h=-1&s=1',
];

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleCurrentIndex = (index: number) => {
    if (index <= 0) {
      setCurrentIndex(0);
    } else if (index >= mockData.length) {
      setCurrentIndex(mockData.length - 1);
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
    currentIndex === mockData.length - 1 ? styles.disabled : styles.rightArrow;
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
        <img src={mockData[currentIndex]} alt="여행지" />
      </div>
    </div>
  );
}

export default Carousel;
