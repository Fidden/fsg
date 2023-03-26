import {Listbox, Transition} from "@headlessui/react";
import Translate from "@/components/icons/Translate";
import ArrowDownIcon from "@/components/icons/ArrowDownIcon";
import React, {forwardRef, Fragment} from "react";

const Select = ({children, titleContent, ...props}, ref) => {
  return (
    <Listbox {...props} ref={ref} >
      {({ open }) => (
        <>
          <div className="relative mt-1">
            <Listbox.Button className="w-full flex items-center justify-between h-10 px-2 rounded-xl text-md font-medium gap-x-2 text-primary-100 border-solid border-1 border-primary-8 hover:bg-primary-2 transition ease-in-out-out">
              {titleContent}
              <div className="svg_icon svg_16 svg_c_60">
                <ArrowDownIcon />
              </div>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"></span>
            </Listbox.Button>

            <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <Listbox.Options className="absolute outline-none z-10 w-40 mt-1 max-h-60 overflow-auto rounded-xl bg-white border-1 border-primary-8 text-md shadow-xl py-1.5">
                {children}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default forwardRef(Select);
