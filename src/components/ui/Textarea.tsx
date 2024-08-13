import React from 'react';
import { useFormContext } from 'react-hook-form';

interface TextareaProps {
    label: string;
    name: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, name }) => {
    const { 
        register,
        formState: { errors },
    } = useFormContext()
    
    return (
        <div className='flex flex-col gap-2 grow mb-10'>
            <fieldset className={`border border-solid ${errors[name] ? "border-rose-500" : "border-white"} rounded-lg`}>
                <legend className="px-3 ml-8">{label}*</legend>
                <textarea {...register(`${name}`, {required: "Please fill in this field"})} className="border-none outline-none focus:ring-0 decoration-none bg-transparent w-full pb-4 pt-2 px-5"></textarea>
            </fieldset>
            {errors[name] && <p className="text-rose-500 mt-1">{`${errors[name].message}`}</p>}
        </div>

    );
};

export default Textarea;
