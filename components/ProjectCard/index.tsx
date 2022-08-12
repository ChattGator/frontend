import Link from "next/link";
import { ClockIcon } from "@heroicons/react/outline";
import type { FC } from "react";

interface Props {
	link: string;
	title: string;
	description: string;
	createdAt: Date;
}

const ProjectCard: FC<Props> = ({ link, title, description, createdAt }) => {
	return (
		<Link href={link}>
			<a className="aspect-video rounded-lg border-2 border-slate-200 bg-white transition-colors hover:border-blue-600 active:bg-blue-100">
				<h2 className="border-b-2 border-slate-200 py-2 px-4 text-2xl font-semibold text-blue-600 lg:py-4 lg:px-8 lg:text-3xl">
					{title}
				</h2>
				<div className="space-y-2 py-2 px-4 lg:space-y-4 lg:py-4 lg:px-8">
					<p className="text-slate-600 lg:text-lg">{description}</p>
					<p className="flex items-center space-x-1 text-sm font-light text-slate-400 lg:text-base">
						<span>
							<ClockIcon className="h-4 w-4 lg:h-5 lg:w-5" />
						</span>
						<span>
							{createdAt.toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</span>
					</p>
				</div>
			</a>
		</Link>
	);
};

export default ProjectCard;
