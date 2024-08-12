import React from 'react';

interface FilterButtonProps {
    text: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({ text }) => {
    return (
        <button className="bg-custom-blue shadow-[8px_15px_29px_0_rgba(23,27,44,0.41)] py-2 px-7">{text}</button>
    );
};

export default FilterButton;
