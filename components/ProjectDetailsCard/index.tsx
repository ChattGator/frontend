import {
	PencilIcon,
	TrashIcon,
	ClipboardDocumentIcon,
	ClipboardDocumentCheckIcon,
	CheckIcon,
	XMarkIcon,
	ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { Input, Loading, DeleteProject } from "@components";
import { Project } from "@utils";
import { useRouter } from "next/router";
import { useUser } from "@contexts";
import type { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	value: string;
}

interface InputType {
	value: string;
	errorMessage: string;
}

interface Props {
	title: string;
	id: string;
	secret: string;
	description: string;
}

const Credentials: FC<InputProps> = ({ label, value, ...rest }) => {
	const [isCopied, setIsCopied] = useState<boolean>(false);

	const handleIsCopied: () => void = async () => {
		setIsCopied(true);
		await navigator.clipboard.writeText(value);

		setTimeout(() => {
			setIsCopied(false);
		}, 5000);
	};

	return (
		<div>
			<label className="block w-full text-xs font-semibold text-slate-600 lg:text-sm">
				<span>{label}</span>
			</label>
			<div className="flex items-center space-x-2 lg:space-x-4">
				<input
					className="w-full flex-grow select-all truncate rounded-lg border border-slate-200 p-3 text-sm placeholder-slate-400 ring-blue-600 transition-all focus:border-transparent focus:outline-none focus:ring-2 lg:text-base"
					readOnly
					value={value}
					{...rest}
				/>
				<button
					onClick={handleIsCopied}
					className="rounded-lg"
				>
					{isCopied ? (
						<ClipboardDocumentCheckIcon className="h-6 w-6 lg:h-7 lg:w-7" />
					) : (
						<ClipboardDocumentIcon className="h-6 w-6 lg:h-7 lg:w-7" />
					)}
				</button>
			</div>
		</div>
	);
};

const ProjectDetailsCard: FC<Props> = ({ id, title, secret, description }) => {
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [editTitle, setEditTitle] = useState<InputType>({ value: title, errorMessage: "" });
	const [editDescription, setEditDescription] = useState<InputType>({ value: description, errorMessage: "" });
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isDeleting, setIsDeleting] = useState<boolean>(false);
	const router = useRouter();
	const { user } = useUser();

	const handleSave: () => void = async () => {
		if (editTitle.value.trim() === "" || editTitle.errorMessage) {
			if (editTitle.errorMessage.length === 0)
				setEditTitle((title) => ({
					...title,
					errorMessage: "This field is required",
				}));
			return;
		}

		if (editDescription.value.trim() === "" || editDescription.errorMessage) {
			if (editDescription.errorMessage.length === 0)
				setEditDescription((description) => ({
					...description,
					errorMessage: "This field is required",
				}));
			return;
		}

		setIsLoading(true);
		const projectService = new Project();
		// TODO-WARNING: Not tested
		await projectService.updateProject(
			id,
			{ name: editTitle.value, description: editDescription.value },
			user?.token
		);
		setIsLoading(false);
		router.reload();
	};

	return (
		<>
			<DeleteProject
				id={id}
				isOpen={isDeleting}
				setIsOpen={setIsDeleting}
			/>
			<div className="rounded-lg border-2 border-slate-200 bg-white">
				<div className="space-y-4 border-b-2 border-slate-200 p-4 sm:flex sm:items-center sm:justify-between sm:space-y-0 lg:p-8">
					<div className="md:w-96">
						{isEditing ? (
							<Input
								isRequired={true}
								label="Title"
								state={editTitle}
								setState={setEditTitle}
							/>
						) : (
							<h3 className="text-3xl font-bold tracking-tight text-blue-600 lg:text-4xl">{title}</h3>
						)}
					</div>
					<div className="space-x-2 lg:space-x-4">
						{isEditing ? (
							<>
								<button
									onClick={() => handleSave()}
									disabled={isLoading}
									className="inline-flex items-center space-x-1 rounded-lg bg-blue-600 px-2 py-1 text-sm font-semibold text-white transition-colors active:bg-blue-700 disabled:space-x-2 disabled:bg-slate-200 disabled:text-slate-900 lg:px-4 lg:py-2 lg:text-base"
								>
									<span>
										{isLoading ? (
											<Loading className="h-5 w-5" />
										) : (
											<CheckIcon className="h-4 w-4 lg:h-5 lg:w-5" />
										)}
									</span>
									<span>{isLoading ? "Saving Changes" : "Save Changes"}</span>
								</button>
								{!isLoading && (
									<button
										onClick={() => setIsEditing(false)}
										className="inline-flex items-center space-x-1 rounded-lg bg-slate-200 px-2 py-1 text-sm font-semibold text-slate-900 transition-colors active:bg-slate-300 lg:px-4 lg:py-2 lg:text-base"
									>
										<span>
											<XMarkIcon className="h-4 w-4 lg:h-5 lg:w-5" />
										</span>
										<span>Cancel</span>
									</button>
								)}
							</>
						) : (
							<>
								<button
									onClick={() => setIsEditing(true)}
									className="inline-flex items-center space-x-1 rounded-lg bg-blue-600 px-2 py-1 text-sm font-semibold text-white transition-colors active:bg-blue-700 lg:px-4 lg:py-2 lg:text-base"
								>
									<span>
										<PencilIcon className="h-4 w-4 lg:h-5 lg:w-5" />
									</span>
									<span>Edit</span>
								</button>
								<button
									onClick={() => setIsDeleting(true)}
									className="inline-flex items-center space-x-1 rounded-lg bg-red-600 px-2 py-1 text-sm font-semibold text-white transition-colors active:bg-red-700 lg:px-4 lg:py-2 lg:text-base"
								>
									<span>
										<TrashIcon className="h-4 w-4 lg:h-5 lg:w-5" />
									</span>
									<span>Delete</span>
								</button>
							</>
						)}
					</div>
				</div>
				<div className="space-y-4 p-4 text-slate-600 lg:space-y-8 lg:p-8">
					<div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-16">
						<Credentials
							label="Project ID"
							value={id}
						/>
						<Credentials
							label="Project Secret"
							value={secret}
							type="password"
						/>
					</div>
					<div>
						{isEditing ? (
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
										setEditDescription((editDescription) => ({
											...editDescription,
											value: e.target.value,
										}))
									}
									value={editDescription.value}
								/>
								{editDescription.errorMessage && (
									<>
										<span className="block text-xs font-semibold text-slate-900 lg:text-sm">
											Description
										</span>
										<p className="inline-flex items-center space-x-1 text-xs font-semibold text-red-600 lg:text-sm">
											<ExclamationCircleIcon className="h-4 w-4 lg:h-5 lg:w-5" />
											{editDescription.errorMessage}
										</p>
									</>
								)}
							</div>
						) : (
							<p className="max-w-prose text-gray-600 lg:text-lg">{description}</p>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default ProjectDetailsCard;
