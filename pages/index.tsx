import { Head } from "@components";
import type { NextPage } from "next";

const Home: NextPage = () => {
	return (
		<>
			<Head />
			<main className="container py-24 lg:py-32">
				<h1 className="text-center text-4xl font-bold tracking-tighter text-slate-900 lg:text-5xl">
					Landing Page
				</h1>
			</main>
		</>
	);
};

export default Home;
