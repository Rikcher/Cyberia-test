import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { REGEXES } from '../../constants';

interface InputFieldProps {
    label: string;
    name: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, name }) => {
    const { 
        register,
        formState: { errors },
    } = useFormContext()

    const [validationRule, setValidationRule] = useState({});

    const updateValidationRule = (fieldName: string) => {
        switch (fieldName) {
            case 'email':
                setValidationRule({
                    pattern: {
                        value: REGEXES.EMAIL,
                        message: "Please enter a valid email",
                    },
                });
                break;
            case 'phone':
                setValidationRule({
                    pattern: {
                        value: REGEXES.PHONE_NUMBER,
                        message: "Please enter a valid phone number",
                    },
                });
                break;
            default:
                setValidationRule({
                    maxLength: {
                        value: 30,
                        message: "Maximum length is 30 characters",
                    },
                });
        }
    };

    // Watch the specific field to trigger validation rule update
    useEffect(() => {
        if (['email', 'phoneNumber'].includes(name)) {
            updateValidationRule(name);
        }
    }, [name]);

    return (
        <div className='flex flex-col gap-2 grow'>
            <fieldset className={`border border-solid ${errors[name] ? "border-rose-500" : "border-white"}  rounded-lg`}>
                <legend className="hidden lg:block px-3 ml-8">{label}*</legend>
                <input {...register(`${name}`,{
                    required: "Please fill in this field",
                    ...validationRule,
                } 
                )} className="border-none outline-none focus:ring-0 decoration-none bg-transparent w-full py-4 lg:pb-4 lg:pt-2 px-5 placeholder:text-white lg:placeholder:text-transparent" type="text" placeholder={`${label}*`}/>
            </fieldset>
            {errors[name] && <p className="text-rose-500 mt-1">{`${errors[name].message}`}</p>}
        </div>
    );
};

export default InputField;
