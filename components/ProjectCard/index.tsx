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
			<a className="grid aspect-video place-content-center gap-2 rounded-lg border-2 border-slate-200 bg-white p-4 text-center transition-all hover:border-blue-600 hover:shadow-blue-200 active:bg-blue-100 lg:gap-4 lg:p-8">
				<h2 className="text-2xl font-semibold text-blue-600 lg:text-3xl">
					{title}
				</h2>
				<p className="text-slate-600 lg:text-lg">{description}</p>
				<p className="flex items-center justify-center space-x-1 text-sm font-light text-slate-400 lg:text-base">
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
			</a>
		</Link>
	);
};

export default ProjectCard;
