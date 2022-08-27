/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		dangerouslyAllowSVG: true,
		domains: [
			"images.unsplash.com",
			"avatars.githubusercontent.com",
			"ui-avatars.com",
			"lh3.googleusercontent.com",
			"pbs.twimg.com",
			"res.cloudinary.com",
		],
	},
	env: {
		BACKEND_URL: process.env.NEXT_PUBLIC_API_URL,
		IS_STUB: process.env.NEXT_PUBLIC_IS_STUB,
	},
	publicRuntimeConfig: {
		BACKEND_URL: process.env.NEXT_PUBLIC_API_URL,
		IS_STUB: process.env.NEXT_PUBLIC_IS_STUB,
	},
	redirects: async () => [
		{
			source: "/login-register",
			has: [
				{
					type: "cookie",
					key: "authenticated",
					value: "true",
				},
			],
			destination: "/",
			permanent: false,
		},
	],
};

module.exports = nextConfig;
