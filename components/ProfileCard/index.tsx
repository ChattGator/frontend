import Image from "next/image";
import { useState } from "react";
import { AtSymbolIcon } from "@heroicons/react/24/outline";
import type { FC, Dispatch, SetStateAction } from "react";

interface Props {
	name: string;
	_id: string;
	id: string;
	setId: Dispatch<SetStateAction<string>>;
}

type ConditionalProps =
	| {
			username?: string;
			avatar?: string;
			description?: never;
			totalGroupMembers?: never;
	  }
	| {
			username?: never;
			avatar?: never;
			description?: string;
			totalGroupMembers?: number;
	  };

const ProfileCard: FC<Props & ConditionalProps> = ({
	_id,
	id,
	setId,
	name,
	description,
	username,
	avatar,
	totalGroupMembers,
}) => {
	const [isImageLoading, setIsImageLoading] = useState<boolean>(false);

	return (
		<>
			<button
				onClick={() => setId(_id)}
				className={`block w-full rounded-lg border-2 p-2 transition-colors lg:p-4 ${
					_id === id ? "border-blue-600 bg-blue-200" : "border-slate-200 hover:bg-blue-100"
				}`}
			>
				<div className="flex items-center space-x-2 lg:space-x-4">
					{avatar && (
						<div
							className={`h-12 w-12 flex-shrink-0 rounded-full bg-slate-200 lg:h-16 lg:w-16 ${
								isImageLoading && "animate-pulse"
							}`}
						>
							<Image
								src={avatar}
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
					)}
					<p className="text-left">
						<span
							className={`mb-1 block font-semibold ${
								_id === id ? "text-blue-600" : "text-slate-900"
							} lg:text-lg`}
						>
							{name}
						</span>
						<span className="block text-sm text-slate-600 line-clamp-1 lg:text-base">
							{username ? (
								<span className="inline-flex items-center">
									<AtSymbolIcon className="h-3 w-3 lg:h-4 lg:w-4" />
									<span>{username}</span>
								</span>
							) : (
								description
							)}
						</span>
						{((!username && totalGroupMembers !== null) || totalGroupMembers !== undefined) && (
							<span className="block text-sm font-light text-slate-600 lg:text-base">
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
