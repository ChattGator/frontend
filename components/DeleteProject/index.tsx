import { Loading } from "@components";
import { Project } from "@utils";
import { useUser } from "@contexts";
import { useRouter } from "next/router";
import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";
import type { FC, Dispatch, SetStateAction } from "react";

interface Props {
	id: string;
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const DeleteProject: FC<Props> = ({ id, isOpen, setIsOpen }) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { user } = useUser();
	const router = useRouter();

	const handleSubmit: () => void = async () => {
		setIsLoading(true);
		const projectService = new Project();
		await projectService.deleteProject(id, user?.token);
		setIsOpen(false);
		setIsLoading(false);
		router.push("/project");
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
							Delete Project
						</Dialog.Title>
						<div className="space-y-2 px-4 py-2 lg:space-y-4 lg:py-4 lg:px-8">
							<p className="max-w-md text-slate-600 lg:text-lg">
								Are you sure? you want to delete project. All the data releted to the project will be
								deleted and cannot be accessed in future.
							</p>
							<div className="space-x-2 lg:space-x-4">
								<button
									onClick={() => handleSubmit()}
									disabled={isLoading}
									className="inline-flex items-center space-x-1 rounded-lg bg-red-600 px-2 py-1 text-sm font-semibold text-white transition-colors active:bg-red-700 disabled:space-x-2 disabled:bg-slate-200 disabled:text-slate-900 lg:px-4 lg:py-2 lg:text-base"
								>
									<span>
										{isLoading ? (
											<Loading className="h-5 w-5" />
										) : (
											<TrashIcon className="h-4 w-4 lg:h-5 lg:w-5" />
										)}
									</span>
									<span>{isLoading ? "Deleting Project" : "Delete Project"}</span>
								</button>
								{!isLoading && (
									<button
										onClick={() => setIsOpen(false)}
										className="inline-flex items-center space-x-1 rounded-lg bg-slate-200 px-2 py-1 text-sm font-semibold text-slate-900 transition-colors active:bg-slate-300 lg:px-4 lg:py-2 lg:text-base"
									>
										<span>
											<XMarkIcon className="h-4 w-4 lg:h-5 lg:w-5" />
										</span>
										<span>Cancel</span>
									</button>
								)}
							</div>
						</div>
					</Dialog.Panel>
				</div>
			</Dialog>
		</Transition>
	);
};

export default DeleteProject;
