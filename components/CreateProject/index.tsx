import { Input, Loading } from "@components";
import { Project } from "@utils";
import { useUser } from "@contexts";
import { useRouter } from "next/router";
import { useState, useEffect, useId, useRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { PlusIcon, XIcon } from "@heroicons/react/outline";
import type { FC, Dispatch, SetStateAction } from "react";

interface Props {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}

interface InputType {
	value: string;
	errorMessage: string;
}

const CreateProject: FC<Props> = ({ isOpen, setIsOpen }) => {
	const id: string = useId();
	const didMount = useRef<boolean>(false);
	const [title, setTitle] = useState<InputType>({ value: "", errorMessage: "" });
	const [description, setDescription] = useState<InputType>({ value: "", errorMessage: "" });
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { user } = useUser();
	const router = useRouter();

	useEffect(() => {
		const validate: () => void = () => {
			if (description.value.trim() === "")
				return setDescription((description) => ({
					...description,
					errorMessage: "This field is required",
				}));
			return setDescription((description) => ({ ...description, errorMessage: "" }));
		};

		if (didMount.current) validate();
		else didMount.current = true;
	}, [description.value]);

	const handleSubmit: () => void = async () => {
		if (title.value.trim() === "" || title.errorMessage) {
			if (title.errorMessage.length === 0)
				setTitle((title) => ({
					...title,
					errorMessage: "This field is required",
				}));
			return;
		}

		if (description.value.trim() === "" || description.errorMessage) {
			if (description.errorMessage.length === 0)
				setDescription((description) => ({
					...description,
					errorMessage: "This field is required",
				}));
			return;
		}

		setIsLoading(true);
		const projectService = new Project();
		// TODO-WARNING: Not working
		await projectService.createProject({ name: title.value, description: title.value }, user?.token);
		setIsOpen(false);
		setIsLoading(false);
		router.reload();
	};

	return (
		<Transition
			show={isOpen}
			as={Fragment}
		>
			<Dialog
				open={isOpen}
				onClose={() => setIsOpen(false)}
				className="relative z-50"
			>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div
						className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
						aria-hidden="true"
					></div>
				</Transition.Child>
				<div className="fixed inset-0 mx-auto grid place-content-center p-4 lg:p-8">
					<Dialog.Panel className="rounded-lg border-2 border-slate-200 bg-white">
						<Dialog.Title className="border-b-2 border-slate-200 p-4 text-3xl font-bold tracking-tighter text-slate-900 lg:p-8 lg:text-4xl">
							Create New Project
						</Dialog.Title>
						<form
							onSubmit={(e) => e.preventDefault()}
							className=" space-y-2 p-4 lg:space-y-4 lg:p-8"
						>
							<Input
								isRequired={true}
								label="Name"
								state={title}
								setState={setTitle}
							/>
							<div className="space-y-1">
								<label
									htmlFor={id}
									className="block w-full text-xs font-semibold text-slate-600 lg:text-sm"
								>
									<span className="space-x-1 after:ml-0.5 after:text-red-600 after:content-['*']">
										Description
									</span>
								</label>
								<textarea
									rows={5}
									className="w-full resize-none rounded-lg border border-slate-200 p-3 text-sm placeholder-slate-400 ring-blue-600 transition-all focus:border-transparent focus:outline-none focus:ring-2 lg:text-base"
									id={id}
									onChange={(e) =>
										setDescription((description) => ({
											...description,
											value: e.target.value,
										}))
									}
									value={description.value}
								/>
								{description.errorMessage && (
									<p className="inline-flex items-center space-x-1 text-xs font-semibold text-red-600 lg:text-sm">
										<ExclamationCircleIcon className="h-4 w-4 lg:h-5 lg:w-5" />
										{description.errorMessage}
									</p>
								)}
							</div>
							<div className="space-x-2 lg:space-x-4">
								<button
									onClick={() => handleSubmit()}
									disabled={isLoading}
									className="inline-flex items-center space-x-1 rounded-lg bg-blue-600 px-2 py-1 text-sm font-semibold text-white transition-colors active:bg-blue-700 disabled:space-x-2 disabled:bg-slate-200 disabled:text-slate-900 lg:px-4 lg:py-2 lg:text-base"
								>
									<span>
										{isLoading ? (
											<Loading className="h-5 w-5" />
										) : (
											<PlusIcon className="h-4 w-4 lg:h-5 lg:w-5" />
										)}
									</span>
									<span>{isLoading ? "Creating Project" : "Create Project"}</span>
								</button>
								{!isLoading && (
									<button
										onClick={() => setIsOpen(false)}
										className="inline-flex items-center space-x-1 rounded-lg bg-slate-200 px-2 py-1 text-sm font-semibold text-slate-900 transition-colors active:bg-slate-300 lg:px-4 lg:py-2 lg:text-base"
									>
										<span>
											<XIcon className="h-4 w-4 lg:h-5 lg:w-5" />
										</span>
										<span>Cancel</span>
									</button>
								)}
							</div>
						</form>
					</Dialog.Panel>
				</div>
			</Dialog>
		</Transition>
	);
};

export default CreateProject;
