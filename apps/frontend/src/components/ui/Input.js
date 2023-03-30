import {forwardRef} from 'react';

function Input({children, className, ...props}, ref) {
    return (
        <div className="relative w-full">
            <input
                {...props}
                ref={ref}
                className={`outline-none w-full z-0 rounded-md border-solid border-1 border-primary-16 h-10 px-3 items-center text-md text-primary-100`}
            />
            <div className="absolute z-10 inset-y-0 right-0 flex items-center pr-3">{children}</div>
        </div>
    );
}

export default forwardRef(Input);
