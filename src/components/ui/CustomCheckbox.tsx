import { useState } from "react";

interface CustomCheckboxProps {
    label: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ label }) => {
    const [checked, setChecked] = useState(false)

    return (
        <div className="hidden lg:flex gap-3 items-center mb-16">
            <div className="relative">
                <input
                    onClick={() => setChecked(!checked)}
                    type="checkbox"
                    name="agreement"
                    id="agreement"
                    className="cursor-pointer appearance-none w-6 h-6 border border-white rounded-sm checked:border-blue-600 checked:bg-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600 focus:outline-none"
                />
                <span className="material-icons absolute top-0 left-0 text-white select-none pointer-events-none">{checked && "check"}</span>
            </div>
            <label htmlFor="agreement" className="font-light cursor-pointer select-none">{label}</label>
        </div>
    );
};

export default CustomCheckbox;
