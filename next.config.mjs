import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "openweathermap.org",
				pathname: "/img/wn/**",
			},
		],
	},

	sassOptions: {
		includePaths: [path.join(process.cwd(), "styles")],
	},
};

export default nextConfig;
