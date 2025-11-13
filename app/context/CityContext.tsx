"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

type CityContextType = {
	city: string;
	country: string;
	setCity: (c: string) => void;
	setCountry: (country: string) => void;
};

const CityContext = createContext<CityContextType | undefined>(undefined);

export function CityProvider({ children }: { children: ReactNode }) {
	const [city, setCityState] = useState<string>("Kyiv"); // значение по умолчанию
	const setCity = (name: string) => {
		if (!name) {
			setCityState("");
			return;
		}
		const normalized = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
		setCityState(normalized);
	};

	const [country, setCountry] = useState<string>("Ukraine");
	return (
		<CityContext.Provider value={{ city, setCity, country, setCountry }}>
			{children}
		</CityContext.Provider>
	);
}

export function useCity() {
	const ctx = useContext(CityContext);
	if (!ctx) throw new Error("useCity must be used inside CityProvider");
	return ctx;
}
