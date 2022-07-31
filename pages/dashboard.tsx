import { Head, Input, ProfileCard } from "@components";
import { useState } from "react";
import type { FC } from "react";

interface State {
	value: string;
	errorMessage: string;
}

interface Card {
	name: string;
	username: string;
	image: string;
	isActive?: boolean;
}

const persons: Card[] = [
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
	{
		name: "John Doe",
		username: "johndoe",
		image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
	},
	{
		name: "John Doe",
		username: "johndoe",
		image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
	},
	{
		name: "John Doe",
		username: "johndoe",
		image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
	},
];

const Dashboard: FC = () => {
	const [state, setState] = useState<State>({ value: "", errorMessage: "" });

	return (
		<>
			<Head title="Dashboard" />
			<main className="container space-y-10">
				<div>
					<Input
						isRequired={true}
						label="Name"
						name="Name"
						placeholder="Name"
						type="text"
						regex={/^[a-zA-z]+$/}
						state={state}
						setState={setState}
					/>
				</div>
				<div className="grid grid-cols-3">
					<div className="space-y-4">
						{persons.map(
							({ name, image, username, isActive }, index) => (
								<ProfileCard
									key={index}
									name={name}
									image={image}
									username={username}
									isActive={isActive}
								/>
							)
						)}
					</div>
					<div className="col-span-2"></div>
				</div>
			</main>
		</>
	);
};

export default Dashboard;
