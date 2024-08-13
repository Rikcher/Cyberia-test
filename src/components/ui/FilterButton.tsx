import React from 'react';

interface FilterButtonProps {
    text: string;
    isSelected?: boolean; // Optional prop to indicate if this button is the selected one
    onClick?: () => void; // Optional onClick handler
}

const FilterButton: React.FC<FilterButtonProps> = ({ text, isSelected = false ,onClick }) => {
    return (
        <button
            className={`shadow-[8px_15px_29px_0_rgba(23,27,44,0.41)] py-[0.625rem] px-7 rounded-lg transition-bg duration-300 ease-in-out ${isSelected ? 'bg-blue-500' : 'bg-custom-blue'}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};


export default FilterButton;
