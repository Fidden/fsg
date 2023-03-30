import {Listbox} from "@headlessui/react";
import React, {forwardRef} from "react";

const Option = ({value, children, className}, ref) => {
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    return (
        <Listbox.Option
            ref={ref}
            className={({active}) =>
                classNames(active ? 'bg-primary-4' : 'text-primary-100', `relative block truncate cursor-pointer select-none py-1 px-4 ${className}`)
            }
            value={value}>
            {children}
        </Listbox.Option>
    );
};

export default forwardRef(Option);
