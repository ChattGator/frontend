import Link from "next/link";
import { ClockIcon } from "@heroicons/react/solid"

interface Props {
    link:string, 
    title:string, 
    desc:string, 
    date_created:Date
}

const ProjectCard = ({ link, title, desc, date_created }: Props) => {
    return (
        <Link href={ link }>
            <a>
                <div className="h-full px-8 pt-8 rounded-lg overflow-hidden text-center shadow-lg transition-shadow space-y-3 border hover:shadow-blue-200 hover:border-blue-200">
                    <h3 className="lg:text-2xl text-xl font-semibold text-slate-600">{ title }</h3>
                    <p className="leading-relaxed text-slate-500">{ desc }</p>
                    <div className="text-center leading-none flex justify-center w-full pt-4">
                        <span className="text-slate-400 inline-flex items-center leading-none text-sm pr-3 pb-3">
                            <ClockIcon className="h-6 w-6 mr-2"/>
                            <span>{ date_created.toDateString() }</span>
                        </span>
                    </div>
                </div>
            </a>
        </Link>
    )
}

export default ProjectCard;