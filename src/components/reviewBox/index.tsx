import styles from './ReviewBox.module.scss';
import {
  ZeroRating,
  OneRating,
  TwoRating,
  ThreeRating,
  FourRating,
  FiveRating,
} from '../travelbox/circle';

interface ReviewBoxProps {
  rating: number;
  user: string;
  date: string;
  content: string;
  imageUrl?: string;
}

function ReviewBox({ rating, user, date, content, imageUrl }: ReviewBoxProps) {
  const Rating = () => {
    switch (Math.round(rating)) {
      case 0:
        return <ZeroRating />;
      case 1:
        return <OneRating />;
      case 2:
        return <TwoRating />;
      case 3:
        return <ThreeRating />;
      case 4:
        return <FourRating />;
      case 5:
        return <FiveRating />;
      default:
        return <FiveRating />;
    }
  };
  return (
    <div className={styles.reviewBox}>
      <Rating />
      <span className={styles.reviewUser}>{user}</span>
      <span className={styles.reviewDate}>{date}</span>
      {imageUrl && (
        <div className={styles.reviewImg}>
          <img src={imageUrl} alt="reiviewImg" className={styles.travelImg} />
        </div>
      )}

      <span className={styles.reviewContent}>{content}</span>
      <div className={styles.bar} />
    </div>
  );
}

export default ReviewBox;
