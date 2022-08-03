import { Head } from "@components";
import type { NextPage } from "next";

const Home: NextPage = () => {
	return (
		<>
			<Head />
			<main className="container pb-24 lg:pb-32">
				<h1 className="text-center text-4xl font-bold tracking-tighter text-slate-900 lg:text-5xl">
					Landing Page
				</h1>
			</main>
		</>
	);
};

export default Home;
