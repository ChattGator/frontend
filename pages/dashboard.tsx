import Link from "next/link";
import { ProjectCard, Head } from "@components";
import { PlusCircleIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";

const Projects: NextPage = () => {
	return (
		<>
			<Head title="Dashboard" />
			<main className="container grid gap-4 py-24 sm:grid-cols-2 lg:gap-8 lg:py-32 xl:grid-cols-3">
				<Link href="/project/new">
					<a className="grid aspect-video place-content-center gap-2 rounded-lg bg-blue-600 p-4 text-center text-white shadow-lg transition-all active:bg-blue-100 lg:gap-4 lg:p-8">
						<span>
							<PlusCircleIcon className="mx-auto h-20 w-20 lg:h-24 lg:w-24" />
						</span>
						<p className="lg:text-lg">Create new project</p>
					</a>
				</Link>
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
