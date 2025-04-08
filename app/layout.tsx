import "../styles/globals.scss";
import Header from "../components/header";

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  display: "swap",
});
export const metadata = {
  title: "Weather App",
  description: "Погода онлайн",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className={montserrat.className}>
        <div className="container">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
