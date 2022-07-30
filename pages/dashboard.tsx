import { Head, Input, ProfileCard } from "@components";
import { useState } from "react";
import type { FC } from "react";

interface State {
	value: string;
	errorMessage: string;
}

const Dashboard: FC = () => {
	const [state, setState] = useState<State>({ value: "", errorMessage: "" });

	return (
		<>
			<Head title="Dashboard" />
			<main className="container">
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
			</main>
			{/* <div className="h-full flex items-center justify-start ml-10">
			<ProfileCard/>
			</div> */}
		</>
	);
};

export default Dashboard;
