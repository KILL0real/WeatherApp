"use client";

import styles from "./switch.module.scss";
import { useState } from "react";

export default function Switch() {
  const [active, setActive] = useState<"forecast" | "air">("forecast");

  const handleClick = (tab: "forecast" | "air") => {
    if (tab === active) {
      setActive(tab === "forecast" ? "air" : "forecast");
    } else {
      setActive(tab);
    }
  };

  return (
    <div className={styles.switch}>
      <div
        className={styles.slider}
        style={{
          transform:
            active === "forecast" ? "translateX(0%)" : "translateX(100%)",
        }}
      />
      <button
        className={`${styles.button} ${
          active === "forecast" ? styles.active : ""
        }`}
        onClick={() => handleClick("forecast")}
      >
        Forecast
      </button>
      <button
        className={`${styles.button} ${active === "air" ? styles.active : ""}`}
        onClick={() => handleClick("air")}
      >
        Air Quality
      </button>
    </div>
  );
}
