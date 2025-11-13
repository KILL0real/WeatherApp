import Image from "next/image";
import styles from "./todayWeatherCard.module.scss";

interface TodayWeatherCardProps {
	data: any; // OpenWeather API response
	todayInfo: any;
}

export default function TodayWeatherCard({ data, todayInfo }: TodayWeatherCardProps) {
	const nowItem = data?.list?.[0];
	const cityInfo = data?.city;

	if (!nowItem || !cityInfo) {
		return <div className={styles.card}>Дані відсутні</div>;
	}

	const main = nowItem.main;
	const weather = nowItem.weather?.[0];
	const wind = nowItem.wind;
	const iconUrl = weather?.icon
		? `https://openweathermap.org/img/wn/${weather.icon}@2x.png`
		: "/images/Icons/Sunny2.svg"; // fallback

	const windDir = (deg: number) => {
		const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
		return dirs[Math.round(deg / 45) % 8];
	};

	const now = new Date().toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
	});
	const sysInfo = todayInfo?.sys;
	const sunrise = sysInfo?.sunrise
		? new Date(sysInfo.sunrise * 1000).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
		  })
		: "—";

	const sunset = sysInfo?.sunset
		? new Date(sysInfo.sunset * 1000).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
		  })
		: "—";

	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<h2>Today</h2>
				<h3>{now}</h3>
			</div>

			<div className={styles.details}>
				{/* Температура + іконка */}
				<div>
					<span className={styles.details__temp}>{Math.round(main.temp)}°C</span>
					<Image
						src={iconUrl}
						alt={weather?.description || "weather"}
						width={66}
						height={53}
					/>
				</div>

				{/* Real Feel */}
				<div>
					<span className={styles.details__description}>
						Real Feel{" "}
						<span className={styles.details__description__bold}>
							{Math.round(main.feels_like)}°
						</span>
					</span>
				</div>

				{/* Вітер + Sunrise */}
				<div>
					<span className={styles.details__description}>
						Wind {windDir(wind.deg)}{" "}
						<span className={styles.details__description__bold}>{wind.speed} m/s</span>
					</span>
					<span className={styles.details__description}>
						Sunrise <span className={styles.details__description__bold}>{sunrise}</span>
					</span>
				</div>

				{/* Тиск + Sunset */}
				<div>
					<span className={styles.details__description}>
						Pressure <span className={styles.details__description__bold}>{main.pressure} hPa</span>
					</span>
					<span className={styles.details__description}>
						Sunset <span className={styles.details__description__bold}>{sunset}</span>
					</span>
				</div>

				{/* Вологість */}
				<div>
					<span className={styles.details__description}>
						Humidity <span className={styles.details__description__bold}>{main.humidity}%</span>
					</span>
				</div>
			</div>
		</div>
	);
}
