import { useEffect, useRef, useId, Dispatch, SetStateAction } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import type { FC, InputHTMLAttributes } from "react";

interface State {
	value: string;
	errorMessage: string;
}

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	isRequired: boolean;
	regex?: RegExp;
	label: string;
	state: State;
	setState: Dispatch<SetStateAction<State>>;
}

const Input: FC<Props> = ({
	isRequired,
	regex,
	label,
	state,
	setState,
	...rest
}) => {
	const id: string = useId();
	const didMount = useRef<boolean>(false);

	useEffect(() => {
		const validate: () => void = () => {
			if (isRequired && state.value.trim() === "")
				return setState((state) => ({
					...state,
					errorMessage: "This field is required",
				}));
			if (regex) {
				const validator = regex;
				if (!validator.test(state.value))
					return setState((state) => ({
						...state,
						errorMessage: "Please enter a valid value",
					}));
			}
			return setState((state) => ({ ...state, errorMessage: "" }));
		};

		if (didMount.current) validate();
		else didMount.current = true;
	}, [state.value]);

	return (
		<div>
			<label
				htmlFor={id}
				className="block w-full text-xs font-semibold text-slate-600 lg:text-sm"
			>
				<span
					className={`space-x-1 ${
						isRequired
							? "after:ml-0.5 after:text-red-600 after:content-['*']"
							: ""
					}`}
				>
					{label}
				</span>
			</label>
			<input
				className="w-full truncate rounded-lg border border-slate-200 p-3 text-sm placeholder-slate-400 ring-blue-600 transition-all focus:border-transparent focus:outline-none focus:ring-2 lg:text-base"
				id={id}
				onChange={(e) =>
					setState((state) => ({
						...state,
						value: e.target.value,
					}))
				}
				value={state.value}
				{...rest}
			/>
			{state.errorMessage && (
				<p className="inline-flex items-center space-x-1 text-xs font-semibold text-red-600 lg:text-sm">
					<ExclamationCircleIcon className="h-4 w-4 lg:h-5 lg:w-5" />
					{state.errorMessage}
				</p>
			)}
		</div>
	);
};

export default Input;
