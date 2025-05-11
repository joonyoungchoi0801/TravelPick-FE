import styles from "./TravelBox.module.scss";
import circle from "@/assets/circle.svg";
import colorCircle from "@/assets/colorcircle.svg";

export const ZeroRating = () => {
  return (
    <div className={styles.rating}>
      <img src={circle} alt="circle" className={styles.circle} />
      <img src={circle} alt="circle" className={styles.circle} />
      <img src={circle} alt="circle" className={styles.circle} />
      <img src={circle} alt="circle" className={styles.circle} />
      <img src={circle} alt="circle" className={styles.circle} />
    </div>
  );
};
export const OneRating = () => {
  return (
    <div className={styles.rating}>
      <img src={colorCircle} alt="colorCirlce" className={styles.circle} />
      <img src={circle} alt="circle" className={styles.circle} />
      <img src={circle} alt="circle" className={styles.circle} />
      <img src={circle} alt="circle" className={styles.circle} />
      <img src={circle} alt="circle" className={styles.circle} />
    </div>
  );
};

export const TwoRating = () => {
  return (
    <div className={styles.rating}>
      <img src={colorCircle} alt="colorCircle" className={styles.circle} />
      <img src={colorCircle} alt="colorCircle" className={styles.circle} />
      <img src={circle} alt="circle" className={styles.circle} />
      <img src={circle} alt="circle" className={styles.circle} />
      <img src={circle} alt="circle" className={styles.circle} />
    </div>
  );
};

export const ThreeRating = () => {
  return (
    <div className={styles.rating}>
      <img src={colorCircle} alt="colorCircle" className={styles.circle} />
      <img src={colorCircle} alt="colorCircle" className={styles.circle} />
      <img src={colorCircle} alt="colorCircle" className={styles.circle} />
      <img src={circle} alt="circle" className={styles.circle} />
      <img src={circle} alt="circle" className={styles.circle} />
    </div>
  );
};

export const FourRating = () => {
  return (
    <div className={styles.rating}>
      <img src={colorCircle} alt="colorCircle" className={styles.circle} />
      <img src={colorCircle} alt="colorCircle" className={styles.circle} />
      <img src={colorCircle} alt="colorCircle" className={styles.circle} />
      <img src={colorCircle} alt="colorCircle" className={styles.circle} />
      <img src={circle} alt="circle" className={styles.circle} />
    </div>
  );
};

export const FiveRating = () => {
  return (
    <div className={styles.rating}>
      <img src={colorCircle} alt="colorCircle" className={styles.circle} />
      <img src={colorCircle} alt="colorCircle" className={styles.circle} />
      <img src={colorCircle} alt="colorCircle" className={styles.circle} />
      <img src={colorCircle} alt="colorCircle" className={styles.circle} />
      <img src={colorCircle} alt="colorCircle" className={styles.circle} />
    </div>
  );
};
