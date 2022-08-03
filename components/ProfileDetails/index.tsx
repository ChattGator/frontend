import Image from "next/image";
import { useState } from "react";
import {
	AtSymbolIcon,
	PencilAltIcon,
	TrashIcon,
} from "@heroicons/react/outline";
import type { FC } from "react";

interface Props {
	id: string;
}

interface DetailsCardProps {
	image: string;
	name: string;
}

const DetailsCard: FC<DetailsCardProps> = ({ image, name }) => {
	const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

	return (
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
			<p className="text-slate-600 lg:text-lg">{name}</p>
		</div>
	);
};

const ProfileDetails: FC<Props> = ({ id }) => {
	const [isAvatarLoading, setIsAvatarLoading] = useState<boolean>(true);

	return (
		<div className="space-y-4 lg:space-y-8">
			<div className="space-x-2 text-right lg:space-x-4">
				<button className="inline-flex items-center space-x-1 rounded-lg bg-blue-600 px-2 py-1 text-sm font-semibold text-white transition-colors lg:bg-blue-700 lg:px-4 lg:py-2 lg:text-base">
					<span>
						<PencilAltIcon className="h-4 w-4 lg:h-5 lg:w-5" />
					</span>
					<span>Edit</span>
				</button>
				<button className="inline-flex items-center space-x-1 rounded-lg bg-red-600 px-2 py-1 text-sm font-semibold text-white transition-colors lg:bg-red-700 lg:px-4 lg:py-2 lg:text-base">
					<span>
						<TrashIcon className="h-4 w-4 lg:h-5 lg:w-5" />
					</span>
					<span>Delete</span>
				</button>
			</div>
			<div
				className={`mx-auto h-24 w-24 rounded-full bg-slate-200 lg:h-32 lg:w-32 ${
					isAvatarLoading && "animate-pulse"
				}`}
			>
				<Image
					src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
					alt="notion avatar"
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
				<p className="text-xl font-semibold text-slate-900 lg:text-2xl">
					John Doe
				</p>
				<p className="flex items-center justify-center font-light text-slate-600 lg:text-lg">
					<span>
						<AtSymbolIcon className="h-5 w-5 lg:h-6 lg:w-6" />
					</span>
					<span>johndoe</span>
				</p>
			</div>
			<div>
				<div className="text-sm font-semibold text-slate-900 lg:text-base">
					Bio
				</div>
				<div className="max-w-prose text-gray-600 lg:text-lg">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit.
					Voluptates in impedit ipsa quos facere adipisci quam
					corrupti quod mollitia molestias?
				</div>
			</div>
			<div className="space-y-2 lg:space-y-4">
				<div className="text-sm font-semibold text-slate-900 lg:text-base">
					3 groups joined
				</div>
				<div className="space-y-2">
					<DetailsCard
						image="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
						name="Team NPM"
					/>
					<DetailsCard
						image="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
						name="Team NPM"
					/>
					<DetailsCard
						image="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
						name="Team NPM"
					/>
				</div>
			</div>
		</div>
	);
};

export default ProfileDetails;
