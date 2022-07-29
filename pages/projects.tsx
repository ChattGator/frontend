import { ProjectCard, Head } from "@components";
import type { NextPage } from "next";

const Projects: NextPage = () => {
	return (
		<>
			<Head />
			<main className="container grid gap-8 py-24 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16 lg:py-32 xl:grid-cols-4">
				<ProjectCard
					link="/"
					title="Project 1"
					desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia quaerat a obcaecati!"
					createdAt={new Date()}
				/>
				<ProjectCard
					link="/"
					title="Project 2"
					desc="Lorem ipsum dolor sit amet consectetur"
					createdAt={new Date()}
				/>
				<ProjectCard
					link="/"
					title="Project 3"
					desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia quaerat a obcaecati!"
					createdAt={new Date()}
				/>
				<ProjectCard
					link="/"
					title="Project 4"
					desc="Lorem ipsum dolor sit amet consectetur adipisicing elit."
					createdAt={new Date()}
				/>
			</main>
		</>
	);
};

export default Projects;
