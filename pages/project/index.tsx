import Link from "next/link";
import { useEffect, useState } from "react";
import { ProjectCard, Head } from "@components";
import { PlusCircleIcon, SearchIcon } from "@heroicons/react/outline";
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
		desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia quaerat a obcaecati!",
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
	const [search, setSearch] = useState<string>("");
	const [filteredProjects, setFilteredProjects] =
		useState<ProjectCard[]>(cards);

	useEffect(() => {
		const searchValue = search.toLowerCase().trim();

		const filteredList1 = cards.filter((project) => {
			const title = project.title.toLowerCase();
			if (search === "") return project;
			else if (title.startsWith(searchValue)) return project;
			return null;
		});

		const filteredList2 = cards.filter((project) => {
			const title = project.title.toLowerCase();
			if (search === "") return project;
			else if (title.includes(searchValue)) return project;
			return null;
		});

		const set = new Set<ProjectCard>([...filteredList1, ...filteredList2]);
		setFilteredProjects(Array.from(set));
	}, [search]);

	return (
		<>
			<Head title="Dashboard" />
			<main className="container space-y-4 py-24 lg:space-y-8 lg:py-32">
				<h1 className="text-4xl font-bold tracking-tighter text-slate-900 lg:text-5xl">
					My Projects
				</h1>
				<div className="relative">
					<span className="sr-only">Search</span>
					<span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
						<SearchIcon className="h-5 w-5 text-slate-400" />
					</span>
					<input
						className="w-full truncate rounded-lg border border-slate-200 py-3 pl-9 pr-3 text-sm placeholder-slate-400 ring-blue-600 transition-all focus:border-transparent focus:outline-none focus:ring-2 lg:w-1/2 lg:text-base"
						id="search"
						type="search"
						placeholder="Search"
						onChange={(e) => setSearch(e.target.value)}
						value={search}
					/>
				</div>
				<div className="grid gap-4 sm:grid-cols-2 lg:gap-8 xl:grid-cols-3">
					<Link href="/project/new">
						<a className="grid aspect-video place-content-center gap-2 rounded-lg bg-blue-600 p-4 text-center text-white shadow-lg transition-all active:bg-blue-100 lg:gap-4 lg:p-8">
							<span>
								<PlusCircleIcon className="mx-auto h-20 w-20 lg:h-24 lg:w-24" />
							</span>
							<p className="lg:text-lg">Create new project</p>
						</a>
					</Link>
					{filteredProjects.map(
						({ link, title, desc, createdAt }, index) => (
							<ProjectCard
								key={index}
								link={link}
								title={title}
								desc={desc}
								createdAt={createdAt}
							/>
						)
					)}
				</div>
			</main>
		</>
	);
};

export default Projects;
