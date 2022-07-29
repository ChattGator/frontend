import { Input } from "@components";
import { useState } from "react";
import type { FC } from "react";

interface State {
	value: string;
	errorMessage: string;
}

const Dashboard: FC = () => {
	const [state, setState] = useState<State>({ value: "", errorMessage: "" });

	return (
		<main className="container">
			<h1>Dashboard</h1>
			<div>
				<Input
					isRequired={true}
					name="Name"
					placeholder="Name"
					type="text"
					regex={/^[a-zA-z]+$/}
					state={state}
					setState={setState}
				/>
			</div>
		</main>
	);
};

export default Dashboard;
