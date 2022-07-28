import { Head } from "@components";
import type { NextPage } from "next";

const Home: NextPage = () => {
	return (
		<>
			<Head />
			<main>
				<h1 className="container py-24 lg:py-32">Landing Page</h1>
			</main>
		</>
	);
};

export default Home;
