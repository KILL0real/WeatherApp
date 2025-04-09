// components/WeatherTabs/WeatherTabs.tsx
"use client";

import { useState } from "react";
import styles from "./weatherTabs.module.scss";
import WeatherCard from "../weatherCard/weatherCard";
import MainWeatherCard from "../MainWeatherCard/mainWeatherCard";
import Switch from "../../switch/switch";

const mockData = [
  { day: "FRI", temp: 16, icon: "/images/Icons/Sunny.svg" },
  { day: "SAT", temp: 10, icon: "/images/Icons/Rainy-Sunny.svg" },
  { day: "SUN", temp: 15, icon: "/images/Icons/Sunny.svg" },
  { day: "MON", temp: 11, icon: "/images/Icons/Sunny2.svg" },
  { day: "TUE", temp: 10, icon: "/images/Icons/Rainy.svg" },
  { day: "WED", temp: 12, icon: "/images/Icons/RainySunny1.svg" },
  { day: "THU", temp: 10, icon: "/images/Icons/Windy.svg" },
];

export default function WeatherTabs() {
  const [activeTab, setActiveTab] = useState<"today" | "tomorrow" | "week">(
    "week"
  );

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.tabs}>
          <button
            onClick={() => setActiveTab("today")}
            className={activeTab === "today" ? styles.active : ""}
          >
            Today
          </button>
          <button
            onClick={() => setActiveTab("tomorrow")}
            className={activeTab === "tomorrow" ? styles.active : ""}
          >
            Tomorrow
          </button>
          <button
            onClick={() => setActiveTab("week")}
            className={activeTab === "week" ? styles.active : ""}
          >
            Next 7 days
          </button>
        </div>
        <Switch />
      </div>

      <div className={styles.content}>
        {activeTab === "today" && <MainWeatherCard />}
        {activeTab === "tomorrow" && <MainWeatherCard />}

        {activeTab === "week" && (
          <>
            <MainWeatherCard />
            <div className={styles.cardFlex}>
              {mockData.slice(1).map((item, index) => (
                <WeatherCard key={index} data={item} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
