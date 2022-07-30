import Image from "next/image";
import type { FC } from "react";
import {GroupCard} from "@components"

interface Card{
	name: String;
	description: String,
	Image: String;
	totalGroupsJoined: number;
	groupsJoined: Array<String>;
}

const ProfileDetails: FC = () => {
	return (
		<>
			<div className="w-full lg:w-2/3 rounded-xl bg-blue-50 drop-shadow-md shadow-blue-700 ">
				<div className="flex flex-col justify-center items-center mt-5 mb-5 py-5 mx-2 space-y-2 drop-shadow-sm shadow-black bg-blue-700 rounded-xl ">
					<div className="w-fit object-cover border-black ml-5 hover:drop-shadow-2xl hover:shadow-white mx-5">
					<div className="h-20 w-20 rounded-full lg:h-24 lg:w-24">
					<Image
						src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
						alt="notion avatar"
						width="1"
						height="1"
						layout="responsive"
						objectFit="cover"
						objectPosition="center center"
						className="rounded-full"
					/>
					</div>
					
				</div>
					<div className="font-semibold text-xl text-white">John Doe</div>
					<div className="font-light text-sm text-white">@johndoe</div>
				</div>
				
				<div>
					<div className="border-t-2 border-gray-300"></div>
				</div>
				
				<div className="mt-3 mb-3 py-3 mx-3  rounded-xl drop-shadow-sm shadow-black">
					<div className="mx-3 text-md">Bio</div>
					<div className="mx-3 text-gray-500 text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates in impedit ipsa quos facere adipisci quam corrupti quod mollitia molestias?</div>
				</div>
				<div>
					<div className="border-t-2 border-gray-300"></div>
				</div>
				<div className="sm:flex justify-center items-center">
					<div className="mt-3 mb-3 py-3 mx-3 bg-blue-100 rounded-xl drop-shadow-sm shadow-black text-sm">
					<div className="mx-3 flex flex-col items-center justify-center">
						<div className="font-medium text-sm">Total messages sent: </div>
						<div className="mx-3 font-semibold">50000</div>
					</div>
					</div>

					<div className="mt-3 mb-3 py-3 mx-3 bg-blue-100 rounded-xl drop-shadow-sm shadow-black text-sm">
					<div className="mx-3 flex flex-col items-center justify-center">
						<div className="font-medium text-sm">Total messages sent: </div>
						<div className="mx-3 font-semibold">50000</div>
					</div>
					</div>
					
				</div>
					<div>
						<div className="border-t-2 border-gray-300"></div>
					</div>
				<div className="mt-3 mb-3 py-3 mx-3 flex flex-col justify-center items-center ">
					<div className="flex justify-center items-center space-x-4">

					<div className="font-bold text-lg">Groups Joined</div>
					<div className="p-1 bg-blue-700 rounded-md text-white">50</div>
					</div>
					<div className="w-full h-full">

					<GroupCard/>
					</div>
				</div>
			</div>
		</>
	)
}

export default ProfileDetails;