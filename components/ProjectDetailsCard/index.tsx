import { PencilIcon, TrashIcon, ClipboardCopyIcon, ClipboardCheckIcon } from "@heroicons/react/solid";
import { useState } from "react";
import type { FC, InputHTMLAttributes } from "react";

interface Props {
	name: string;
	projectKey: string;
	projectSecret: string;
	description: string;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	value: string;
}

const Input: FC<InputProps> = ({ label, value, ...rest }) => {
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
					className="w-full flex-grow truncate rounded-lg border border-slate-200 p-3 text-sm placeholder-slate-400 ring-blue-600 transition-all focus:border-transparent focus:outline-none focus:ring-2 lg:text-base"
					readOnly
					value={value}
					{...rest}
				/>
				<button
					onClick={handleIsCopied}
					className="rounded-lg"
				>
					{isCopied ? (
						<ClipboardCheckIcon className="h-6 w-6 lg:h-7 lg:w-7" />
					) : (
						<ClipboardCopyIcon className="h-6 w-6 lg:h-7 lg:w-7" />
					)}
				</button>
			</div>
		</div>
	);
};

const ProjectDetailsCard: FC<Props> = ({ name, projectKey, projectSecret }) => {
	return (
		<div className="rounded-lg border-2 border-slate-200 bg-white">
			<div className="space-y-4 border-b-2 border-slate-200 p-4 sm:flex sm:items-center sm:justify-between sm:space-y-0 lg:p-8">
				<h3 className="text-3xl font-bold tracking-tight text-blue-600 lg:text-4xl">{name}</h3>
				<div className="space-x-2 lg:space-x-4">
					<button className="inline-flex items-center space-x-1 rounded-lg bg-blue-600 px-2 py-1 text-sm font-semibold text-white transition-colors active:bg-blue-700 lg:px-4 lg:py-2 lg:text-base">
						<span>
							<PencilIcon className="h-4 w-4 lg:h-5 lg:w-5" />
						</span>
						<span>Edit</span>
					</button>
					<button className="inline-flex items-center space-x-1 rounded-lg bg-red-600 px-2 py-1 text-sm font-semibold text-white transition-colors active:bg-red-700 lg:px-4 lg:py-2 lg:text-base">
						<span>
							<TrashIcon className="h-4 w-4 lg:h-5 lg:w-5" />
						</span>
						<span>Delete</span>
					</button>
				</div>
			</div>
			<div className="space-y-4 p-4 text-slate-600 lg:space-y-8 lg:p-8">
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-16">
					<Input
						label="Project Key"
						value={projectKey}
					/>
					<Input
						label="Project Secret"
						value={projectSecret}
						type="password"
					/>
				</div>
				<div>
					<span className="block text-xs font-semibold text-slate-900 lg:text-sm">Description</span>
					<p className="max-w-prose text-gray-600 lg:text-lg">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates in impedit ipsa quos facere
						adipisci quam corrupti quod mollitia molestias?
					</p>
				</div>
			</div>
		</div>
	);
};

export default ProjectDetailsCard;
