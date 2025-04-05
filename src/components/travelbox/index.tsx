import styles from "./TravelBox.module.scss";
import img from "@/assets/image.svg";

function TravelBox() {
  return (
    <div className={styles.travelBox}>
      <div className={styles.travelImg}>
        <img src={img} alt="travel" />
      </div>
      <div className={styles.travelContent}>
        <h2>Travel</h2>
        <p>Explore the world with us</p>
      </div>
    </div>
  );
}

export default TravelBox;
