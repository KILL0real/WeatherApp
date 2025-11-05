"use client";
import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import styles from "./searchSelect.module.scss";

const options = ["Kyiv", "Lviv", "Odesa", "Kharkiv", "Dnipro"];

const SearchSelect = () => {
	const [query, setQuery] = useState("");
	const [filtered, setFiltered] = useState(options);
	const [isOpen, setIsOpen] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setQuery(value);
		setFiltered(options.filter((city) => city.toLowerCase().includes(value.toLowerCase())));
		setIsOpen(true);
	};

	const handleSelect = (value: string) => {
		setQuery(value);
		setIsOpen(false);
	};

	return (
		<div className={styles.selectWrapper}>
			<div className={styles.inputWrapper}>
				<Search className={styles.icon} />
				<input
					type="text"
					placeholder="Search City"
					value={query}
					onChange={handleChange}
					onFocus={() => setIsOpen(true)}
					className={styles.input}
				/>
			</div>

			{isOpen && filtered.length > 0 && (
				<ul className={styles.dropdown}>
					{filtered.map((item) => (
						<li
							key={item}
							onClick={() => handleSelect(item)}
							className={styles.option}
						>
							{item}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default SearchSelect;
