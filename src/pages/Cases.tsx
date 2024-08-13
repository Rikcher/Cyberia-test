import { useCurrentLabel } from "../utils/useCurrentPageLabel";
import FilterButton from "../components/ui/FilterButton";
import ProjectCard from "../components/ui/ProjectCard";
import InputField from "../components/ui/InputField";
import Textarea from "../components/ui/Textarea";
import CustomCheckbox from "../components/ui/CustomCheckbox";
import SubmitButton from "../components/ui/SubmitButton";
import feedbackIconMobile from "/src/assets/feedbackIconMobile.svg"
import { API_URL } from "../constants";
import { useEffect, useMemo, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import type {FieldValues} from 'react-hook-form'
import { useTranslation } from "react-i18next";

//! сделал перевод только ui элементов, перевод информации, получаемой с сервера вытягивал бы с него же 

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
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [isLoadingProjects, setIsLoadingProjects] = useState(false);
    const methods = useForm() //Использую вместе с форм провайдером, чтобы работал обмен информацией между формой в этом файле и инпут филдах, вынесенных в отдельные элементы

    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoadingCategories(true); //пока сатегории фетчатся, крутится кольцо загрузки
            try {
                let categoriesFromStorage = localStorage.getItem('categories'); //если в локал сторадже уже есть категории - сразу рендер эелемента, если нет - фетч
                if (categoriesFromStorage) {
                    setCategories(JSON.parse(categoriesFromStorage));
                    return; 
                }
                const response = await fetch(`${API_URL}/project-categories`);
                const data: CategoriesApiResponse = await response.json();
                setCategories(data.items);
                localStorage.setItem('categories', JSON.stringify(data.items));
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            } finally {
                setIsLoadingCategories(false);
            }
        };
    
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProjects = async () => {
            setIsLoadingProjects(true);//пока проекты фетчатся, крутится кольцо загрузки ( отельное от кольца загрузки категорий )
            try {
                let projectsFromStorage = localStorage.getItem('projects'); //такая же логика с локал стораджем, как в случае с категориями 
                if (projectsFromStorage) {
                    setProjects(JSON.parse(projectsFromStorage));
                    return; 
                }
                const response = await fetch(`${API_URL}/projects`);
                const data: ProjectsApiResponse = await response.json();
                setProjects(data.items);
                localStorage.setItem('projects', JSON.stringify(data.items));
            } catch (error) {
                console.error('Failed to fetch projects:', error);
            } finally {
                setIsLoadingProjects(false);
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
                setFeedbackSubmitMessage({ text: errorData.message, error: true }); //вывести сообщение ошибки на экран пользователя
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
            setShowFeedbackSubmitMessage(false) //сообщение о статусе отправки фидбека будет висеть 5 секунд и после исчезнет
        }, 5000)
    }, [showFeedbackSubmitMessage])
    

    return (
        <div className="flex flex-col">
            <p className="text-xl font-medium font-rubik lg:font-fira sm:text-5xl font-semibold mb-12 lg:mb-16">{t(`${currentLabel}`)}</p>
            {isLoadingCategories && (
                <div className="flex justify-center items-center mt-8">
                    <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-900 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                </div>
            )}
            <div className="mx-auto lg:mx-0 grid grid-cols-2 gap-4 auto-rows-auto sm:flex sm:flex-wrap sm:gap-6 lg:justify-between mb-12">
                {categories.map(category => (
                    <FilterButton
                        key={category.id}
                        text={category.name}
                        isSelected={selectedCategory === category.id}
                        onClick={() => {
                            if (selectedCategory === category.id) {
                                setSelectedCategory(null); //если нажать на кнопку категории повторно - фильтр сбросится
                            } else {
                                setSelectedCategory(category.id); 
                            }
                        }}
                    />
                ))}
            </div>
            {isLoadingProjects && (
                <div className="flex justify-center items-center mt-8">
                    <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-900 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                </div>
            )}
            <div className="flex flex-wrap max-w-full justify-center gap-5 lg:gap-14 mb-14 lg:mb-24">
                {/* тут текст можно было бы тянуть с сервера, но я ничего подобного в постмене не увидел, так что захардкодил. Перевод не стал делать, тк опять-таки он бы тянулся с сервера  */}
                {sortedProjects.length > 0 && sortedProjects.map(project => (
                    <ProjectCard key={project.id} hoverText="Онлайн гипермаркет. Для компании были разработаны сайт и мобильное приложение и т.д." project={project} /> //? Could get hoverText from API
                ))}
            </div>
            <div className="flex gap-5 items-center mb-9 lg:mb-[4.75rem] w-full lg:w-[22.5rem] justify-center lg:justify-start">
                <img className="block lg:hidden w-[4.75rem]" src={feedbackIconMobile} alt="" />
                <p className="text-2xl lg:text-5xl font-semibold font-rubik lg:font-fira">{t("feedback_form_title")}</p>
            </div>
            {/* Тут вопользовался react-hook-form для удобства. Форм провайдер соответственно из него же для обмена информацией формы с элементами в других файлах */}
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col mb-9 lg:mb-24">
                    <div className="flex flex-col lg:flex-row justify-between gap-5 lg:gap-9 mb-7">
                        <InputField label={t("name")} name="name"/>
                        <InputField label={t("email")} name="email"/>
                        <InputField label={t("phone")} name="phone"/>
                    </div>
                    <Textarea label={t("message")} name="message"/>
                    <CustomCheckbox label={t("consent")}/>
                    <SubmitButton label={t("submit")}/>
                    <p className="mt-6 text-center mx-auto max-w-80 lg:hidden">{t("consent_mobile")}</p>
                </form>
            </FormProvider>
            {/* сообщение о успехе или ошибке отправки формы */}
            <div className={`fixed z-10 text-center transition-bottom duration-300 ease-in-out ${showFeedbackSubmitMessage ? "bottom-5" : "-bottom-20"} left-1/2 transform -translate-x-1/2 px-10 py-5 ${feedbackSubmitMessage.error ? "bg-rose-500" : "bg-emerald-600"} mx-auto`}>{feedbackSubmitMessage.text}</div>
        </div>
    )
}

export default Cases