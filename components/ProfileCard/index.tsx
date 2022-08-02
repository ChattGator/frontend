import Image from "next/image";
import { useState } from "react";
import { AtSymbolIcon } from "@heroicons/react/outline";
import type { FC } from "react";

interface Props {
	name: string;
	image: string;
	isActive?: boolean;
}

type ConditionalProps =
	| {
			username?: string;
			description?: never;
			totalGroupMembers?: never;
	  }
	| {
			username?: never;
			description?: string;
			totalGroupMembers?: number;
	  };

const ProfileCard: FC<Props & ConditionalProps> = ({
	name,
	description,
	username,
	image,
	totalGroupMembers,
	isActive,
}) => {
	const [isImageLoading, setIsImageLoading] = useState<boolean>(false);

	return (
		<>
			<button
				className={`block w-full rounded-lg p-2 transition-colors lg:p-4 ${
					isActive ? "bg-blue-600" : "bg-blue-100 hover:bg-blue-200"
				}`}
			>
				<div className="flex items-center space-x-2 lg:space-x-4">
					<div
						className={`h-12 w-12 rounded-full bg-slate-200 lg:h-16 lg:w-16 ${
							isImageLoading && "animate-pulse"
						}`}
					>
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
					<p className="text-left">
						<span
							className={`mb-1 block font-semibold ${
								isActive ? "text-white" : "text-slate-900"
							} lg:text-lg`}
						>
							{name}
						</span>
						<span
							className={`block text-sm line-clamp-1 lg:text-base ${
								isActive ? "text-slate-200" : "text-slate-600"
							}`}
						>
							{username ? (
								<span className="inline-flex items-center">
									<AtSymbolIcon className="h-3 w-3 lg:h-4 lg:w-4" />
									<span>{username}</span>
								</span>
							) : (
								description
							)}
						</span>
						{totalGroupMembers && (
							<span
								className={`block text-sm font-light lg:text-base ${
									isActive
										? "text-slate-200"
										: "text-slate-600"
								}`}
							>
								<span>Total Members: {totalGroupMembers}</span>
							</span>
						)}
					</p>
				</div>
			</button>
		</>
	);
};

export default ProfileCard;
