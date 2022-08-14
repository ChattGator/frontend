/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ["images.unsplash.com", "avatars.githubusercontent.com"],
	},
	env: {
		BACKEND_URL: process.env.NEXT_PUBLIC_API_URL,
		IS_STUB: process.env.NEXT_PUBLIC_IS_STUB,
	},
	publicRuntimeConfig: {
		BACKEND_URL: process.env.NEXT_PUBLIC_API_URL,
		IS_STUB: process.env.NEXT_PUBLIC_IS_STUB,
	},
};

module.exports = nextConfig;
