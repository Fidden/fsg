import ArrowDownIcon from '@/components/icons/ArrowDownIcon';
import React, { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';

export default function FormSelect({ selectedCurrency, setSelectedCurrency, availableCurrencies }) {

  return (
    <Listbox value={selectedCurrency} onChange={setSelectedCurrency}>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button className="flex h-10 items-center pl-3 pr-2 rounded-md text-md font-medium gap-2 text-primary-100 border-solid border-1 border-primary-16 hover:bg-primary-2 transition ease-in-out-out">
              <span className="block truncate text-left w-full">{selectedCurrency}</span>
              <div className="svg_icon svg_16 svg_c_60">
                <ArrowDownIcon />
              </div>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"></span>
            </Listbox.Button>

            <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <Listbox.Options className="absolute outline-none z-10 w-full mt-1 max-h-60 overflow-auto rounded-xl bg-white border-1 border-primary-8 text-md shadow-xl py-1.5">
                {availableCurrencies.map((currency) => (
                  <Listbox.Option
                    key={currency}
                    className={({ active }) =>
                      (active ? 'bg-primary-4 text-primary-100' : 'text-primary-100') +
                      'relative block truncate cursor-pointer select-none py-1 px-4'
                    }
                    value={currency}>
                    {currency}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
