import path from "path";

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
		includePaths: [path.resolve("styles")],
	},
};

export default nextConfig;
