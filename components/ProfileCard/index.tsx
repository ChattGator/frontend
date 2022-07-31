import Image from "next/image";
import { useState } from "react";
import type { FC } from "react";

interface Card {
	name: string;
	description?: string;
	username?: string;
	image: string;
	isActive?: boolean;
}

const ProfileCard: FC<Card> = ({
	name,
	description,
	username,
	image,
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
						className={`h-10 w-10 rounded-full bg-slate-200 lg:h-12 lg:w-12 ${
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
					<p className="space-y-1 text-left">
						<span
							className={`block font-semibold ${
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
							{username ? username : description}
						</span>
					</p>
				</div>
			</button>
		</>
	);
};

export default ProfileCard;
