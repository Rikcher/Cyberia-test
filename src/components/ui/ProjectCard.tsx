import React from 'react';
import projectCardDecoration from '/src/assets/projectCardDecoration.svg'

interface Project {
    id: number;
    title: string;
    image: string;
}

interface ProjectCardProps {
    project: Project;
    hoverText: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, hoverText }) => {
    return (
        <button
            className="rounded-xl aspect-square w-[23.625rem] relative text-left group overflow-hidden"
            style={{
                backgroundImage: `url(${project.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="bg-custom-blue rounded absolute top-6 right-7 aspect-square w-32 flex justify-center items-center py-7 px-5">
                <img className="absolute -top-2 -right-2" src={projectCardDecoration} alt="" />
                <p className="text-2xl font-semibold">{project.title}</p>
            </div>
            <div className='opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out flex absolute top-0 left-0 w-full h-full bg-hover-gradient bg-opacity-70 flex items-end justify-center pointer-events-none'><span className="text-center mb-20 px-5">{hoverText}</span></div>
        </button>
    );
};

export default ProjectCard;
