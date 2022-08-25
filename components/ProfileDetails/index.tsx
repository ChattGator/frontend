import Image from "next/image";
import { useEffect, useState } from "react";
import { AtSymbolIcon } from "@heroicons/react/24/outline";
import { Loading } from "@components";
import { Project } from "@utils";
import { useUser } from "@contexts";
import type { FC } from "react";

interface Props {
	id: string;
	type: "user" | "group";
}

interface Member {
	name: string;
	_id: string;
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
	admins: Member[];
	membersList: Member[];
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
	const [isAvatarLoading, setIsAvatarLoading] = useState<boolean>(true);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [data, setData] = useState<any>(null);
	const [isMembersLoading, setIsMembersLoading] = useState<boolean>(true);
	const [members, setMembers] = useState<ChatUserResposne[]>([]);
	const projectService = new Project();

	useEffect(() => {
		const getData = async () => {
			let res: any = null;
			switch (type) {
				case "user":
					res = await projectService.getUserById(id);
					break;
				case "group":
					res = await projectService.getGroupById(id);
					const membersArr = [];
					for (let i of res.membersList) {
						const userData = await projectService.getUserById(i._id);
						membersArr.push(userData);
					}
					setMembers(membersArr);
					setIsMembersLoading(false);
					break;
				default:
					break;
			}
			setData(res);
			setIsLoading(false);
			return res;
		};
		setIsLoading(true);
		setIsMembersLoading(true);
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
			<div className="text-center">
				<p className="text-xl font-semibold text-slate-900 lg:text-2xl">{data?.name ?? "Personal Chat"}</p>
				{type === "user" && (
					<p className="flex items-center justify-center font-light text-slate-600 lg:text-lg">
						<span>
							<AtSymbolIcon className="h-5 w-5 lg:h-6 lg:w-6" />
						</span>
						<span>{data?.userName ?? "unknown_name"}</span>
					</p>
				)}
			</div>
			{data && (data.bio || data.description) && (
				<div>
					<span className="block text-sm font-semibold text-slate-900 lg:text-base">
						{type === "user" ? "Bio" : "Description"}
					</span>
					<p className="max-w-prose text-gray-600 lg:text-lg">
						{type === "user" ? data?.bio : data?.description}
					</p>
				</div>
			)}
			{type === "group" &&
				(isMembersLoading ? (
					<div className="flex items-center justify-center space-x-2">
						<Loading className="h-4 w-4 text-blue-600 lg:h-6 lg:w-6" />
						<span className="font-semibold text-blue-600 lg:text-lg">Loading Members</span>
					</div>
				) : (
					<div className="space-y-2 lg:space-y-4">
						<div className="text-sm font-semibold text-slate-900 lg:text-base">3 groups joined</div>
						<div className="space-y-2">
							{members.map((member, index) => (
								<DetailsCard
									key={index}
									image={
										member?.avatar ??
										`https://ui-avatars.com/api/name=${
											member?.name ?? "Unknown Name"
										}?&background=random`
									}
									name={member?.name ?? "Unknown Name"}
									isAdmin={
										data?.admins
											? data?.admins.find((admin: Member) => admin._id === member._id)
											: false
									}
								/>
							))}
						</div>
					</div>
				))}
		</div>
	);
};

export default ProfileDetails;
