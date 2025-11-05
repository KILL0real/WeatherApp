import Image from "next/image";
import styles from "./tomorrowWeatherCard.module.scss";
export default function TomorrowWeatherCard() {
	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<h2>Tomorrow</h2> <h3>11:45 AM</h3>
			</div>
			<div className={styles.details}>
				<div>
					<span className={styles.details__temp}>16°C</span>
					<Image
						src="/images/Icons/Windy.svg"
						alt="sun"
						width={60}
						height={53}
					/>
				</div>
				<div>
					<span className={styles.details__description}>
						{" "}
						Real Feel <span className={styles.details__description__bold}>13°</span>
					</span>
				</div>
				<div>
					<span className={styles.details__description}>
						Wind N-E. <span className={styles.details__description__bold}>14-18km/h</span>
					</span>
					<span className={styles.details__description}>
						Sunrise <span className={styles.details__description__bold}>5:40AM</span>
					</span>
				</div>
				<div>
					<span className={styles.details__description}>
						Pressure <span className={styles.details__description__bold}>90MB</span>
					</span>
					<span className={styles.details__description}>
						Sunset <span className={styles.details__description__bold}>6:30</span>
					</span>
				</div>
				<div>
					<span className={styles.details__description}>
						Humidity <span className={styles.details__description__bold}>71%</span>
					</span>
				</div>
			</div>
		</div>
	);
}
