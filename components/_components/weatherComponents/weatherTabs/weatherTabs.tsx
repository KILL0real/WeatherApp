"use client";

import { useMemo } from "react";
import Switch from "../../switch/switch";
import TodayWeatherCard from "../MainWeatherCards/todayWeatherCard";
import WeatherCard from "../weatherCard/weatherCard";
import styles from "./weatherTabs.module.scss";

interface WeatherTabsProps {
	activeTab: "today" | "week";
	setActiveTab: (tab: "today" | "week") => void;
	data?: any;
	todayInfo?: any;
}
export default function WeatherTabs({
	activeTab,
	setActiveTab,
	data,
	todayInfo,
}: WeatherTabsProps) {
	const dailyForecast = useMemo(() => {
		if (!data?.list) return [] as any;
		const grouped: Record<string, any[]> = data.list.reduce(
			(acc: Record<string, any[]>, item: any) => {
				const date = new Date(item.dt * 1000).toLocaleDateString("en-GB");
				if (!acc[date]) acc[date] = [];
				acc[date].push(item);
				return acc;
			},
			{},
		);
		return Object.values(grouped);
	}, [data]);
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
						onClick={() => setActiveTab("week")}
						className={activeTab === "week" ? styles.active : ""}
					>
						Week
					</button>
				</div>
				<Switch />
			</div>

			<div className={styles.content}>
				{activeTab === "today" && (
					<TodayWeatherCard
						data={data}
						todayInfo={todayInfo}
					/>
				)}

				{activeTab === "week" && (
					<>
						<TodayWeatherCard
							data={data}
							todayInfo={todayInfo}
						/>
						<div className={styles.cardFlex}>
							{dailyForecast.slice(0, 6).map((day: any, index: number) => {
								const item = day[Math.floor(day.length / 2)]; // беремо середину дня
								const temp = Math.round(item.main.temp);
								const icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
								const weekday = new Date(item.dt * 1000).toLocaleDateString("en-US", {
									weekday: "short",
								});

								return (
									<WeatherCard
										key={index}
										data={{
											day: weekday,
											temp,
											icon,
										}}
									/>
								);
							})}
						</div>
					</>
				)}
			</div>
		</div>
	);
}
