import styles from "./TravelBox.module.scss";
import img from "@/assets/image.svg";
import {
  ZeroRating,
  OneRating,
  TwoRating,
  ThreeRating,
  FourRating,
  FiveRating,
} from "./circle";
import { useState } from "react";

function TravelBox() {
  const [rating, setRating] = useState(4.5);
  const [reviewCount, setReviewCount] = useState(1200);
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
    <div className={styles.travelBox}>
      <div className={styles.travelImg}>
        <img src={img} alt="travel" />
      </div>
      <div className={styles.travelContent}>
        <div className={styles.travelTitle}>서울</div>
        <div className={styles.ratingWrapper}>
          <span>{rating}</span>
          <Rating />
          <span className={styles.reviewCnt}>{reviewCount}건의 리뷰</span>
        </div>
        <span className={styles.travelDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
          efficitur, nunc nec tincidunt facilisis, nisl nunc aliquet nunc, eget
          aliquam nunc nisl euismod nunc. 여러 줄에 걸쳐 텍스트를 표시하면서
          넘치는 부분을 말줄임표(...)로 처리하려면, CSS의 -webkit-line-clamp
          속성을 사용하는 방법이 일반적입니다. 이 방법은 대부분의 웹킷 계열
          브라우저(Chrome, Safari 등)에서 동작하며, 다른 브라우저에서는 최근
          지원 여부를 확인해야 합니다. 아래 예제는 최대 3줄까지 표시하고, 3줄을
          초과하면 말줄임표로 처리하는 방법입니다: 여러 줄에 걸쳐 텍스트를
          표시하면서 넘치는 부분을 말줄임표(...)로 처리하려면, CSS의
          -webkit-line-clamp 속성을 사용하는 방법이 일반적입니다. 이 방법은
          대부분의 웹킷 계열 브라우저(Chrome, Safari 등)에서 동작하며, 다른
          브라우저에서는 최근 지원 여부를 확인해야 합니다. 아래 예제는 최대
          3줄까지 표시하고, 3줄을 초과하면 말줄임표로 처리하는 방법입니다:
        </span>
      </div>
    </div>
  );
}

export default TravelBox;
