import { useState, useEffect } from "react";
import { Head, ProjectCard, Search, CreateProject } from "@components";
import { useSearch } from "@hooks";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Developer, Project } from "@utils";
import { useUser } from "@contexts";
import { parseCookies } from "nookies";
import type { NextPage, GetServerSideProps } from "next";

interface UserResposne {
	name: string;
	picture: string;
	email: string;
	projects: any[];
	_id: string;
	createdAt: string;
}

interface ProjectResposne {
	name: string;
	developerId: string;
	description: string;
	credentials: {
		secret: string;
	};
	projectConfig: {
		isGroupEnabled: boolean;
		chatLimit: number;
	};
	_id: string;
	createdAt: string;
}

interface Props {
	token: string;
	user: UserResposne;
	projects: ProjectResposne[];
}

interface ProjectCard {
	link: string;
	title: string;
	desc: string;
	createdAt: Date;
}

const Projects: NextPage<Props> = ({ token, user, projects }) => {
	const { user: authenticatedUser, setUser } = useUser();
	const [search, setSearch, filteredList] = useSearch<ProjectResposne>(projects, "name");
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	useEffect(() => {
		if (authenticatedUser) return;
		setUser({
			id: user._id,
			avatar: user.picture,
			name: user.name,
			email: user.email,
			token,
		});
	}, []);

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
					{filteredList.map(({ name, description, _id, createdAt }, index) => (
						<ProjectCard
							key={index}
							id={_id}
							title={name}
							description={description}
							createdAt={new Date(createdAt)}
						/>
					))}
				</div>
			</main>
		</>
	);
};

export default Projects;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const cookies = parseCookies(ctx);
	if (!cookies["authenticated"] || !cookies["token"]) {
		return {
			redirect: {
				permanent: false,
				destination: "/login-register",
			},
		};
	}

	const developerService = new Developer();
	const projectService = new Project();
	const user = await developerService.getUserDetails(cookies["token"]);
	const projects = await projectService.getProjectsByDeveloper(user._id, cookies["token"]);

	return {
		props: {
			token: cookies["token"],
			user,
			projects,
		},
	};
};
