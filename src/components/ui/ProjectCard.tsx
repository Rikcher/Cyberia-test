import React from 'react';
import projectCardDecoration from '/src/assets/projectCardDecoration.svg'
import projectCardDecorationMobile from '/src/assets/projectCardDecorationMobile.svg'

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
            className="rounded-xl aspect-square w-80 lg:w-[23.625rem] relative text-left group"
            style={{
                backgroundImage: `url(${project.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="hidden lg:flex bg-custom-blue rounded absolute top-6 right-7 aspect-square w-32 justify-center items-center py-7 px-5">
                <img className="absolute -top-2 -right-2" src={projectCardDecoration} alt="" />
                <p className="text-2xl font-semibold">{project.title}</p>
            </div>
            <div className='text-left lg:text-center px-7 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 ease-in-out rounded-xl absolute top-0 left-0 w-full h-full bg-hover-gradient bg-opacity-70 flex flex-col lg:flex-row items-start lg:items-end justify-end lg:justify-center gap-2 pointer-events-none'>
                <div className='flex lg:hidden flex-col items-start gap-2'>
                    <img className="" src={projectCardDecorationMobile} alt="" />
                    <p className="text-2xl font-semibold font-rubik">{project.title}</p>
                </div>
                <div className="mb-6 lg:mb-20">{hoverText}</div>
            </div>
        </button>
    );
};

export default ProjectCard;
