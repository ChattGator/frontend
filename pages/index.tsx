import Image from "next/image";
import chatImage from "../public/images/chat-kit.png";
import { useState } from "react";
import { Head } from "@components";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import {
	ChatBubbleLeftRightIcon,
	WrenchScrewdriverIcon,
	DevicePhoneMobileIcon,
	ServerStackIcon,
} from "@heroicons/react/24/solid";
import { parseCookies } from "nookies";
import type { NextPage, GetServerSideProps } from "next";

const Home: NextPage = () => {
	const [isChatImageLoading, setIsChatImageLoading] = useState<boolean>(true);

	return (
		<>
			<Head />
			<main className="container space-y-8 pt-12 pb-24 lg:space-y-16 lg:pt-16 lg:pb-32">
				<section className="space-y-4 lg:space-y-8">
					<div className="mx-auto max-w-lg space-y-2 text-center lg:space-y-4">
						<h1 className="text-4xl font-bold tracking-tighter text-slate-900 lg:text-5xl">
							Get started with ChattY in minutes!
						</h1>
						<p className="text-slate-600 lg:text-lg">
							ChattY is an npm package that&apos;s easy to use and quick to set up. With just a few
							minutes, you can be up and running with ChattY.
						</p>
						<div className="space-x-2 lg:space-x-4">
							<button className="inline-flex items-center space-x-1 rounded-lg bg-blue-600 px-2 py-1 text-sm font-semibold text-white transition-colors active:bg-blue-700 lg:px-4 lg:py-2 lg:text-base">
								<span>Get Started</span>
								<ChatBubbleLeftRightIcon className="h-5 w-5" />
							</button>
							<button className="inline-flex items-center space-x-1 rounded-lg px-2 py-1 text-sm font-semibold text-slate-600 transition-colors hover:bg-blue-100 active:text-blue-600 lg:px-4 lg:py-2 lg:text-base">
								<span>See Documentation</span>
								<ArrowRightIcon className="h-5 w-5" />
							</button>
						</div>
					</div>
					<div
						className={`bg-slate-200 ${
							isChatImageLoading && "animate-pulse"
						} rounded-lg border border-blue-100 shadow-lg shadow-blue-100`}
					>
						<Image
							src={chatImage}
							alt="chat-image"
							layout="responsive"
							objectFit="contain"
							objectPosition="center center"
							onLoad={() => setIsChatImageLoading(false)}
						/>
					</div>
				</section>
				<section className="space-y-4 lg:space-y-8">
					<div className="mx-auto max-w-prose text-center">
						<h2 className="text-4xl font-bold tracking-tighter text-slate-900 lg:text-5xl">Features</h2>
						<p className="text-slate-600 lg:text-lg">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga maiores illo aspernatur at
							doloremque quibusdam explicabo quas, suscipit voluptatem iste.
						</p>
					</div>
					<div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
						<div className="space-y-2 rounded-lg border-2 border-transparent bg-blue-100 p-4 transition-colors hover:border-blue-600 lg:p-8">
							<span className="inline-block rounded-lg bg-blue-600 px-4 py-2">
								<WrenchScrewdriverIcon className="h-6 w-6 text-white lg:h-8 lg:w-6" />
							</span>
							<h3 className="text-2xl font-semibold text-blue-600 lg:text-3xl">
								Build Your Chat with Ease
							</h3>
							<p>
								ChattY makes it easy to build your own chat UI with ease. With just a few lines of code,
								you can quickly create a chat UI that looks and feels great.
							</p>
						</div>
						<div className="space-y-2 rounded-lg border-2 border-transparent bg-blue-100 p-4 transition-colors hover:border-blue-600 lg:p-8">
							<span className="inline-block rounded-lg bg-blue-600 px-4 py-2">
								<DevicePhoneMobileIcon className="h-6 w-6 text-white lg:h-8 lg:w-6" />
							</span>
							<h3 className="text-2xl font-semibold text-blue-600 lg:text-3xl">
								Use Our Pre-Made Components
							</h3>
							<p>
								ChattY comes with a wide range of pre-made components that you can use to build your
								chat UI. With our pre-made UI, you can easily customize your chat interface to match
								your brand identity.
							</p>
						</div>
						<div className="space-y-2 rounded-lg border-2 border-transparent bg-blue-100 p-4 transition-colors hover:border-blue-600 lg:p-8">
							<span className="inline-block rounded-lg bg-blue-600 px-4 py-2">
								<ServerStackIcon className="h-6 w-6 text-white lg:h-8 lg:w-6" />
							</span>
							<h3 className="text-2xl font-semibold text-blue-600 lg:text-3xl">Host Your Chat with Us</h3>
							<p>
								We take care of all the server infrastructure and hosting so you don&apos;t have to
								worry about a thing. Just deploy our Chat UI and start chatting!
							</p>
						</div>
					</div>
				</section>
			</main>
		</>
	);
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const cookies = parseCookies(ctx);
	if (cookies["authenticated"] && cookies["token"]) {
		return {
			redirect: {
				permanent: false,
				destination: "/project",
			},
		};
	}

	return {
		props: {},
	};
};
