import React from 'react';
import useSWR from 'swr';
import {defaultFetcher} from '@/lib/axios';
import AddressItem from '@/components/AddressItem';
import Loading from './ui/Loading';
import LoadError from './ui/LoadError';
import DataEmpty from './ui/DataEmpty';

const AddressesList = () => {
    const {data: storages, isLoading, error} = useSWR('/storages', defaultFetcher);

    if (isLoading) {
        return <Loading>Загрузка...</Loading>;
    }

    if (error) {
        return <LoadError>Ошибка загрузки данных</LoadError>;
    }

    if (storages?.length < 1) {
        return <DataEmpty>Список адресов пуст</DataEmpty>;
    }

    return (
        <div className="pb-40">
            <div className="border-1 border-primary-8 p-6 rounded-xl flex flex-col gap-2">
                <h2 className="text-lg font-medium text-primary-100">Адреса</h2>
                <div>
                    {storages?.map((storage) => (
                        <AddressItem storage={storage} key={storage.id}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AddressesList;
