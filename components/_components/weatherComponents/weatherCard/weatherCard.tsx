import styles from "./weatherCard.module.scss";
import Image from "next/image";

interface WeatherData {
  day: string;
  temp: number;
  icon: string;
}

export default function WeatherCard({ data }: { data: WeatherData }) {
  return (
    <div className={styles.card}>
      <div className={styles.titleWrapper}>
        <h3 className={styles.card__title}>{data.day}</h3>
      </div>
      <Image className={styles.icon} src={data.icon} alt={data.day} width={50} height={50} />
      <p className={styles.temp}>{data.temp}&deg;</p>
    </div>
  );
}
