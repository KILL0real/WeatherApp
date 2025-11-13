"use client";

import { useEffect, useState } from "react";
import RainChart from "../components/_components/rainChart/rainChart";
import { MiniCards } from "../components/_components/weatherComponents/miniCards/miniCards";
import { Card } from "../components/_components/weatherComponents/scoreCards/scoreCards";
import WeatherTabs from "../components/_components/weatherComponents/weatherTabs/weatherTabs";
import { useCity } from "./context/CityContext";
import styles from "./page.module.scss";

const API_KEY = "18c33f3b062a649caf576b350c9a0b9f";

export default function HomePage() {
	const { city, setCountry } = useCity();
	const [activeTab, setActiveTab] = useState<"today" | "week">("week");
	const [weatherData, setWeatherData] = useState<any | null>(null);
	const [currentWeather, setCurrentWeather] = useState<any | null>(null);
	const [extraData, setExtraData] = useState<any | null>(null);
	const [popularData, setPopularData] = useState<any[]>([]);

	const popularCities = ["Kyiv", "London", "New York", "Tokyo"];

	// ✅ 1. Отримуємо прогноз і поточну погоду одночасно
	useEffect(() => {
		if (!city) return;

		const fetchWeather = async () => {
			try {
				const [forecastRes, currentRes] = await Promise.all([
					fetch(
						`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`,
					),
					fetch(
						`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`,
					),
				]);

				const forecastData = await forecastRes.json();
				const currentData = await currentRes.json();

				if (forecastData?.city?.country) {
					setCountry(forecastData.city.country);
				}

				const todayForecast = forecastData.list?.[0];
				setWeatherData({
					id: forecastData.city.id,
					city: forecastData.city.name,
					country: forecastData.city.country,
					temp: todayForecast ? Math.round(todayForecast.main.temp) : null,
					icon: todayForecast
						? `https://openweathermap.org/img/wn/${todayForecast.weather[0].icon}@2x.png`
						: null,
					list: forecastData.list,
					cityInfo: forecastData.city,
				});
				const { lat, lon } = currentData.coord;
				const uvRes = await fetch(
					`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${API_KEY}`,
				);
				const uvData = await uvRes.json();
				const uvIndex = uvData.current?.uvi ?? "–";
				setCurrentWeather({ ...currentData, uvIndex });
			} catch (error) {
				console.error("❌ Помилка завантаження даних:", error);
			}
		};

		fetchWeather();
	}, [city]);

	// ✅ 2. Популярні міста
	useEffect(() => {
		if (popularCities.length === 0) return;

		const fetchPopularCities = async () => {
			try {
				const promises = popularCities.map(async (cityName) => {
					const res = await fetch(
						`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`,
					);
					const data = await res.json();
					return {
						id: data.id,
						city: data.name,
						temp: Math.round(data.main.temp),
						icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
					};
				});

				const results = await Promise.all(promises);
				setPopularData(results);
			} catch (error) {
				console.error("❌ Помилка завантаження популярних міст:", error);
			}
		};

		fetchPopularCities();
	}, []);

	if (!weatherData || !currentWeather) {
		return (
			<main className={styles.weather}>
				<p style={{ textAlign: "center", color: "gray" }}>Loading weather for {city}...</p>
			</main>
		);
	}

	// --- Секція Cards залишилась без змін ---
	const today = weatherData?.list?.[0];
	const windSpeed = today?.wind?.speed ?? null;
	const windDeg = today?.wind.deg ?? null;
	const humidity = today?.main?.humidity;
	const visibility = currentWeather?.visibility != null ? currentWeather.visibility / 1000 : null;
	const uvIndex = currentWeather?.uvIndex ?? "—";
	const pressure = extraData?.current?.pressure ?? today?.main?.pressure ?? "—";
	const dewPoint = extraData?.current?.dew_point ?? "—";

	const getWindDirection = (deg: number) => {
		const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
		return dirs[Math.round(deg / 45) % 8];
	};

	const cards = [
		{
			title: "wind status",
			image: "/images/icons/WindSatusRectangle.svg",
			description: windSpeed ? `${Math.round(windSpeed)}km/h` : "Немає данних",
			details: windDeg != null ? getWindDirection(windDeg) : "—",
			type: "wind" as const,
			id: "wind-1",
		},
		{
			title: "UV index",
			image: "/images/Icons/UVindexCircle.svg",
			description: typeof uvIndex === "number" ? `${uvIndex.toFixed(1)} UV` : "—",
			details:
				typeof uvIndex === "number"
					? uvIndex >= 6
						? "High"
						: uvIndex >= 3
						? "Moderate"
						: "Low"
					: "",
			type: "uv" as const,
			id: "uv-1",
			footerPosition: "center",
		},
		{
			title: "Humidity",
			image: "/images/Icons/Vector.svg",
			footerPosition: "center",
			description: today?.main?.humidity ? `${humidity}%` : "Немає даних",
			details: dewPoint !== "—" ? `Dew point: ${Math.round(dewPoint)}°C` : "",
			type: "humidity" as const,
			id: "hum-1",
		},
		{
			title: "visibility",
			image: "/images/Icons/VisibilityIcon1.svg",
			description: visibility ? `${visibility.toFixed(1)} km` : "Немає данних",
			details: "visibility",
			type: "visibility" as const,
			id: "vis-1",
		},
	];

	const miniCards = popularData.map((item) => ({
		label: item.city,
		title: `${item.temp}°C`,
		icon: item.icon,
		subTitle: "Popular city",
		id: item.id,
	}));

	return (
		<main className={styles.weather}>
			<div className={styles.weather__wrapper}>
				<div className={styles.firstSection}>
					<WeatherTabs
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						data={weatherData}
						todayInfo={currentWeather} // ✅ нове поле
					/>
					<RainChart view={activeTab} />
				</div>

				<div className={styles.secondSection}>
					<div className={styles.sectionItem}>
						<h3 className={styles.sectionTitle}>Today's Overview</h3>
						<div className={styles.sectionButtons}>
							<button className={`${styles.sectionButton} ${styles.large}`}>Other Cities</button>
							<button className={`${styles.sectionButton} ${styles.small}`}>See All</button>
						</div>
					</div>

					<div className={styles.secondSectionWrapper}>
						<div className={styles.scoreCards}>
							{cards.map((card) => (
								<Card
									key={card.id}
									{...card}
								/>
							))}
						</div>

						<div className={styles.bigCard}>
							<h3 className={styles.cardTitle}>
								Explore global map of wind <br /> weather and ocean condition
							</h3>
							<div className={styles.buttonItem}>
								<button className={styles.cardButton}>GET STARTED</button>
							</div>
						</div>

						<div className={styles.miniCards}>
							{miniCards.map((miniCard) => (
								<MiniCards
									key={miniCard.id}
									{...miniCard}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
