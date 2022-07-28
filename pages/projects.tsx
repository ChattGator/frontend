import type { NextPage } from "next";
import ProjectCard from "../components/ProjectCard"

const Projects: NextPage = () => {
	return (
        <div className="container grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 pt-20">
            <ProjectCard link="/" title="Project 1" desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia quaerat a obcaecati!" date_created={new Date()} />
            <ProjectCard link="/" title="Project 2" desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia quaerat a obcaecati!" date_created={new Date()} />
            <ProjectCard link="/" title="Project 3" desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia quaerat a obcaecati!" date_created={new Date()} />
        </div>
	);
};

export default Projects;