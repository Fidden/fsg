import React from 'react';
import InputError from "@/components/ui/InputError";

const InputGroup = ({children, errors, id, label}) => (
    <div className="flex flex-col gap-1">
        <label className="font-medium text-md text-primary-100" htmlFor={id}>
            {label}
        </label>
        {children}
        <InputError messages={errors}/>
    </div>
);

export default InputGroup;
