import Image from "next/image";
import { useEffect, useState } from "react";
import { AtSymbolIcon } from "@heroicons/react/24/outline";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Loading } from "@components";
import { Project } from "@utils";
import { useUser } from "@contexts";
import type { FC } from "react";

interface Props {
	id: string;
	type: "user" | "group";
}

interface DetailsCardProps {
	image: string;
	name: string;
	isAdmin: boolean;
}

interface ChatUserResposne {
	_id: string;
	projectId: string;
	name: string;
	userId: string;
	avatar: string;
	userName: string;
	bio: string;
	createdAt: string;
}

interface GroupResponse {
	_id: string;
	projectId: string;
	name: string;
	description: string;
	isGroup: boolean;
	admins: string[];
	membersList: string[];
	messages: any[];
	createdAt: string;
}

const DetailsCard: FC<DetailsCardProps> = ({ image, name, isAdmin }) => {
	const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

	return (
		<div className="flex items-center space-x-2 lg:space-x-4">
			<div className={`h-12 w-12 rounded-full bg-slate-200 lg:h-16 lg:w-16 ${isImageLoading && "animate-pulse"}`}>
				<Image
					src={image}
					alt={name}
					width="1"
					height="1"
					layout="responsive"
					objectFit="cover"
					objectPosition="center center"
					className="rounded-full"
					onLoad={() => setIsImageLoading(false)}
				/>
			</div>
			<p className="text-slate-600 lg:text-lg">{name}</p>
			{isAdmin && (
				<span className="rounded-lg bg-blue-200 px-2 py-1 text-xs font-semibold text-blue-600 lg:text-sm">
					Group Admin
				</span>
			)}
		</div>
	);
};

const ProfileDetails: FC<Props> = ({ id, type }) => {
	const { user } = useUser();
	const [isAvatarLoading, setIsAvatarLoading] = useState<boolean>(true);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [data, setData] = useState<any>(null);
	const projectService = new Project();

	useEffect(() => {
		let res: any = null;
		const getData = async () => {
			switch (type) {
				case "user":
					res = await projectService.getUserById(id, user?.token);
					break;
				case "group":
					res = await projectService.getGroupById(id, user?.token);
					break;
				default:
					break;
			}
			setData(res);
			setIsLoading(false);
		};

		setIsLoading(true);
		getData();
	}, [id]);

	if (isLoading)
		return (
			<div className="flex h-full items-center justify-center space-x-2">
				<Loading className="h-6 w-6 text-blue-600 lg:h-8 lg:w-8" />
				<span className="font-semibold text-blue-600 lg:text-lg">Loading</span>
			</div>
		);

	return (
		<div className="space-y-4 lg:space-y-8">
			<div className="space-x-2 text-right lg:space-x-4">
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
			{type === "user" && (
				<div
					className={`mx-auto h-24 w-24 rounded-full bg-slate-200 lg:h-32 lg:w-32 ${
						isAvatarLoading && "animate-pulse"
					}`}
				>
					<Image
						src={
							data?.avatar ??
							`https://ui-avatars.com/api/name=${data?.name ?? "Unknown Name"}?&background=random`
						}
						alt={data?.name ?? "Unknown Name"}
						width="1"
						height="1"
						layout="responsive"
						objectFit="cover"
						objectPosition="center center"
						className="rounded-full"
						onLoad={() => setIsAvatarLoading(false)}
					/>
				</div>
			)}
			<div className="text-center">
				<p className="text-xl font-semibold text-slate-900 lg:text-2xl">{data?.name ?? "Unknown Name"}</p>
				{type === "user" && (
					<p className="flex items-center justify-center font-light text-slate-600 lg:text-lg">
						<span>
							<AtSymbolIcon className="h-5 w-5 lg:h-6 lg:w-6" />
						</span>
						<span>{data?.userName ?? "unknown_name"}</span>
					</p>
				)}
			</div>
			{data && (
				<div>
					<span className="block text-sm font-semibold text-slate-900 lg:text-base">
						{type === "user" ? "Bio" : "Description"}
					</span>
					<p className="max-w-prose text-gray-600 lg:text-lg">
						{type === "user" ? data?.bio : data?.description}
					</p>
				</div>
			)}
			{/* <div className="space-y-2 lg:space-y-4">
				<div className="text-sm font-semibold text-slate-900 lg:text-base">3 groups joined</div>
				<div className="space-y-2">
					<DetailsCard
						image="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
						name="Team NPM"
						isAdmin={true}
					/>
					<DetailsCard
						image="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
						name="Team NPM"
						isAdmin={false}
					/>
					<DetailsCard
						image="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
						name="Team NPM"
						isAdmin={false}
					/>
				</div>
			</div> */}
		</div>
	);
};

export default ProfileDetails;
