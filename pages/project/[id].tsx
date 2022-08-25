import { Head, ProfileCard, ProfileDetails, ProjectDetailsCard, SelectSVG, Loading } from "@components";
import { Developer, Project } from "@utils";
import { useUser } from "@contexts";
import { useEffect, Fragment, useState } from "react";
import { Tab } from "@headlessui/react";
import { parseCookies } from "nookies";
import type { NextPage, GetServerSideProps } from "next";
import type { FormEventHandler } from "react";

interface UserResposne {
	name: string;
	picture: string;
	email: string;
	projects: ProjectResposne[];
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

interface ChatUserResposne {
	_id: string;
	projectId: string;
	name: string;
	userId: string;
	avatar: string;
	userName: string;
	bio: string;
	createdAt: string;
}

interface GroupResponse {
	_id: string;
	projectId: string;
	name: string;
	description: string;
	isGroup: boolean;
	admins: string[];
	membersList: string[];
	messages: any[];
	createdAt: string;
}

interface Props {
	token: string;
	user: UserResposne;
	project: ProjectResposne;
}

const Dashboard: NextPage<Props> = ({ token, user, project }) => {
	const { user: authenticatedUser, setUser } = useUser();
	const tabs: string[] = ["Stats", "Settings", "Users", "Groups"];
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [id, setId] = useState<string>("");
	const [data, setData] = useState<any>([]);

	const projectService = new Project();

	const handleTabs: (FormEventHandler<HTMLElement> & ((index: number) => void)) | undefined = async (index) => {
		setIsLoading(true);
		let res = null;
		switch (index) {
			case 0:
				break;
			case 1:
				break;
			case 2:
				res = await projectService.getUsersByProject(project._id);
				setData(res);
				break;
			case 3:
				res = await projectService.getGroupsByProject(project._id);
				setData(res);
				break;
			default:
				break;
		}
		setId("");
		setIsLoading(false);
	};

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
			<main className="container space-y-10 pb-24 lg:pb-32">
				<section>
					<ProjectDetailsCard
						id={project._id}
						title={project.name}
						secret={project.credentials.secret}
						description={project.description}
					/>
				</section>
				<Tab.Group
					onChange={handleTabs}
					as="section"
					className="space-y-3 rounded-lg border-2 border-slate-200 bg-white lg:space-y-5"
					manual
					defaultIndex={0}
				>
					<Tab.List className="flex w-full items-center space-x-4 overflow-auto border-b-2 border-slate-200 p-2 lg:space-x-8 lg:p-4">
						{tabs.map((tab, index) => (
							<Tab
								key={index}
								className={({ selected }) =>
									`block rounded-lg px-4 py-2 transition focus:outline-none lg:text-lg ${
										selected
											? "bg-blue-200 font-semibold text-blue-600"
											: "border-white text-slate-400 hover:bg-slate-200 hover:text-slate-600 focus:bg-slate-200"
									}`
								}
							>
								{tab}
							</Tab>
						))}
					</Tab.List>
					<Tab.Panels as={Fragment}>
						<Tab.Panel className="p-4 focus:outline-none lg:p-8">
							{isLoading ? (
								<div className="flex items-center justify-center space-x-2">
									<Loading className="h-6 w-6 text-blue-600 lg:h-8 lg:w-8" />
									<span className="font-semibold text-blue-600 lg:text-lg">Loading</span>
								</div>
							) : (
								<div className="space-y-3 lg:space-y-5">
									<h1 className="text-3xl font-bold tracking-tighter text-zinc-900 lg:text-4xl">
										Stats
									</h1>
								</div>
							)}
						</Tab.Panel>
						<Tab.Panel className="p-4 focus:outline-none lg:p-8">
							{isLoading ? (
								<div className="flex items-center justify-center space-x-2">
									<Loading className="h-6 w-6 text-blue-600 lg:h-8 lg:w-8" />
									<span className="font-semibold text-blue-600 lg:text-lg">Loading</span>
								</div>
							) : (
								<div className="space-y-3 lg:space-y-5">
									<h1 className="text-3xl font-bold tracking-tighter text-zinc-900 lg:text-4xl">
										Settings
									</h1>
								</div>
							)}
						</Tab.Panel>
						<Tab.Panel className="p-4 focus:outline-none lg:p-8">
							{isLoading ? (
								<div className="flex items-center justify-center space-x-2">
									<Loading className="h-6 w-6 text-blue-600 lg:h-8 lg:w-8" />
									<span className="font-semibold text-blue-600 lg:text-lg">Loading</span>
								</div>
							) : data.length > 0 ? (
								<div className="grid grid-cols-1 divide-y-2 divide-slate-200 lg:grid-cols-3 lg:divide-x-2 lg:divide-y-0">
									<div className="space-y-2 pb-4 lg:space-y-4 lg:pb-0 lg:pr-8">
										{data.map(
											({ _id, name, userName, avatar }: ChatUserResposne, index: number) => (
												<ProfileCard
													key={index}
													_id={_id}
													id={id}
													setId={setId}
													avatar={avatar}
													name={name}
													username={userName}
												/>
											)
										)}
									</div>
									<div className="col-span-2 pt-4 lg:pt-0 lg:pl-8">
										{id ? (
											<ProfileDetails
												id={id}
												type="user"
											/>
										) : (
											<div className="grid h-full grid-cols-1 place-content-center">
												<div className="w-full space-y-4 lg:space-y-8">
													<SelectSVG className="mx-auto w-full sm:w-3/5" />
													<p className="text-center text-sm italic text-slate-600 lg:text-base">
														Click on any user to view their details
													</p>
												</div>
											</div>
										)}
									</div>
								</div>
							) : (
								<div>
									<p className="text-center italic text-slate-600">
										Your app doen&apos;t have any users
									</p>
								</div>
							)}
						</Tab.Panel>
						<Tab.Panel className="p-4 focus:outline-none lg:p-8">
							{isLoading ? (
								<div className="flex items-center justify-center space-x-2">
									<Loading className="h-6 w-6 text-blue-600 lg:h-8 lg:w-8" />
									<span className="font-semibold text-blue-600 lg:text-lg">Loading</span>
								</div>
							) : data.length > 0 ? (
								<div className="grid grid-cols-1 divide-y-2 divide-slate-200 lg:grid-cols-3 lg:divide-x-2 lg:divide-y-0">
									<div className="space-y-2 pb-4 lg:space-y-4 lg:pb-0 lg:pr-8">
										{data.map(
											({ _id, name, description, membersList }: GroupResponse, index: number) => (
												<ProfileCard
													_id={_id}
													id={id}
													setId={setId}
													key={index}
													name={name}
													description={description}
													totalGroupMembers={membersList ? membersList.length : 0}
												/>
											)
										)}
									</div>
									<div className="col-span-2 pt-4 lg:pt-0 lg:pl-8">
										{id ? (
											<ProfileDetails
												id={id}
												type="group"
											/>
										) : (
											<div className="grid h-full grid-cols-1 place-content-center">
												<div className="w-full space-y-4 lg:space-y-8">
													<SelectSVG className="mx-auto w-full sm:w-3/5" />
													<p className="text-center text-sm italic text-slate-600 lg:text-base">
														Click on any group to view their details
													</p>
												</div>
											</div>
										)}
									</div>
								</div>
							) : (
								<div>
									<p className="text-center italic text-slate-600">
										Your app doen&apos;t have any groups
									</p>
								</div>
							)}
						</Tab.Panel>
					</Tab.Panels>
				</Tab.Group>
			</main>
		</>
	);
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const cookies = parseCookies(ctx);
	if (!cookies["authenticated"] || !cookies["token"] || !ctx["params"]) {
		return {
			redirect: {
				permanent: false,
				destination: "/login-register",
			},
		};
	}

	const { params } = ctx;
	if (params && !params["id"]) throw new Error("Param named `id` not found");

	const developerService = new Developer();
	const projectService = new Project();
	const user = await developerService.getUserDetails(cookies["token"]);
	const project = await projectService.getProject(params?.id, cookies["token"]);

	return {
		props: {
			token: cookies["token"],
			user,
			project,
		},
	};
};
