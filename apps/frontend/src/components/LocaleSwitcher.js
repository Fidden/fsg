import ArrowDownIcon from '@/components/icons/ArrowDownIcon';
import Translate from '@/components/icons/Translate';
import React, { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import setLanguage from 'next-translate/setLanguage';

const locales = [
  { code: 'en', name_en: 'English', name: 'English' },
  { code: 'ru', name_en: 'Russian', name: 'Русский' },
  { code: 'ka', name_en: 'Georgian', name: 'ქართული' },
];

export default function LocaleSwitcher({ className }) {
  const router = useRouter();

  const [selected, setSelected] = useState(locales.find((locale) => locale.code === router.locale));

  const changeLocale = async (locale) => {
    setSelected(locale);
    await setLanguage(locale.code);

    await router.push(router.asPath, router.asPath, { locale: locale.code });
  };

  return (
    <div className={className}>
      <Listbox value={selected} onChange={changeLocale}>
        {({ open }) => (
          <>
            <div className="relative mt-1">
              <Listbox.Button className="flex items-center h-10 px-2 rounded-xl text-md font-medium gap-x-2 text-primary-100 border-solid border-1 border-primary-8 hover:bg-primary-2 transition ease-in-out-out">
                <div className="svg_icon svg_20">
                  <Translate />
                </div>
                <span className="block truncate text-left w-full">{selected.name_en}</span>
                <div className="svg_icon svg_16 svg_c_60">
                  <ArrowDownIcon />
                </div>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"></span>
              </Listbox.Button>

              <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                <Listbox.Options className="absolute outline-none z-10 w-40 mt-1 max-h-60 overflow-auto rounded-xl bg-white border-1 border-primary-8 text-md shadow-xl py-1.5">
                  {locales.map((locale) => (
                    <Listbox.Option
                      key={locale.code}
                      className={({ active }) =>
                        (active ? 'bg-primary-4 text-primary-100' : 'text-primary-100') +
                        'relative block truncate cursor-pointer select-none py-1 px-4'
                      }
                      value={locale}>
                      {locale.name}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
}
