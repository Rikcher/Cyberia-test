import { useCurrentLabel } from "../utils/useCurrentPageLabel";
import FilterButton from "../components/ui/FilterButton";
import ProjectCard from "../components/ui/ProjectCard";
import InputField from "../components/ui/InputField";
import Textarea from "../components/ui/Textarea";
import CustomCheckbox from "../components/ui/CustomCheckbox";
import SubmitButton from "../components/ui/SubmitButton";
import { API_URL } from "../constants";
import { useEffect, useMemo, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import type {FieldValues} from 'react-hook-form'
import { useTranslation } from "react-i18next";

interface Category {
    id: number;
    name: string;
}

interface CategoriesApiResponse {
    items: Category[];
}

interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    categories: { id: number; name: string }[];
}

interface ProjectsApiResponse {
    items: Project[];
}


const Cases = () => {
    const currentLabel = useCurrentLabel()
    const { t } = useTranslation();
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [feedbackSubmitMessage, setFeedbackSubmitMessage] = useState({text: "", error: true})
    const [showFeedbackSubmitMessage, setShowFeedbackSubmitMessage] = useState(false)
    const methods = useForm()

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${API_URL}/project-categories`);
                const data: CategoriesApiResponse = await response.json();
                setCategories(data.items);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        fetchCategories();
    }, []); 

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${API_URL}/projects`);
                const data: ProjectsApiResponse = await response.json();
                setProjects(data.items);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        fetchProjects();
    }, []); 

    const sortedProjects = useMemo(() => {
        if (!selectedCategory) return projects;
        return projects.filter(project =>
            project.categories.some(category => category.id === selectedCategory)
        );
    }, [projects, selectedCategory]);

    const onSubmit = async (data: FieldValues) => {
        try {
            const response = await fetch(`${API_URL}/feedbacks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone: data.phone, email: data.email, message: data.message }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setFeedbackSubmitMessage({ text: errorData.message, error: true });
                setShowFeedbackSubmitMessage(true)
            }
            
            const responseData = await response.json();
            setFeedbackSubmitMessage({ text: responseData.message, error: false });
            setShowFeedbackSubmitMessage(true)

            methods.reset();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setShowFeedbackSubmitMessage(false)
        }, 5000)
    }, [showFeedbackSubmitMessage])
    

    return (
        <div className="flex flex-col">
            <p className="text-5xl font-semibold mb-16">{t(`${currentLabel}`)}</p>
            <div className="flex justify-between mb-12">
                {categories.map(category => (
                    <FilterButton
                        key={category.id}
                        text={category.name}
                        isSelected={selectedCategory === category.id}
                        onClick={() => {
                            if (selectedCategory === category.id) {
                                setSelectedCategory(null); 
                            } else {
                                setSelectedCategory(category.id); 
                            }
                        }}
                    />
                ))}
            </div>
            <div className="flex flex-wrap max-w-full gap-10 mb-24">
                {sortedProjects.length > 0 && sortedProjects.map(project => (
                    <ProjectCard key={project.id} hoverText="Онлайн гипермаркет. Для компании были разработаны сайт и мобильное приложение и т.д." project={project} /> //? Could get hoverText from API
                ))}
            </div>
            <p className="text-5xl font-semibold mb-[4.75rem]">{t("feedback_form_title")}</p>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col mb-24">
                    <div className="flex justify-between gap-9 mb-7">
                        <InputField label={t("name")} name="name"/>
                        <InputField label={t("email")} name="email"/>
                        <InputField label={t("phone")} name="phone"/>
                    </div>
                    <Textarea label={t("message")} name="message"/>
                    <CustomCheckbox label={t("consent")}/>
                    <SubmitButton label={t("submit")}/>
                </form>
            </FormProvider>
            <div className={`fixed z-10 transition-bottom duration-300 ease-in-out ${showFeedbackSubmitMessage ? "bottom-5" : "-bottom-20"} left-1/2 transform -translate-x-1/2 px-10 py-5 ${feedbackSubmitMessage.error ? "bg-rose-500" : "bg-emerald-600"} mx-auto`}>{feedbackSubmitMessage.text}</div>
        </div>
    )
}

export default Cases