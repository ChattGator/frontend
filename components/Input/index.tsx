import { useEffect, useRef, useId, Dispatch, SetStateAction } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import type { FC } from "react";

interface State {
	value: string;
	errorMessage: string;
}

interface Props {
	name: string;
	isRequired: boolean;
	placeholder: string;
	type: string;
	regex?: RegExp;
	onBlur?: () => void;
	state: State;
	setState: Dispatch<SetStateAction<State>>;
}

const Input: FC<Props> = ({
	name,
	isRequired,
	placeholder,
	type,
	regex,
	onBlur,
	state,
	setState,
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
				<span className="space-x-1">
					{placeholder}
					{isRequired && <span className="text-red-600">*</span>}
				</span>
			</label>
			<input
				type={type}
				name={name}
				id={id}
				placeholder={placeholder}
				onChange={(e) =>
					setState((state) => ({
						...state,
						value: e.target.value,
					}))
				}
				value={state.value}
				onBlur={onBlur ?? undefined}
				className="w-full truncate rounded-lg border border-slate-200 p-3 text-sm placeholder-slate-400 ring-blue-600 transition-all focus:border-transparent focus:outline-none focus:ring-2 lg:text-base"
			/>
			{state.errorMessage && (
				<p className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 lg:text-sm">
					<ExclamationCircleIcon className="h-4 w-4 lg:h-5 lg:w-5" />
					{state.errorMessage}
				</p>
			)}
		</div>
	);
};

export default Input;
