import styles from './TravelBox.module.scss';

import { useNavigate } from 'react-router-dom';

interface TravelBoxProps {
  id: number;
  imgSrc?: string;
  title?: string;
  description?: string;
  similarity: number;
}

function TravelBox({
  id,
  imgSrc,
  title,
  description,
  similarity,
}: TravelBoxProps) {
  const navigate = useNavigate();

  // const Rating = () => {
  //   switch (Math.round(rating || 0)) {
  //     case 0:
  //       return <ZeroRating />;
  //     case 1:
  //       return <OneRating />;
  //     case 2:
  //       return <TwoRating />;
  //     case 3:
  //       return <ThreeRating />;
  //     case 4:
  //       return <FourRating />;
  //     case 5:
  //       return <FiveRating />;
  //     default:
  //       return <FiveRating />;
  //   }
  // };
  const handleClickBox = () => {
    navigate(`/destination/${id}`);
  };
  return (
    <div className={styles.travelBox} onClick={handleClickBox}>
      <div className={styles.travelImg}>
        <img src={imgSrc} alt="travel" />
      </div>
      <div className={styles.travelContent}>
        <div className={styles.travelTitle}>
          {title}&nbsp;&nbsp;
          <span className={styles.similiarity}>
            유사도 {Math.round(similarity * 10000) / 100}%
          </span>
        </div>
        {/* <div className={styles.ratingWrapper}>
          <span>{rating}</span>
          <Rating />
          <span className={styles.reviewCnt}>{reviewCount}건의 리뷰</span>
        </div> */}
        <span className={styles.travelDescription}>{description || ''}</span>
      </div>
    </div>
  );
}

export default TravelBox;
