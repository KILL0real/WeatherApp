import { Montserrat } from "next/font/google";
import Header from "../components/header";
import "../styles/globals.scss";
import { CityProvider } from "./context/CityContext";

const montserrat = Montserrat({
	subsets: ["latin", "cyrillic"],
	weight: ["400", "700"],
	display: "swap",
});
export const metadata = {
	title: "Weather App",
	description: "Погода онлайн",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="uk">
			<body className={montserrat.className}>
				<CityProvider>
					<div className="container">
						<Header />
						{children}
					</div>
				</CityProvider>
			</body>
		</html>
	);
}
