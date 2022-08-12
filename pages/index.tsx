import { Head } from "@components";
import { useToast } from "@contexts";
import type { NextPage } from "next";

const Home: NextPage = () => {
	const { addToast } = useToast();

	const handleClick1 = () => {
		addToast({ type: "success", message: "This is visible success" });
	};

	const handleClick2 = () => {
		addToast({ type: "info", message: "This is visible success" });
	};

	const handleClick3 = () => {
		addToast({ type: "error", message: "This is visible success" });
	};

	return (
		<>
			<Head />
			<main className="container space-y-4 pb-24 lg:pb-32">
				<h1 className="text-center text-4xl font-bold tracking-tighter text-slate-900 lg:text-5xl">
					Landing Page
				</h1>
				<div className="space-x-2 text-center">
					<button onClick={handleClick1}>Add Toast 1</button>
					<button onClick={handleClick2}>Add Toast 2</button>
					<button onClick={handleClick3}>Add Toast 3</button>
				</div>
			</main>
		</>
	);
};

export default Home;
