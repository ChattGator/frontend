import { Head, ProfileCard, ProfileDetails, ProjectDetailsCard } from "@components";
import { useState, Fragment } from "react";
import { Tab } from "@headlessui/react";
import type { FC } from "react";

interface State {
	value: string;
	errorMessage: string;
}

interface User {
	name: string;
	username: string;
	image: string;
	isActive?: boolean;
}

interface Group {
	name: string;
	description: string;
	totalGroupMembers: number;
	image: string;
	isActive?: boolean;
}

const persons: User[] = [
	{
		name: "John Doe",
		username: "johndoe",
		image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
		isActive: true,
	},
	{
		name: "John Doe",
		username: "johndoe",
		image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
	},
];

const groups: Group[] = [
	{
		name: "John Doe",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, praesentium?",
		image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
		isActive: true,
		totalGroupMembers: 10,
	},
	{
		name: "John Doe",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, praesentium?",
		image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
		totalGroupMembers: 5,
	},
];

const Dashboard: FC = () => {
	const tabs: string[] = ["Stats", "Settings", "Users", "Groups"];
	const handleTabs: () => void = () => {};

	return (
		<>
			<Head title="Dashboard" />
			<main className="container space-y-10 pb-24 lg:pb-32">
				<section>
					<ProjectDetailsCard
						projectKey="test"
						name="Interesting Title"
						projectSecret="test"
						description="test"
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
							<div className="space-y-3 lg:space-y-5">
								<h1 className="text-3xl font-bold tracking-tighter text-zinc-900 lg:text-4xl">Stats</h1>
							</div>
						</Tab.Panel>
						<Tab.Panel className="p-4 focus:outline-none lg:p-8">
							<div className="space-y-3 lg:space-y-5">
								<h1 className="text-3xl font-bold tracking-tighter text-zinc-900 lg:text-4xl">
									Settings
								</h1>
							</div>
						</Tab.Panel>
						<Tab.Panel className="p-4 focus:outline-none lg:p-8">
							<div className="grid grid-cols-1 lg:grid-cols-3 lg:divide-x-2 lg:divide-slate-200">
								<div className="space-y-2 pr-4 lg:space-y-4 lg:pr-8">
									{persons.map(({ image, name, username, isActive }, index) => (
										<ProfileCard
											key={index}
											image={image}
											name={name}
											isActive={isActive}
											username={username}
										/>
									))}
								</div>
								<div className="col-span-2 pl-4 lg:pl-8">
									<ProfileDetails id="1" />
								</div>
							</div>
						</Tab.Panel>
						<Tab.Panel className="p-4 focus:outline-none lg:p-8">
							<div className="grid grid-cols-1 lg:grid-cols-3 lg:divide-x-2 lg:divide-slate-200">
								<div className="space-y-2 pr-4 lg:space-y-4 lg:pr-8">
									{groups.map(({ image, name, description, isActive, totalGroupMembers }, index) => (
										<ProfileCard
											key={index}
											image={image}
											name={name}
											isActive={isActive}
											description={description}
											totalGroupMembers={totalGroupMembers}
										/>
									))}
								</div>
								<div className="col-span-2 pl-4 lg:pl-8">
									<ProfileDetails id="1" />
								</div>
							</div>
						</Tab.Panel>
					</Tab.Panels>
				</Tab.Group>
			</main>
		</>
	);
};

export default Dashboard;
