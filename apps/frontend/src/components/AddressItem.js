import React from 'react';
import {Disclosure} from '@headlessui/react';
import AddressStroke from './ui/AddressStroke';
import {useAuth} from '@/hooks/auth';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon';

const AddressItem = ({storage}) => {
    const {country, address} = storage;
    const {user} = useAuth();
    const recipient = user?.recipient;
    const code = country.code.toLowerCase();

    return (
        <>
            <Disclosure>
                <Disclosure.Button className="w-full">
                    <div
                        className="outline-none text-left hover:bg-primary-2 max-sm:hover:bg-white flex items-center justify-between  pl-4 pr-3 max-sm:px-0 py-3 gap-3 rounded-xl">
                        <div className="flex grow min-w-0 gap-3 items-center">
                            <img className="w-8" src={`https://hatscripts.github.io/circle-flags/flags/${code}.svg`}
                                 alt={`Flag ${country.code}`}/>
                            <div className="flex flex-col truncate grow">
                                <h3 className="text-base font-medium text-primary-100 truncate">{country.name}</h3>
                                <p className="text-sm text-primary-60 truncate">Выберите, чтобы узнать адрес</p>
                            </div>
                        </div>
                        <div className="svg_24">
                            <ArrowRightIcon/>
                        </div>
                    </div>
                </Disclosure.Button>
                <Disclosure.Panel className="pt-1 pb-4 px-4 max-sm:px-0">
                    <table
                        className="min-w-full table-auto rounded-xl text-primary-100 text-md divide-y divide-primary-8 bg-primary-2">
                        <tbody className="divide-y divide-primary-8 ">
                        <AddressStroke name="Country">{country.name}</AddressStroke>
                        {user?.recipient?.first_name_en &&
                            <>
                                <AddressStroke name="First Name">
                                    {recipient?.first_name_en}
                                </AddressStroke>
                                <AddressStroke
                                    name="Last Name">
                                    {recipient?.last_name_en + ' ' + ' #FSG' + user?.id}
                                </AddressStroke>
                            </>
                        }
                        {user?.recipient?.company_name_en &&
                            <>
                                <AddressStroke name="Company name">
                                    {recipient?.company_name_en + ' #FSG' + user?.id}
                                </AddressStroke>
                            </>
                        }
                        <AddressStroke name="City">{address.city}</AddressStroke>
                        <AddressStroke name="Street">{address.street}</AddressStroke>
                        <AddressStroke name="State/Province">{storage.country.code}</AddressStroke>
                        <AddressStroke name="Zip">{address.zip}</AddressStroke>
                        <AddressStroke name="Telephone">{user?.phone ? user.phone : 'Неизвестен'}</AddressStroke>
                        </tbody>
                    </table>
                </Disclosure.Panel>
            </Disclosure>
        </>
    );
};

export default AddressItem;
