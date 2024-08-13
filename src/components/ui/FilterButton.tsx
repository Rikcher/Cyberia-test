import React from 'react';

interface FilterButtonProps {
    text: string;
    isSelected?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ text, isSelected = false ,onClick }) => {
    if (typeof isSelected !== 'boolean') {
        throw new Error('Invalid prop: isSelected must be a boolean');
    }

    return (
        <button
            aria-label={text}
            className={`shadow-[8px_15px_29px_0_rgba(23,27,44,0.41)] max-w-44 sm:max-w-none py-[0.625rem] text-[0.6875rem] sm:text-2xl px-1 sm:px-7 rounded-lg transition-bg duration-300 ease-in-out ${isSelected ? 'bg-blue-500' : 'bg-custom-blue'}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};


export default FilterButton;
