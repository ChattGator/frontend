import Image from "next/image";
import type { FC } from "react";

interface Card{
	name: String;
	description: String,
	Image: String;
}

const ProfileCard: FC = () => {
	return (
		<>
			<button className="h-full  sm:w-full md:w-1/2 lg:w:1/2 rounded-xl bg-blue-50 drop-shadow-sm shadow-black hover:drop-shadow-xl hover:text-white hover:bg-blue-700 outline-none">
			<div className="flex items-center justify-evenly mt-3 mb-3">
				<div className="w-fit object-cover border-black ml-5 hover:drop-shadow-2xl hover:shadow-white mx-5">
					<div className="h-10 w-10 rounded-full bg-slate-200 lg:h-12 lg:w-12">
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
				<div className="space-y-1">
					<span className="block text-left font-medium text-md">Barun Debnath</span>
					<span className="block text-left font-light text-sm">Lorem ipsum, dolor sit amet. Lorem ipsum, dolor sit amet.</span>
				</div>
				<div className="flex-col justify-content align-center border rounded-lg m-4 bg-blue-700 text-white hover:bg-blue-50 hover:text-blue-700 ">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
						<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
					</svg>
				</div>
			</div>		
		</button>
		
		</>
	)
}

export default ProfileCard;