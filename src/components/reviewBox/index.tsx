import styles from "./ReviewBox.module.scss";

interface ReviewBoxProps {
  user: string;
  date: string;
  content: string;
  imageUrl?: string;
}

function ReviewBox({ user, date, content, imageUrl }: ReviewBoxProps) {
  return (
    <div className={styles.reviewBox}>
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
