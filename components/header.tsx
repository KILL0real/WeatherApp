"use client";
import { useCity } from "../app/context/CityContext";

import { Bell, LayoutGrid, MapPin } from "lucide-react";
import Image from "next/image";
import styles from "../components/header.module.scss";
import SearchSelect from "./_components/searchSelect/searchSelect";
import ThemeToggle from "./_components/themeToggle/themeTooggle";
import UserAvatar from "./_components/UserAvatar/userAvatar";

export default function header() {
	const { city, country } = useCity();
	return (
		<header className={styles.header}>
			<div className={styles.header__wrapper}>
				<div className={styles.header__Item}>
					<div className={styles.header__buttons}>
						<button className={styles.header__button}>
							<LayoutGrid className={styles.icon} />
						</button>
						<button className={styles.header__button}>
							<Bell className={styles.icon} />
						</button>
					</div>

					<span className={styles.header__location}>
						<MapPin className={styles.icon} />
						{city && country ? `${city},${country}` : "No location selected"}
					</span>
				</div>
				<div>
					<SearchSelect />
				</div>
				<div className={styles.header__Item}>
					<ThemeToggle />
					<UserAvatar />
				</div>
			</div>
		</header>
	);
}
