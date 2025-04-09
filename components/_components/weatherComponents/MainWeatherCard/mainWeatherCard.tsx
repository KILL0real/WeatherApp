import styles from "./mainWeatherCard.module.scss";
import Image from "next/image";

export default function MainWeatherCard() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2>Today</h2>
        <h3>11:45 AM</h3>
      </div>
      <div className={styles.details}>
        <div>
          <span className={styles.details__temp}>23°C</span>
          <Image
            src="/images/Icons/SunnnyWindyIcon.svg"
            alt="sun"
            width={66}
            height={53}
          />
        </div>
        <div>
          <span className={styles.details__description}>
            Real Feel
            <span className={styles.details__description__bold}>18°</span>
          </span>
        </div>
        <div>
          <span className={styles.details__description}>
            Wind N-E.
            <span className={styles.details__description__bold}>6-7km/h</span>
          </span>
          <span className={styles.details__description}>
            Sunrise
            <span className={styles.details__description__bold}>5:30AM</span>
          </span>
        </div>
        <div>
          <span className={styles.details__description}>
            Pressure
            <span className={styles.details__description__bold}>100MB</span>
          </span>
          <span className={styles.details__description}>
            Sunset
            <span className={styles.details__description__bold}>6:45</span>
          </span>
        </div>
        <div>
          <span className={styles.details__description}>
            Humidity
            <span className={styles.details__description__bold}>51%</span>
          </span>
        </div>
      </div>
    </div>
  );
}
