import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface TextareaProps {
    label: string;
    name: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, name }) => {
    const { t } = useTranslation();

    const { 
        register,
        formState: { errors },
    } = useFormContext()
    
    return (
        <div className='flex flex-col gap-2 grow mb-10'>
            <label htmlFor={name} className="hidden">{label}</label>
            <fieldset className={`border border-solid ${errors[name] ? "border-rose-500" : "border-white"} rounded-lg`}>
                <legend className="hidden lg:block px-3 ml-8">{label}*</legend>
                <textarea {...register(`${name}`, {required: t("empty_input")})} className="border-none outline-none focus:ring-0 decoration-none bg-transparent w-full pb-4 pt-4 lg:pt-2 px-5 placeholder-white lg:placeholder-transparent" placeholder={`${label}*`}></textarea>
            </fieldset>
            {errors[name] && <p className="text-rose-500 mt-1">{`${errors[name].message}`}</p>}
        </div>

    );
};

export default Textarea;
