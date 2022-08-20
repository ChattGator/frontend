import { useState } from "react";
import { Head, ProjectCard, Search, CreateProject } from "@components";
import { useSearch } from "@hooks";
import { PlusCircleIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";

interface ProjectCard {
	link: string;
	title: string;
	desc: string;
	createdAt: Date;
}

const cards: ProjectCard[] = [
	{
		link: "/",
		title: "ChattY",
		desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus obcaecati blanditiis minima. Atque ratione dignissimos, maxime sed saepe consequatur mollitia officiis veniam ipsam, ducimus minus eligendi, natus deleniti. Repellendus vero eum amet labore vitae rem, illum, laudantium cum hic debitis perferendis necessitatibus, nostrum distinctio autem optio dignissimos nemo dicta vel?",
		createdAt: new Date(),
	},
	{
		link: "/",
		title: "Instagram",
		desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia quaerat a obcaecati!",
		createdAt: new Date(),
	},
	{
		link: "/",
		title: "Twitter",
		desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia quaerat a obcaecati!",
		createdAt: new Date(),
	},
	{
		link: "/",
		title: "Twitch",
		desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia quaerat a obcaecati!",
		createdAt: new Date(),
	},
	{
		link: "/",
		title: "Reddit",
		desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia quaerat a obcaecati!",
		createdAt: new Date(),
	},
];

const Projects: NextPage = () => {
	const [search, setSearch, filteredList] = useSearch<ProjectCard>(cards, "title");
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	return (
		<>
			<Head title="Dashboard" />
			<CreateProject
				isOpen={isModalOpen}
				setIsOpen={setIsModalOpen}
			/>
			<main className="container space-y-4 pb-24 lg:space-y-8 lg:pb-32">
				<div className=" grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-8 xl:grid-cols-3">
					<h1 className="text-4xl font-bold tracking-tighter text-slate-900 lg:text-5xl">My Projects</h1>
					<Search
						className="relative xl:col-start-3"
						search={search}
						setSearch={setSearch}
					/>
				</div>
				<div className="grid gap-4 sm:grid-cols-2 lg:gap-8 xl:grid-cols-3">
					<button
						onClick={() => setIsModalOpen(true)}
						className="grid aspect-video place-content-center gap-2 rounded-lg bg-blue-600 p-4 text-white transition-all active:bg-blue-700 lg:gap-4 lg:p-8"
					>
						<span>
							<PlusCircleIcon className="mx-auto h-20 w-20 lg:h-24 lg:w-24" />
						</span>
						<p className="lg:text-lg">Create new project</p>
					</button>
					{filteredList.map(({ link, title, desc, createdAt }, index) => (
						<ProjectCard
							key={index}
							link={link}
							title={title}
							description={desc}
							createdAt={createdAt}
						/>
					))}
				</div>
			</main>
		</>
	);
};

export default Projects;
