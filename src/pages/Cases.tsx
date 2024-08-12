import { useCurrentLabel } from "../utils/useCurrentPageLabel";
import FilterButton from "../components/ui/FilterButton";

const Cases = () => {
    const currentLabel = useCurrentLabel()

    return (
        <div className="flex flex-col">
            <p className="text-5xl font-semibold mb-16">{currentLabel}</p>
            <div className="flex justify-between mb-12">
                <FilterButton text="Продвижение"/>
                <FilterButton text="Разработка"/>
                <FilterButton text="Мобильные приложения"/>
                <FilterButton text="Юзабилити-аудит"/>
            </div>
        </div>
    )
}

export default Cases