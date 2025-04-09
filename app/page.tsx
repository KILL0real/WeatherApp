import styles from "./page.module.scss";
import WeatherTabs from "../components/_components/weatherComponents/weatherTabs/weatherTabs";
import RainChart from "../components/_components/rainChart/rainChart";
export default function HomePage() {
  return (
    <main className={styles.weather}>
      <div className={styles.weather__wrapper}>
        <WeatherTabs />

        <RainChart />
      </div>
    </main>
  );
}
